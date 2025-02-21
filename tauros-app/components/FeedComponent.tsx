import React from 'react';
import { Feed } from '../models/Feed';

interface FeedComponentProps {
  feed: Feed;
}

const FeedComponent: React.FC<FeedComponentProps> = ({ feed }) => {
  return (
    <div>
      <h2>Feed Type: {feed.type}</h2>
      {/* Render feed content */}
    </div>
  );
};

export default FeedComponent; 