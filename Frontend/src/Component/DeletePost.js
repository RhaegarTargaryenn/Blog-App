import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/posts/${postId}`);
      onDelete(); 
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error.response.data);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white font-bold text-[10px] mt-16 py-3 px-3 rounded mr-2"
    >
      Delete
    </button>
  );
};

export default DeletePost;
