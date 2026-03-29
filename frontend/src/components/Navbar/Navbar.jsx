/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ cartCount = 0 }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => setProfileOpen(false);
    if (profileOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setProfileOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Add Product', to: '/product-entry-page' },
    { name: 'Orders', to: '/order-history' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-lg'
          : ''
      }`}
      style={{
        background: 'var(--gradient-midnight)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
              style={{
                background: 'var(--gradient-amber)',
                color: 'var(--midnight)',
              }}
            >
              S
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--text-inverse)' }}
            >
              Shop<span style={{ color: 'var(--amber)' }}>Sphere</span>
            </span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? ''
                      : ''
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--amber)' : 'var(--text-inverse)',
                  background: isActive ? 'var(--amber-glow)' : 'transparent',
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <FaSearch
                className="absolute top-1/2 left-3 -translate-y-1/2"
                style={{ color: 'var(--slate-light)' }}
                size={14}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 rounded-lg text-sm transition-all duration-200 focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-inverse)',
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.14)';
                  e.target.style.borderColor = 'var(--amber)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/cart"
              className="relative p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ color: 'var(--text-inverse)' }}
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{
                    background: 'var(--gradient-amber)',
                    color: 'var(--midnight)',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                }}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{ color: 'var(--text-inverse)' }}
              >
                <FaUserCircle size={22} />
              </button>
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden animate-slide-down"
                  style={{
                    background: 'var(--card)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {isLoggedIn ? (
                    <>
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--amber-glow)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'transparent')
                        }
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/order-history"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--amber-glow)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'transparent')
                        }
                      >
                        Orders
                      </NavLink>
                      <button
                        className="w-full text-left px-4 py-3 text-sm font-medium transition-colors"
                        style={{ color: 'var(--error)' }}
                        onClick={handleLogout}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--error-light)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'transparent')
                        }
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--amber-glow)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'transparent')
                        }
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--amber-glow)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'transparent')
                        }
                      >
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--text-inverse)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ color: 'var(--text-inverse)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
