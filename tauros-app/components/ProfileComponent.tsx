import React from 'react';
import { Profile } from '../models/Profile';

interface ProfileComponentProps {
  profile: Profile;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ profile }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <img className="h-32 w-full object-cover" src="/path/to/cover-image.jpg" alt="Cover" />
      <div className="p-6">
        <div className="flex items-center">
          <img className="w-16 h-16 rounded-full border-2 border-white -mt-8" src="/path/to/avatar.jpg" alt="Avatar" />
          <div className="ml-4">
            <div className="text-lg font-bold">{profile.username}</div>
            <div className="text-gray-600">@{profile.username}.bsky.social</div>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{profile.bio}</p>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <div><span className="font-bold">12</span> friends</div>
          <div><span className="font-bold">3</span> public feeds</div>
          <div><span className="font-bold">24</span> communities</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent; 