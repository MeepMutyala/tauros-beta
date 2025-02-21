export class Feed {
  id: string;
  type: 'text' | 'photo';
  content: any[];

  constructor(id: string, type: 'text' | 'photo', content: any[]) {
    this.id = id;
    this.type = type;
    this.content = content;
  }

  // Additional methods to manage feed data
} 