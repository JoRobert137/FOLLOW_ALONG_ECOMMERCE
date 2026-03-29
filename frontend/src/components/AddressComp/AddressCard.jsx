import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AddressCard = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Token Missing');
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/user/add-address?token=${token}`,
        {
          city,
          country,
          address1: add1,
          address2: add2,
          zipCode,
          addressType,
        }
      );
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add address');
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
        className="w-full max-w-lg animate-fade-in-up"
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
          className="px-8 pt-8 pb-5 flex items-center gap-3"
          style={{ background: 'var(--gradient-midnight)' }}
        >
          <div
            className="p-2.5 rounded-xl"
            style={{ background: 'var(--amber-glow)' }}
          >
            <FaMapMarkerAlt size={18} style={{ color: 'var(--amber)' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-inverse)' }}>
              Add New Address
            </h2>
            <p className="text-xs" style={{ color: 'var(--slate-light)' }}>
              Where should we deliver?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Mumbai"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="India"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Address Line 1</label>
            <input
              type="text"
              value={add1}
              onChange={(e) => setAdd1(e.target.value)}
              placeholder="Street address"
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Address Line 2</label>
            <input
              type="text"
              value={add2}
              onChange={(e) => setAdd2(e.target.value)}
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Zip Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="400001"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Address Type</label>
              <select
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                required
              >
                <option value="">Select type</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 mt-2"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
              boxShadow: 'var(--shadow-amber)',
            }}
          >
            {loading ? 'Saving...' : 'Save Address'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressCard;