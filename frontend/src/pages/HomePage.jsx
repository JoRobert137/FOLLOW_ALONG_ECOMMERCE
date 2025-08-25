/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Footer from '../components/Footer/Footer';

function HomePage() {
  const [data, setdata] = useState([]);
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
    fetchProduct();
  }, []);


  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <>
      <div className="flex justify-evenly overflow-x-auto p-4 mt-6 space-x-2">
        {data.map((ele) => (
          <div
            key={ele._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden w-64 flex-shrink-0 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={ele.images[0] ? ele.images[0] : '/placeholder.png'}
              alt={ele.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{ele.title}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{ele.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800">
                    ${ele.discountedPrice}
                  </span>
                  {ele.originalPrice && ele.originalPrice !== ele.discountedPrice && (
                    <span className="text-sm line-through text-gray-400">
                      ${ele.originalPrice}
                    </span>
                  )}
                </div>
                {renderRating(ele.rating)}
              </div>

              <div className="flex justify-between items-center">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <Footer />
    </>
  );
}

export default HomePage;
