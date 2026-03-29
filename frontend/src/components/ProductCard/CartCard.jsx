/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaTimes, FaUndo, FaShippingFast } from 'react-icons/fa';

export default function CartCard({
  title,
  images,
  description,
  originalPrice,
  discountedPrice,
  id,
  createdBy,
  orderStatus,
  handleCancel,
}) {
  const discount = originalPrice > 0
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  const statusColors = {
    Processing: { bg: 'var(--amber-glow)', text: 'var(--amber-dark)', icon: '⏳' },
    Shipped: { bg: 'rgba(59,130,246,0.1)', text: '#3B82F6', icon: '🚚' },
    Delivered: { bg: 'var(--success-light)', text: 'var(--success)', icon: '✅' },
    Cancelled: { bg: 'var(--error-light)', text: 'var(--error)', icon: '❌' },
  };

  const statusStyle = statusColors[orderStatus] || statusColors.Processing;

  return (
    <div
      className="transition-all duration-300 hover:translate-x-1 animate-fade-in-up"
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border-light)',
        padding: '1rem',
        marginBottom: '0.75rem',
      }}
    >
      {orderStatus && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
          style={{
            background: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          <span>{statusStyle.icon}</span>
          {orderStatus}
        </div>
      )}

      <div className="flex gap-4 sm:gap-6">
        {/* Product Image */}
        <Link to={`/product-details/${id}`} className="shrink-0">
          <div
            className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <img
              src={typeof images === 'string' ? images : images?.[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3
                className="font-semibold text-base truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {title}
              </h3>
              <p
                className="text-sm mt-0.5 line-clamp-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {description}
              </p>
              {createdBy && (
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Sold by: {createdBy}
                </p>
              )}
            </div>

            {handleCancel && (
              <button
                className="shrink-0 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                style={{
                  color: 'var(--text-muted)',
                }}
                onClick={() => handleCancel(id)}
                title={orderStatus ? 'Cancel Order' : 'Remove'}
              >
                <FaTimes size={16} />
              </button>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span
              className="text-lg font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              ₹{discountedPrice}
            </span>
            {originalPrice && originalPrice !== discountedPrice && (
              <>
                <span
                  className="text-sm line-through"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ₹{originalPrice}
                </span>
                {discount > 0 && (
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--success)' }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          {/* Return Policy */}
          <div className="flex items-center gap-1.5 mt-2">
            <FaUndo size={11} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              14 days return available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
