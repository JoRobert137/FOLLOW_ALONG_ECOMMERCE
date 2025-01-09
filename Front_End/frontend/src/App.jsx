import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ProductEntryPage from './pages/ProductEntryPage';
import UpdateForm from './pages/UpdateForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
        <Route path="/update-form/:id" element={<UpdateForm />} />
      </Routes>
    </>
  );
}

export default App;