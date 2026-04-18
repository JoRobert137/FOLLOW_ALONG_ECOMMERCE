import axios from 'axios';
import { useEffect, useState } from 'react';
import CartCard from '../components/ProductCard/CartCard';
import { useNavigate } from 'react-router-dom';
import { handlePay } from '../Utils/Razorpay';
import { FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

export default function OrderConfirmation() {
  const [cartData, setUsersCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userAddress, setAddress] = useState(
    JSON.parse(localStorage.getItem('address')) || {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Token is missing, Please login');
      try {
        const response = await axios.get(
          `http://localhost:8080/cart/get-user-cart-data?token=${token}`
        );
        let sum = 0;
        response.data.cartData.forEach((ele) => {
          sum += ele.productId.discountedPrice;
        });
        setTotal(sum);
        setUsersCartData(response.data.cartData);
      } catch (err) {
        console.error(err);
      }
    };
    getCartData();
  }, []);

  const confirmOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token is missing please signup');
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/orders/confirm-order?token=${token}`,
        {
          Items: cartData,
          address: userAddress,
          totalAmount: total,
        }
      );
      handlePay(total, token, cartData)
        .then(() => navigate('/order-history'))
        .catch((er) => console.log(er.message));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh]" style={{ background: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Order Confirmation
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Review your order before placing it
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Shipping Address */}
            {userAddress && Object.keys(userAddress).length > 0 && (
              <div
                className="p-5 mb-4 animate-fade-in-up"
                style={{
                  background: 'var(--card)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt size={14} style={{ color: 'var(--amber)' }} />
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Shipping Address
                  </h3>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <p className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                    {userAddress.addressType || 'Address'}
                  </p>
                  <p>{userAddress.address1}</p>
                  {userAddress.address2 && <p>{userAddress.address2}</p>}
                  <p>
                    {userAddress.city}
                    {userAddress.zipCode && `, ${userAddress.zipCode}`}
                  </p>
                  <p>{userAddress.country}</p>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="stagger-children">
              {cartData?.map(({ productId }, index) => (
                <CartCard
                  key={productId?._id || index}
                  title={productId?.title}
                  description={productId?.description}
                  createdBy={productId?.userEmail || 'ShopSphere'}
                  discountedPrice={productId?.discountedPrice}
                  images={productId?.images}
                  originalPrice={productId?.originalPrice}
                />
              ))}
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-1">
            <div
              className="p-6 sticky top-24 animate-fade-in-up"
              style={{
                background: 'var(--card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-light)',
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Order Summary
              </h3>

              <div className="space-y-3 mb-4" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Items ({cartData.length})</span>
                  <span style={{ color: 'var(--text-primary)' }}>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ color: 'var(--success)' }}>FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                  Total
                </span>
                <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  ₹{total}
                </span>
              </div>

              <button
                onClick={confirmOrder}
                disabled={loading}
                className="w-full py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.01] disabled:opacity-60"
                style={{
                  background: 'var(--gradient-amber)',
                  color: 'var(--midnight)',
                  boxShadow: 'var(--shadow-amber)',
                }}
              >
                {loading ? 'Processing...' : `Place Order — ₹${total}`}
              </button>

              <div className="flex items-center gap-2 mt-4 justify-center">
                <FaShieldAlt size={12} style={{ color: 'var(--success)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Secure payment with Razorpay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
