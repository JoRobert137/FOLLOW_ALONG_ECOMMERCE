/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Card from '../components/ProductCard/Card.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';


function HomePage() {
  const [data, setdata] = useState();
  const dataRedux = useSelector((state) => state.user);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/get-products');
      setdata(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const callhandle = async () => {
      await fetchProduct();
    };
    callhandle();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/product/${id}`);
      setdata(response.data.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Home Page for Follow Along</h1>

      <div className="grid grid-cols-3">
        {data?.map((ele, index) => (
          <div key={ele._id} className="border border-white mx-auto">
            <Card
              title={ele.title}
              image={ele.images[0] ? ele.images[0] : 'Product Image missing'}
              Index={index}
              description={ele.description}
              originalPrice={ele.originalPrice}
              discountedPrice={ele.discountedPrice}
              rating={ele.rating}
              id={ele._id}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;