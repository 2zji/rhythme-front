import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/SignupPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/Sign_up" element={<SignupPage />} />
  </Routes>
);

export default AppRoutes;
