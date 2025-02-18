/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import axios from 'axios';
import CartCard from '../components/ProductCard/CartCard.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function CardPage() {
  const [UsersCartData, setUsersCartData] = useState([]);
  const data = useSelector((state) => state.user);

  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return alert('Token is missing , Please login');
      }
      const response = await axios.get(
        `http://localhost:8080/cart/get-user-cart-data?token=${token}`
      );
      console.log(response);
      setUsersCartData(response.data.cartData);
    };

    getCartData();
  }, []);
  return (
    <div>
       {UsersCartData.length > 0 ? (
        <>
          <Link to={`/select-address`}>
            <button className="bg-slate-800 text-white px-5 py-2 rounded-md ml-40">
              Checkout
            </button>
          </Link>
          {UsersCartData?.map((singleCartObject, index) => {
            return (
              <div key={index}>
                <CartCard
                  title={singleCartObject.productId.title}
                  images={singleCartObject.productId.images[0]}
                  //   Index={index}
                  description={singleCartObject.productId.description}
                  originalPrice={singleCartObject.productId.originalPrice}
                  discountedPrice={singleCartObject.productId.discountedPrice}
                  id={singleCartObject.productId._id}
                  createdBy={'JoRobert'}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex justify-center max-h-[100vh] items-center">
          <h1>Cart is empty</h1>
        </div>
      )}
    </div>
  );
}

export default CardPage;