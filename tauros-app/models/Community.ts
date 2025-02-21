import { User } from './User';
export class Community {
  id: string;
  owner: User;
  board: any[];
  visibility: 'public' | 'shared' | 'private';

  constructor(id: string, owner: User, board: any[], visibility: 'public' | 'shared' | 'private') {
    this.id = id;
    this.owner = owner;
    this.board = board;
    this.visibility = visibility;
  }

  // Additional methods to manage community data
} 