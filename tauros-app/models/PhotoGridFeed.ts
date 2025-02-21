export class PhotoGridFeed {
  id: string;
  photos: Array<{ id: string; url: string; caption: string; author: string; timestamp: Date }>;

  constructor(id: string, photos: Array<{ id: string; url: string; caption: string; author: string; timestamp: Date }>) {
    this.id = id;
    this.photos = photos;
  }

  // Additional methods to manage photo grids
} 