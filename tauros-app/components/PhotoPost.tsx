import React from 'react';

interface PhotoPostProps {
  photo: { id: string; url: string; caption: string; author: string; timestamp: Date };
}

const PhotoPost: React.FC<PhotoPostProps> = ({ photo }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-4">
      <div className="flex items-center">
        <img className="w-8 h-8 rounded-full" src="/path/to/avatar.jpg" alt="Avatar" />
        <div className="ml-2 font-bold text-indigo-500">{photo.author}</div>
      </div>
      <img src={photo.url} alt={photo.caption} className="w-full h-auto mt-2 rounded" />
      <div className="text-sm mt-2">{photo.caption}</div>
      <div className="text-gray-500 text-xs">{photo.timestamp.toUTCString()}</div>
    </div>
  );
};

export default PhotoPost; 