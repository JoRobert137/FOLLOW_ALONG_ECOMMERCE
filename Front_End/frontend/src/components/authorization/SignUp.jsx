/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ValidationFormObject from '../../validation.js';
import { Link } from 'react-router-dom';
function SignupForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    file: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    // console.log(data);
  };

  const handleSubmit = () => {
    const NameV = ValidationFormObject.validteName(data.name);
    const EmailV = ValidationFormObject.validteEmail(data.email);
    const PassV = ValidationFormObject.validtePass(data.password);

    if (typeof NameV == 'string' && NameV.length > 1) {
      return setError(NameV);
    }
    if (typeof EmailV == 'string' && EmailV.length > 2) {
      return setError(EmailV);
    }
    if (typeof PassV == 'string' && PassV.length > 2) {
      return setError(PassV);
    }
    // axios request
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* File Input Field */}
        <div className="mb-6">
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg , .jpeg , .png"
            onChange={handleChange}
            className="w-full text-gray-700 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Signup
        </button>

        <p className="text-center">
          Already have an account ? <Link to={'/login'}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;