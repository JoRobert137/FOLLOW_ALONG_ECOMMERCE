import LoginPage from './components/authorization/Login';
import SignupForm from './components/authorization/SignUp';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
  <Routes>
    <Route path="/" />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
  );
}

export default App;