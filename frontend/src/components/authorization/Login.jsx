import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../User/UsersSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage() {
  const [credentials, setCreds] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError('');
    setCreds({ ...credentials, [name]: value });
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        credentials
      );
      localStorage.setItem('token', response.data.token);
      dispatch(setEmail(credentials.email));
      navigate('/');
    } catch (er) {
      setError(er.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
          style={{
            background: 'var(--gradient-midnight)',
          }}
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
          <h1
            className="text-2xl font-bold"
            style={{ color: 'var(--text-inverse)' }}
          >
            Welcome Back
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--slate-light)' }}>
            Sign in to your ShopSphere account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleClickLogin} className="px-8 py-8 space-y-5">
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

          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="login-email"
              autoComplete="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="login-password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
              boxShadow: 'var(--shadow-amber)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          <p
            className="text-center text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold transition-colors"
              style={{ color: 'var(--amber-dark)' }}
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
