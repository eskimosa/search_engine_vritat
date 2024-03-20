import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/news/');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div>
      <h1>News List</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Summary</th>
            <th>Content</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td>{item.summary}</td>
              <td>{item.content}</td>
              <td>{item.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;