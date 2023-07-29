import React from 'react';
import Login from './Component/login';
import CreatePost from './Component/createPost';
import Signup from './Component/Signup';
import Dashboard from './Component/Dashboard';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='h-[100vh] w-full bg-blue-200'>
      <Routes>
        <Route index="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>NO PAGE FOUND</div>} />
      </Routes>
    </div>
  );
};

export default App;
