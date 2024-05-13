import React from 'react';
import NewsTable from './components/NewsTable/NewsTable';
import AddNews from './components/AddNews/AddNews';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleNews from './components/AddNews/ScheduleNews';

const News = () => {
  return <h1>News Management System</h1>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/list_news" element={<NewsTable />} />
        <Route path="/add_news" element={<AddNews />} />
        <Route path="/schedule_news" element={<ScheduleNews />} />
      </Routes>
    </Router>
  );
};

export default App;