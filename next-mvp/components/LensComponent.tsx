import React from 'react';
import { Lens } from '../models/Lens';
import TextPost from './TextPost';
import PhotoPost from './PhotoPost';
import { TextPostFeed } from '@/models/TextPostFeed';
import { PhotoGridFeed } from '@/models/PhotoGridFeed';

interface LensComponentProps {
  lens: Lens;
}

const LensComponent: React.FC<LensComponentProps> = ({ lens }) => {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      {lens.feeds.map(feed => (
        feed instanceof TextPostFeed ? (
          feed.posts.map(post => <TextPost key={post.id} post={post} />)
        ) : feed instanceof PhotoGridFeed ? (
          feed.photos.map(photo => <PhotoPost key={photo.id} photo={photo} />)
        ) : null
      ))}
    </div>
  );
};

export default LensComponent; 