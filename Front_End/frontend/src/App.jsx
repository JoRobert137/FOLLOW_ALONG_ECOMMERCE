import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ProductEntryPage from './pages/ProductEntryPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
      </Routes>
    </>
  );
}

export default App;