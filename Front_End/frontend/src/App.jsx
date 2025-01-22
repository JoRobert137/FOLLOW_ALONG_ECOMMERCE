import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProductEntryPage from './pages/ProductEntryPage';
import UpdateForm from './Pages/UpdateForm';
import Navbar from './components/Navbar/Navbar';
import SinglePageProduct from './pages/SingleProductPage';
import CartPage from './pages/CartPage';

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
      </Routes>
    </>
  );
}

export default App;