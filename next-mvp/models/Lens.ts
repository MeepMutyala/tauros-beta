import { TextPostFeed } from './TextPostFeed';
import { PhotoGridFeed } from './PhotoGridFeed';

export class Lens {
  id: string;
  feeds: Array<TextPostFeed | PhotoGridFeed>;

  constructor(id: string, feeds: Array<TextPostFeed | PhotoGridFeed>) {
    this.id = id;
    this.feeds = feeds;
  }

  // Methods to manage and curate feeds
} 