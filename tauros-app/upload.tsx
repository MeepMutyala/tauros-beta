import React, { useState } from 'react';
import { TID } from '@atproto/sdk';
import { useSession } from './auth'; // Create this hook based on quickstart OAuth flow

interface PostRecord {
  $type: string;
  createdAt: string;
  authorId: string;
}

interface ImagePostRecord extends PostRecord {
  imageUrl: string;
  caption?: string;
}

interface TextPostRecord extends PostRecord {
  content: string;
}

export default function Upload() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { agent } = useSession(); // Get authenticated agent from session

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const uploadBlob = async (file: File) => {
    const blob = await agent.uploadBlob(new Uint8Array(await file.arrayBuffer()), {
      encoding: file.type,
    });
    return blob.data.blob;
  };

  const createTextPost = async (): Promise<string> => {
    const record: TextPostRecord = {
      $type: 'app.chaoticharmonylabs.textPost',
      content: text,
      createdAt: new Date().toISOString(),
      authorId: agent!.assertDid,
    };

    const res = await agent!.com.atproto.repo.putRecord({
      repo: agent!.assertDid,
      collection: 'app.chaoticharmonylabs.textPost',
      rkey: TID.nextStr(),
      record,
    });
    return res.uri;
  };

  const createImagePost = async (): Promise<string> => {
    if (!image) throw new Error('No image selected');
    
    const blobRef = await uploadBlob(image);
    const record: ImagePostRecord = {
      $type: 'app.chaoticharmonylabs.imagePost',
      imageUrl: blobRef.ref.toString(),
      caption: text,
      createdAt: new Date().toISOString(),
      authorId: agent!.assertDid,
    };

    const res = await agent!.com.atproto.repo.putRecord({
      repo: agent!.assertDid,
      collection: 'app.chaoticharmonylabs.imagePost',
      rkey: TID.nextStr(),
      record,
    });
    return res.uri;
  };

  const handleSubmit = async () => {
    if (!agent) {
      console.error('Not authenticated');
      return;
    }

    try {
      let postUri: string;
      
      if (image) {
        postUri = await createImagePost();
      } else if (text) {
        postUri = await createTextPost();
      } else {
        throw new Error('No content provided');
      }

      // Update feed (pseudo-code)
      // await updateFeedWithPost(postUri);
      
      console.log('Post created:', postUri);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Upload Content</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Write something..."
        value={text}
        onChange={handleTextChange}
        maxLength={280}
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="mb-4"
      />
      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 text-white p-2 rounded"
        disabled={!agent}
      >
        {agent ? 'Submit' : 'Please Login First'}
      </button>
    </div>
  );
}