import axios from 'axios';
import { useEffect, useState } from 'react';
import CartCard from '../components/ProductCard/CartCard';
import { FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const [OrderedData, SetOrderedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchedOrderedProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return alert('Token is missing, Please login');
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/orders/user-orders-data?token=${token}`
      );
      const reversedData = response.data.orders?.reverse();
      SetOrderedData(reversedData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedOrderedProducts();
  }, []);

  const handleCancel = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token is missing, Please login');
    try {
      await axios.patch(
        `http://localhost:8080/orders/cancel-order?token=${token}&orderId=${id}`
      );
      fetchedOrderedProducts();
    } catch (err) {
      console.error(err);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Order History
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {OrderedData.length} order{OrderedData.length !== 1 && 's'}
        </p>

        {OrderedData.length > 0 ? (
          <div className="space-y-3 stagger-children">
            {OrderedData.map((singleCartObject, index) => (
              <CartCard
                key={index}
                title={singleCartObject.orderItems?.title}
                images={singleCartObject.orderItems?.images?.[0]}
                description={singleCartObject.orderItems?.description}
                originalPrice={singleCartObject.orderItems?.originalPrice}
                discountedPrice={singleCartObject.orderItems?.discountedPrice}
                id={singleCartObject._id}
                orderStatus={singleCartObject.orderStatus}
                createdBy="ShopSphere"
                handleCancel={handleCancel}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <FaBox
              size={48}
              className="mx-auto mb-4"
              style={{ color: 'var(--text-muted)' }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              No orders yet
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Your order history will appear here.
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

export default OrderHistory;