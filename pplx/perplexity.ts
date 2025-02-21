export interface PerplexityOptions {
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  search_domain_filter?: string | null;
  return_images?: boolean;
  return_related_questions?: boolean;
  search_recency_filter?: string;
  top_k?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  response_format?: any;
}

// This function streams chat completions from the Perplexity API.
export async function* createChatCompletionStream(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  model: string = "sonar",
  options: PerplexityOptions = {}
): AsyncGenerator<any, void, unknown> {
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      max_tokens: options.max_tokens ?? 123,
      temperature: options.temperature ?? 0.2,
      top_p: options.top_p ?? 0.9,
      search_domain_filter: options.search_domain_filter ?? null,
      return_images: options.return_images ?? false,
      return_related_questions: options.return_related_questions ?? false,
      search_recency_filter: options.search_recency_filter,
      top_k: options.top_k ?? 0,
      presence_penalty: options.presence_penalty ?? 0,
      frequency_penalty: options.frequency_penalty ?? 1,
      response_format: options.response_format ?? null
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed with status ${response.status}: ${errorText}`);
  }

  if (!response.body) {
    throw new Error("No response body received.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode the current chunk and accumulate it in a buffer.
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    // The last element may be an incomplete line – put it back into the buffer.
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      // If the line starts with "data:" then extract the JSON payload.
      if (trimmedLine.startsWith("data:")) {
        const data = trimmedLine.replace(/^data:\s*/, "");
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          yield parsed;
        } catch (err) {
          console.error("Failed to parse JSON:", err, data);
        }
      }
    }
  }
}
