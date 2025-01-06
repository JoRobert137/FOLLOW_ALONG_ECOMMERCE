import { useEffect, useState } from 'react';
import Card from '../components/authorization/ProductCard/Card';
import axios from 'axios';

function HomePage() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/get-products');
      setProduct(response.data.data);
      console.log(response)
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  useEffect(() => {
    
    getProducts();
  }, []);

  return (
    <>
      <h1 className="text-center">Home Page for Follow Along</h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4 p-4">
        {product.length > 0 ? (
          product.map((ele, index) => (
            <div style={{ margin: 'auto' }} key={index}>
              <Card product={ele} />
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
