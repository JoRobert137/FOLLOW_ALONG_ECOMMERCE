/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaShieldAlt, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';

export function ProfileCard() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token missing, please login');
    try {
      const response = await axios.get(
        `http://localhost:8080/user/user-data?token=${token}`
      );
      setUserData(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDeleteAddy = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token missing');
    try {
      await axios.delete(
        `http://localhost:8080/user/delete-address/${id}?token=${token}`
      );
      getUserData();
    } catch (er) {
      console.error(er);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-[60vh] flex items-center justify-center"
        style={{ background: 'var(--surface)' }}
      >
        <div className="animate-spin w-10 h-10 rounded-full" style={{ border: '3px solid var(--border)', borderTopColor: 'var(--amber)' }} />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh]" style={{ background: 'var(--surface)' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Profile Header */}
        <div
          className="relative overflow-hidden animate-fade-in-up"
          style={{
            background: 'var(--gradient-midnight)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="flex items-center gap-5 relative z-10">
            <div
              className="w-20 h-20 rounded-2xl overflow-hidden shrink-0"
              style={{
                border: '3px solid var(--amber)',
                boxShadow: 'var(--shadow-amber)',
              }}
            >
              {userData?.avatar?.url ? (
                <img
                  src={userData.avatar.url}
                  alt={userData.Name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-black"
                  style={{
                    background: 'var(--gradient-amber)',
                    color: 'var(--midnight)',
                  }}
                >
                  {userData.Name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-inverse)' }}>
                {userData.Name}
              </h1>
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize mt-1"
                style={{
                  background: 'var(--amber-glow)',
                  color: 'var(--amber)',
                }}
              >
                <FaShieldAlt size={10} />
                {userData.role}
              </span>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-5" style={{ background: 'var(--amber)' }} />
        </div>

        {/* Info Cards */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Email */}
          <div
            className="flex items-center gap-4 p-4"
            style={{
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'var(--amber-glow)' }}
            >
              <FaEnvelope size={16} style={{ color: 'var(--amber)' }} />
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Email</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{userData.email}</p>
            </div>
          </div>

          {/* User ID */}
          <div
            className="flex items-center gap-4 p-4"
            style={{
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'var(--amber-glow)' }}
            >
              <FaUser size={16} style={{ color: 'var(--amber)' }} />
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>User ID</p>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{userData._id}</p>
            </div>
          </div>

          {/* Addresses */}
          <div
            className="p-5"
            style={{
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--amber-glow)' }}
                >
                  <FaMapMarkerAlt size={16} style={{ color: 'var(--amber)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Addresses
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {userData.address?.length || 0} saved
                  </p>
                </div>
              </div>
              <Link
                to="/add-address"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--gradient-amber)',
                  color: 'var(--midnight)',
                }}
              >
                <FaPlus size={10} />
                Add
              </Link>
            </div>

            {userData.address?.length > 0 ? (
              <div className="space-y-3">
                {userData.address.map((SingleAddy, index) => (
                  <div
                    key={SingleAddy._id || index}
                    className="flex items-start justify-between p-3 rounded-xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div>
                      <p className="text-xs font-semibold capitalize mb-1" style={{ color: 'var(--amber-dark)' }}>
                        {SingleAddy.addressType || 'Address'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        {SingleAddy.address1}
                      </p>
                      {SingleAddy.address2 && (
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {SingleAddy.address2}
                        </p>
                      )}
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {SingleAddy.city}, {SingleAddy.zipCode}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {SingleAddy.country}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteAddy(SingleAddy._id)}
                      className="p-2 rounded-lg transition-all duration-200 hover:scale-110 shrink-0"
                      style={{
                        background: 'var(--error-light)',
                        color: 'var(--error)',
                      }}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>
                No addresses saved yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}