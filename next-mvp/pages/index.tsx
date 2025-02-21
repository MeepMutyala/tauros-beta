import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import LensComponent from '../components/LensComponent';
import { User, Profile, Lens } from '../models/User';
import { TextPostFeed } from '../models/TextPostFeed';
import { PhotoGridFeed } from '../models/PhotoGridFeed';

// Sample text posts
const textPosts = [
  {
    id: '1',
    content: "What's the best way to start a morning? Coffee or tea? ☕🍵",
    author: 'Nidhi Whosmawhatsit',
    timestamp: new Date('2023-10-01T08:00:00Z')
  },
  {
    id: '2',
    content: "Just finished reading an amazing book on AI ethics. Highly recommend it!",
    author: 'Josh Whatchimicallit',
    timestamp: new Date('2023-10-02T09:00:00Z')
  },
  {
    id: '3',
    content: "Anyone else feel like tacos should have their own day of the week besides Tuesday?",
    author: 'Luigi Interestingdude',
    timestamp: new Date('2023-10-03T10:00:00Z')
  },
  {
    id: '4',
    content: "Dreaming of a world where everyone gets a three-day weekend 🌍✨",
    author: 'Nidhi Whosmawhatsit',
    timestamp: new Date('2023-10-04T11:00:00Z')
  },
  {
    id: '5',
    content: "What's your go-to playlist for productivity? Share your faves!",
    author: 'Josh Whatchimicallit',
    timestamp: new Date('2023-10-05T12:00:00Z')
  }
];

// Sample image posts
const imagePosts = [
  {
    id: '1',
    url: 'PLACEHOLDER_FOR_IMAGE_URL_1',
    caption: "A beautiful sunrise to start the day!",
    author: 'Nidhi Whosmawhatsit',
    timestamp: new Date('2023-10-01T08:00:00Z')
  },
  {
    id: '2',
    url: 'PLACEHOLDER_FOR_IMAGE_URL_2',
    caption: "Exploring the wonders of nature 🌿",
    author: 'Josh Whatchimicallit',
    timestamp: new Date('2023-10-02T09:00:00Z')
  },
  {
    id: '3',
    url: 'PLACEHOLDER_FOR_IMAGE_URL_3',
    caption: "City lights at night ✨",
    author: 'Luigi Interestingdude',
    timestamp: new Date('2023-10-03T10:00:00Z')
  },
  {
    id: '4',
    url: 'PLACEHOLDER_FOR_IMAGE_URL_4',
    caption: "Delicious homemade pizza 🍕",
    author: 'Nidhi Whosmawhatsit',
    timestamp: new Date('2023-10-04T11:00:00Z')
  },
  {
    id: '5',
    url: 'PLACEHOLDER_FOR_IMAGE_URL_5',
    caption: "Relaxing by the beach 🏖️",
    author: 'Josh Whatchimicallit',
    timestamp: new Date('2023-10-05T12:00:00Z')
  }
];

const textPostFeed = new TextPostFeed('1', textPosts);
const photoGridFeed = new PhotoGridFeed('2', imagePosts);

const sampleLens = new Lens('1', [textPostFeed, photoGridFeed]);
const sampleProfile = new Profile('', 'This is a sample bio.');
const sampleUser = new User(sampleProfile, [], [sampleLens]);

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ProfileComponent profile={sampleUser.profile} />
      <LensComponent lens={sampleUser.lenses[0]} />
    </div>
  );
}
