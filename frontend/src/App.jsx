import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import ProductEntryPage from './pages/ProductEntryPage';
import UpdateForm from './pages/UpdateForm.jsx';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SinglePageProduct from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/Profile.jsx';
import AddressCard from './components/AddressComp/AddressCard.jsx';
import SelectAddress from './pages/SelectAddressPage.jsx';
import OrderConfirmation from './pages/OrderConfirmationPage.jsx';
import OrderHistory from './pages/Order-History';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
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
          <Route path="/select-address" element={<SelectAddress />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;