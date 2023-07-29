import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', {
        email,
        password,
      });
      console.log('Logged in:', response.data.user.name);
      toast.success(`Welcome back ${response.data.user.name}`);
       navigate('/dashboard');
    } catch (error) {
      toast.error("you are not registred");
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-sm mt-4 text-center">
        Don't have an account?{' '}
        <Link className="text-blue-500 underline" to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
