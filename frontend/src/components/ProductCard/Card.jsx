/* eslint-disable react/prop-types */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaTrash, FaEdit } from 'react-icons/fa';

function Card({
  title,
  image,
  description,
  discountedPrice,
  originalPrice,
  rating,
  id,
  handleDelete,
}) {
  const navigate = useNavigate();

  const discount = originalPrice > 0
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add items to the cart.');
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/cart/add-to-cart?token=${token}`,
        { productId: id, quantity: 1 }
      );
      alert('Added to cart!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart.');
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        size={12}
        style={{
          color: i < Math.round(rating) ? 'var(--amber)' : 'var(--border)',
        }}
      />
    ));
  };

  return (
    <div
      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border-light)',
      }}
      onClick={() => navigate(`/product-details/${id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
            }}
          >
            -{discount}%
          </span>
        )}
        {/* Hover overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-semibold text-sm mb-1 line-clamp-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-xs mb-3 line-clamp-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {renderStars()}
          <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
            ({rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span
            className="text-lg font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            ₹{discountedPrice}
          </span>
          {originalPrice && originalPrice !== discountedPrice && (
            <span
              className="text-sm line-through"
              style={{ color: 'var(--text-muted)' }}
            >
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-100"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <FaShoppingCart size={12} />
            Add to Cart
          </button>
          <Link to={`/update-form/${id}`} onClick={(e) => e.stopPropagation()}>
            <button
              className="p-2.5 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <FaEdit size={14} />
            </button>
          </Link>
          <button
            className="p-2.5 rounded-xl transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--error-light)',
              color: 'var(--error)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;