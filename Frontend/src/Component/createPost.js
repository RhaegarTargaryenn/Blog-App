import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../spinner/spinner';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when post creation starts

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/posts/create',
        { title, body },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('Post created:', response.data);
      // Redirect to the dashboard after successful post creation
      navigate('/dashboard');
    } catch (error) {
      console.error('Post creation error:', error.response.data);
    } finally {
      setLoading(false); // Set loading back to false when post creation is complete (success or error)
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Create Post</h2>
      <form onSubmit={handleCreatePost} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border rounded-md focus:ring focus:border-blue-300"
            placeholder="Enter the title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Post Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border rounded-md focus:ring focus:border-blue-300"
            placeholder="Write your post here"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      {loading && <div className="flex justify-center mt-8"><Spinner /></div>} {/* Show the spinner if loading is true */}
    </div>
  );
};

export default CreatePost;
