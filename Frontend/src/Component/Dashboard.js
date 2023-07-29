// Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../spinner/spinner';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import LogoutButton from './LogoutButton';

const Dashboard = () => {
  const userName = localStorage.getItem('userName');
  const imageLink = `https://api.dicebear.com/5.x/initials/svg?seed=${userName}`;
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/posts');
      setUserPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user posts:', error.response.data);
      setError('Error fetching user posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/posts/${postId}`);
      fetchUserPosts();
    } catch (error) {
      console.error('Error deleting post:', error.response.data);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center mt-[300px]"><Spinner /></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handlePostHover = (postId) => {
    setHoveredPost(postId);
  };

  return (
    <div className="p-4 h-[100vh]">
      <div className="flex items-center mb-4 justify-between">
        <div className="flex items-center">
          <img src={imageLink} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <LogoutButton />
      </div>
      <hr /><br />
      <div className="mb-4">
        <Link to="/create-post">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Create Post
          </button>
        </Link>
      </div>
      {userPosts.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className={`border rounded p-4 bg-purple-100 shadow-lg hover:bg-purple-300 hover:border-red-500 hover:text-white ${
                hoveredPost === post._id ? 'hovered-post' : ''
              }`}
              onMouseEnter={() => handlePostHover(post._id)}
              onMouseLeave={() => handlePostHover(null)}
            >
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="mb-4 text-[12px]">{post.body}</p>
              <div className="flex justify-between">
                <EditPost postId={post._id} />
                <DeletePost postId={post._id} onDelete={() => handlePostDelete(post._id)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Dashboard;
