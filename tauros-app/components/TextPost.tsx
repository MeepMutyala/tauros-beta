import React from 'react';

interface TextPostProps {
  post: { id: string; content: string; author: string; timestamp: Date };
}

const TextPost: React.FC<TextPostProps> = ({ post }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-4">
      <div className="flex items-center">
        <img className="w-8 h-8 rounded-full" src="/path/to/avatar.jpg" alt="Avatar" />
        <div className="ml-2 font-bold text-indigo-500">{post.author}</div>
      </div>
      <div className="mt-2">{post.content}</div>
      <div className="text-gray-500 text-xs mt-2">{post.timestamp.toUTCString()}</div>
    </div>
  );
};

export default TextPost; 