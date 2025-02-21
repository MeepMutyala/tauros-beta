import { Profile } from './Profile';
import { Feed } from './Feed';
import { Community } from './Community';
import { Lens } from './Lens';

export { Profile, Feed, Community, Lens }; // Re-exporting

export class User {
  profile: Profile;
  feeds: Feed[];
  lenses: Lens[];

  constructor(profile: Profile, feeds: Feed[], lenses: Lens[]) {
    this.profile = profile;
    this.feeds = feeds;
    this.lenses = lenses;
  }

  // Additional methods to manage user data
} 