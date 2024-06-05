import React from 'react';
import FetchNewsPage from './pages/FetchNewsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleNews from './components/ScheduleNews/ScheduleNews';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NewsDashboardPage from './pages/NewsDashboardPage';
import LandingPage from './pages/LandingPage';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/home' element={<HomePage />} />
          <Route exact path="/news_dash" element={<NewsDashboardPage />} />
          <Route exact path="/add_news" element={<FetchNewsPage />} />
          <Route exact path="/schedule_news" element={<ScheduleNews />} />
      </Routes>
    </Router>
  );
};

export default App;