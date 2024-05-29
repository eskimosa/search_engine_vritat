import React from 'react';
import NewsTable from './components/NewsTable';
import AddNews from './components/AddNews';
import FetchNewsPage from './pages/FetchNewsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleNews from './components/ScheduleNews/ScheduleNews';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NewsDashboardPage from './pages/NewsDashboardPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />} />
          <Route index element={<HomePage />} />
          <Route path="/list_news" element={<NewsTable />} />
          <Route path="/add_news" element={<FetchNewsPage />} />
          <Route path="/schedule_news" element={<ScheduleNews />} />
          <Route path="/news_dash" element={<NewsDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;