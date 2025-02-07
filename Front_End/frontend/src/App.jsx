import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import ProductEntryPage from './pages/ProductEntryPage';
import UpdateForm from './pages/UpdateForm.jsx';
import Navbar from './components/Navbar/Navbar';
import SinglePageProduct from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/Profile.jsx';
import AddressCard from './components/AddressComp/AddressCard.jsx';
import SelectAddress from './pages/SelectAddressPage.jsx';
import OrderConfirmation from './pages/OrderConfirmationPage.jsx';
import OrderHistory from './pages/Order-History';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
        <Route path="/update-form/:id" element={<UpdateForm />} />
        <Route path="/product-details/:id" element={<SinglePageProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-address" element={<AddressCard />} />
        <Route path='/select-address' element={<SelectAddress />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />55
        <Route path="/order-history" element={<OrderHistory />} />55
      </Routes>
    </>
  );
}

export default App;