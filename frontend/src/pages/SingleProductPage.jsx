import axios from 'axios';
import { Heart, ShoppingBag, Star, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageModal from '../components/ImageModal/ImageModal';

function SinglePageProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductSingleDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/get-single/${id}`
        );
        setProduct(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProductSingleDetails();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add items to the cart.');
      return;
    }
    try {
      await axios.post(`http://localhost:8080/cart/add-to-cart?token=${token}`, {
        productId: id,
        quantity: 1,
      });
      alert('Added to cart!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.discountedPrice) /
            product.originalPrice) *
            100
        )
      : 0;

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
    <div style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-6 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in-up">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div
              className="overflow-hidden cursor-pointer group"
              style={{ borderRadius: 'var(--radius-lg)' }}
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={product?.images?.[selectedImage]}
                alt={product.title}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Thumbnails */}
            {product?.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className="shrink-0 w-20 h-20 overflow-hidden transition-all duration-200"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${selectedImage === idx ? 'var(--amber)' : 'var(--border-light)'}`,
                      opacity: selectedImage === idx ? 1 : 0.6,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--amber)' }}>
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {product.title}
              </h1>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                style={{ background: 'var(--amber-glow)' }}
              >
                <span className="font-bold text-sm" style={{ color: 'var(--amber-dark)' }}>
                  {product.rating}
                </span>
                <Star size={14} fill="var(--amber)" color="var(--amber)" />
              </div>
            </div>

            {/* Price */}
            <div
              className="py-5 space-y-1"
              style={{
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                  ₹{product.discountedPrice}
                </span>
                <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>
                  MRP ₹{product.originalPrice}
                </span>
                {discount > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: 'var(--success-light)',
                      color: 'var(--success)',
                    }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs" style={{ color: 'var(--success)' }}>
                inclusive of all taxes
              </p>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                In Stock: <span className="font-bold" style={{ color: 'var(--success)' }}>{product.quantity}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-100"
                style={{
                  background: 'var(--gradient-amber)',
                  color: 'var(--midnight)',
                  boxShadow: 'var(--shadow-amber)',
                }}
              >
                <ShoppingBag size={18} />
                ADD TO CART
              </button>
              <button
                className="px-6 py-4 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && product?.images && (
        <ImageModal
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setShowImageModal={setShowImageModal}
        />
      )}
    </div>
  );
}

export default SinglePageProduct;