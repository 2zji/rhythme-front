import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import IndexPage from '../pages/IndexPage';
import AllSongsPage from '../pages/AllSongsPage';
import SongLearnPage from '../pages/SongLearnPage';
import VocabQuizPage from '../pages/VocabQuizPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/Sign_up" element={<SignupPage />} />
    <Route path="/Login" element={<LoginPage />} />
    <Route path="/Index" element={<IndexPage />} />
    <Route path="/Songs" element={<AllSongsPage />} />
    <Route path="/learn/:songId" element={<SongLearnPage />} />
    <Route path="/learn/quiz/:songId" element={<VocabQuizPage />} />
  </Routes>
);

export default AppRoutes;
