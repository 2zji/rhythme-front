import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import IndexPage from '../pages/IndexPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/Sign_up" element={<SignupPage />} />
    <Route path="/Login" element={<LoginPage />} />
    <Route path="/Index" element={<IndexPage />} />
  </Routes>
);

export default AppRoutes;
