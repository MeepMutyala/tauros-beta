export class TextPostFeed {
  id: string;
  posts: Array<{ id: string; content: string; author: string; timestamp: Date }>;

  constructor(id: string, posts: Array<{ id: string; content: string; author: string; timestamp: Date }>) {
    this.id = id;
    this.posts = posts;
  }

  // Additional methods to manage text posts
} 