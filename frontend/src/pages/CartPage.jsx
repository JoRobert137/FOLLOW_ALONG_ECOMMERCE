import { useEffect, useState } from 'react';
import axios from 'axios';
import CartCard from '../components/ProductCard/CartCard.jsx';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa';

function CartPage() {
  const [UsersCartData, setUsersCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return alert('Token is missing, Please login');
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/cart/get-user-cart-data?token=${token}`
        );
        setUsersCartData(response.data.cartData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCartData();
  }, []);

  const total = UsersCartData.reduce(
    (sum, item) => sum + (item.productId?.discountedPrice || 0),
    0
  );

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Shopping Cart
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {UsersCartData.length} item{UsersCartData.length !== 1 && 's'} in your cart
        </p>

        {UsersCartData.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-8 stagger-children">
              {UsersCartData.map((singleCartObject, index) => (
                <CartCard
                  key={index}
                  title={singleCartObject.productId?.title}
                  images={singleCartObject.productId?.images?.[0]}
                  description={singleCartObject.productId?.description}
                  originalPrice={singleCartObject.productId?.originalPrice}
                  discountedPrice={singleCartObject.productId?.discountedPrice}
                  id={singleCartObject.productId?._id}
                  createdBy="ShopSphere"
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div
              className="p-6 animate-fade-in-up"
              style={{
                background: 'var(--card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Subtotal ({UsersCartData.length} items)
                </span>
                <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  ₹{total}
                </span>
              </div>
              <Link to="/select-address">
                <button
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: 'var(--gradient-amber)',
                    color: 'var(--midnight)',
                    boxShadow: 'var(--shadow-amber)',
                  }}
                >
                  Proceed to Checkout
                  <FaArrowRight size={12} />
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <FaShoppingBag
              size={48}
              className="mx-auto mb-4"
              style={{ color: 'var(--text-muted)' }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Your cart is empty
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--gradient-amber)',
                color: 'var(--midnight)',
              }}
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;