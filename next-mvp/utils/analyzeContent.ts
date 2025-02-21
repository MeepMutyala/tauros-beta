import { createChatCompletionStream } from '../../pplx/perplexity';
import OpenAI from 'openai';
import { OPENAI_API_KEY, PERPLEXITY_API_KEY } from './config';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function identifyClaims(content: string): Promise<string[]> {
  const prompt = `Identify key claims or assumptions in the following content: ${content}`;
  const messages = [{ role: 'user', content: prompt }];
  const stream = createChatCompletionStream(PERPLEXITY_API_KEY, messages);

  const claims: string[] = [];
  for await (const response of stream) {
    claims.push(response.content);
  }
  return claims;
}

async function findEvidence(apiKey: string, claim: string): Promise<string> {
  const prompt = `Find background evidence and context for the claim: "${claim}"`;
  const messages = [{ role: 'user', content: prompt }];
  const stream = createChatCompletionStream(apiKey, messages);

  let evidence = '';
  for await (const response of stream) {
    evidence += response.content;
  }
  return evidence;
}

async function assessValidity(apiKey: string, evidence: string): Promise<string> {
  const prompt = `Assess the validity of the sources and evidence: ${evidence}`;
  const messages = [{ role: 'user', content: prompt }];
  const stream = createChatCompletionStream(apiKey, messages);

  let validity = '';
  for await (const response of stream) {
    validity += response.content;
  }
  return validity;
}

async function analyzeImage(apiKey: string, imageUrl: string): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: "Describe what's in this image, both visually and semantically." },
          { type: 'image_url', image_url: { url: imageUrl } },
        ],
      },
    ],
    store: true,
  });

  const content = response.choices?.[0]?.message?.content;
  if (!content) {
    return [];
  }

  return content.split('\n').filter((claim: string) => claim.trim() !== '');
}

async function analyzeContent(apiKey: string, content: string, imageUrl?: string): Promise<string> {
  let finalAssessment = '';

  let claims: string[] = [];
  if (imageUrl) {
    claims = await analyzeImage(apiKey, imageUrl);
    finalAssessment += `Image Analysis:\n`;
  } else {
    claims = await identifyClaims(content);
  }

  for (const claim of claims) {
    const evidence = await findEvidence(apiKey, claim);
    const validity = await assessValidity(apiKey, evidence);
    finalAssessment += `Claim: ${claim}\nEvidence: ${evidence}\nValidity: ${validity}\n\n`;
  }

  return finalAssessment;
}

export { analyzeContent }; 