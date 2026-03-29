import { useState } from 'react';
import ValidationFormObject from '../../validation.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCloudUploadAlt } from 'react-icons/fa';

function SignUpPage() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigateUser = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setError('');
    if (name === 'file') {
      const file = files[0];
      setData({ ...data, [name]: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NameV = ValidationFormObject.validateName(data.name);
    const EmailV = ValidationFormObject.validateEmail(data.email);
    const PassV = ValidationFormObject.validatePass(data.password);

    if (typeof NameV === 'string' && NameV.length > 1) return setError(NameV);
    if (typeof EmailV === 'string' && EmailV.length > 2) return setError(EmailV);
    if (typeof PassV === 'string' && PassV.length > 2) return setError(PassV);

    setError('');
    setLoading(true);

    const formDataBody = new FormData();
    formDataBody.append('email', data.email);
    formDataBody.append('password', data.password);
    formDataBody.append('name', data.name);
    formDataBody.append('file', data.file);

    try {
      await axios.post('http://localhost:8080/user/signup', formDataBody, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigateUser('/login');
    } catch (er) {
      setError(er.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'var(--surface)',
    border: '1.5px solid var(--border)',
    color: 'var(--text-primary)',
  };

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--surface)' }}
    >
      <div
        className="w-full max-w-md animate-fade-in-up"
        style={{
          background: 'var(--card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          className="px-8 pt-10 pb-6 text-center"
          style={{ background: 'var(--gradient-midnight)' }}
        >
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center font-black text-xl"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
            }}
          >
            S
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-inverse)' }}>
            Create Account
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--slate-light)' }}>
            Join ShopSphere today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {error && (
            <div
              className="px-4 py-3 rounded-lg text-sm font-medium animate-fade-in"
              style={{
                background: 'var(--error-light)',
                color: 'var(--error)',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="signup-name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Full Name
            </label>
            <input
              type="text"
              id="signup-name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="John Robert"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Email Address
            </label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup-password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--slate-light)' }}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Profile Photo
            </label>
            <label
              htmlFor="signup-file"
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                ...inputStyle,
                borderStyle: 'dashed',
              }}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
              ) : (
                <FaCloudUploadAlt size={20} style={{ color: 'var(--amber)' }} />
              )}
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {data.file ? data.file.name : 'Click to upload photo'}
              </span>
            </label>
            <input
              type="file"
              id="signup-file"
              name="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="hidden"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-100 disabled:opacity-60"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
              boxShadow: 'var(--shadow-amber)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: 'var(--amber-dark)' }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;