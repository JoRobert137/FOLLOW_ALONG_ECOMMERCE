/* eslint-disable react/prop-types */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
      console.log('Product Added To Cart Successfully...');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
  };

  return (
    <div
      className="w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product-details/${id}`)}
    >
      {/* Image Container */}
      <div className="relative">
        <img
          src={image}
          alt="Product"
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          -20%
        </span>
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="ml-2 text-sm text-gray-600">{rating}</span>
        </div>
        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">${originalPrice}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹{discountedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-5 flex justify-between">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation on button click
            handleAddToCart();
          }}
        >
          Add to Cart
        </button>
        <Link to={`/update-form/${id}`}>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent navigation on link click
          >
            Update
          </button>
        </Link>
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation on button click
            handleDelete(id);
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default Card;