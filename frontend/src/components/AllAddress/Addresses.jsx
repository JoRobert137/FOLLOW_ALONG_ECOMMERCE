/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const AddressList = ({ addresses }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <FaMapMarkerAlt
          size={48}
          className="mx-auto mb-4"
          style={{ color: 'var(--text-muted)' }}
        />
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          No addresses found
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Add an address to continue checkout
        </p>
        <button
          onClick={() => navigate('/add-address')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: 'var(--gradient-amber)',
            color: 'var(--midnight)',
          }}
        >
          Add Address
        </button>
      </div>
    );
  }

  const handleClickAddress = (address) => {
    setSelected(address._id);
    localStorage.setItem('address', JSON.stringify(address));
    setTimeout(() => navigate('/order-confirmation'), 300);
  };

  return (
    <div className="space-y-3 stagger-children">
      {addresses.map((address, index) => (
        <div
          key={index}
          className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'var(--card)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)',
            border: selected === address._id
              ? '2px solid var(--amber)'
              : '1px solid var(--border-light)',
            padding: '1.25rem',
          }}
          onClick={() => handleClickAddress(address)}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                  style={{
                    background: 'var(--amber-glow)',
                    color: 'var(--amber-dark)',
                  }}
                >
                  {address.addressType || 'Address'}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {address.address1}
              </p>
              {address.address2 && (
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {address.address2}
                </p>
              )}
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {address.city}
                {address.zipCode && `, ${address.zipCode}`}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {address.country}
              </p>
            </div>
            {selected === address._id && (
              <FaCheckCircle size={20} style={{ color: 'var(--amber)' }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
