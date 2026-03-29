import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/ProductCard/Card';
import { FaFire, FaArrowRight } from 'react-icons/fa';

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/product/get-products'
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/product/${id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div style={{ background: 'var(--surface)' }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'var(--gradient-hero)',
          minHeight: '320px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: 'var(--amber-glow)',
                color: 'var(--amber)',
              }}
            >
              <FaFire size={12} />
              New Arrivals
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black leading-tight mb-4"
              style={{ color: 'var(--text-inverse)' }}
            >
              Discover Your{' '}
              <span style={{ color: 'var(--amber)' }}>Style</span>
            </h1>
            <p
              className="text-base sm:text-lg mb-8 max-w-lg"
              style={{ color: 'var(--slate-light)' }}
            >
              Curated collections of premium products. Unbeatable quality at
              incredible prices.
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--gradient-amber)',
                color: 'var(--midnight)',
                boxShadow: 'var(--shadow-amber)',
              }}
            >
              Shop Now
              <FaArrowRight size={12} />
            </a>
          </div>
        </div>
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'var(--amber)' }}
        />
        <div
          className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full opacity-5"
          style={{ background: 'var(--amber)' }}
        />
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              All Products
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {data.length} items available
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  background: 'var(--card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div className="aspect-[4/5]" style={{ background: 'var(--border-light)' }} />
                <div className="p-4 space-y-3">
                  <div className="h-4 rounded" style={{ background: 'var(--border-light)', width: '70%' }} />
                  <div className="h-3 rounded" style={{ background: 'var(--border-light)', width: '100%' }} />
                  <div className="h-6 rounded" style={{ background: 'var(--border-light)', width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-children">
            {data.map((ele) => (
              <Card
                key={ele._id}
                title={ele.title}
                image={ele.images[0] || '/placeholder.png'}
                description={ele.description}
                discountedPrice={ele.discountedPrice}
                originalPrice={ele.originalPrice}
                rating={ele.rating}
                id={ele._id}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20"
            style={{ color: 'var(--text-muted)' }}
          >
            <p className="text-5xl mb-4">🛍️</p>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              No products yet
            </h3>
            <p className="text-sm">
              Start adding products to see them here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
