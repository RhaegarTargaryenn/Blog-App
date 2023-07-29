import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:4000/api/v1/posts/${postId}`,
        { title, body }
      );
      toast.success('Post updated successfully please refresh');
      setIsEditing(false); // Close the edit form after saving changes
    } catch (error) {
      console.error('Error editing post:', error.response.data);
      toast.error('Error updating post');
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <form onSubmit={handleEditPost}>
            <input
            className='bg-purple-100 border border-red-600 rounded-md text-white '
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Title"
            />
            <textarea
            className='mt-2 bg-purple-100 border border-red-600 rounded-md text-white'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="New Body"
            />
            <button type="submit" className="bg-green-500 text-white text-[10px] font-bold py-1 px-1 rounded">
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red-500 text-white text-[10px] font-bold py-1 px-1 rounded ml-2"
              onClick={() => setIsEditing(false)} // Cancel and close the edit form
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)} 
          className="bg-blue-500 text-white text-[10px] mt-16 font-bold py-3 px-4 rounded mr-2"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditPost;
