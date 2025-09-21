import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, setUserId, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear inputs when mode changes (Login <-> Sign Up)
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [currentState]);

  // Redirect on successful login/signup
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);

          // Save userId from response explicitly
          if (response.data.userId) {
            setUserId(response.data.userId);
            localStorage.setItem('userId', response.data.userId);
          } else {
            console.warn("User ID not found in signup response");
          }
        } else {
          toast.error(response.data.message || 'Failed to create account');
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);

          // Save userId from response explicitly
          if (response.data.userId) {
            setUserId(response.data.userId);
            localStorage.setItem('userId', response.data.userId);
          } else {
            console.warn("User ID not found in login response");
          }
        } else {
          toast.error(response.data.message || 'Failed to login');
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:w-[350px] m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? null : (
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-[280px] px-3 py-2 border border-gray-800 rounded"
          autoComplete="name"
          aria-label="Name"
        />
      )}

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-[280px] px-3 py-2 border border-gray-800 rounded"
        autoComplete="email"
        aria-label="Email"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-[280px] px-3 py-2 border border-gray-800 rounded"
        autoComplete={currentState === 'Login' ? 'current-password' : 'new-password'}
        aria-label="Password"
      />

      <div className="w-[280px] flex justify-between text-sm mt-[-8px]">
        <span className="cursor-pointer text-blue-600">FORGOT YOUR PASSWORD?</span>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-blue-600">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-blue-600">
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-black text-white font-light px-8 py-2 mt-4 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Please wait...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
