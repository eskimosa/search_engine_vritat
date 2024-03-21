import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/news/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Summary</th>
            <th>Content</th>
            <th>Published</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td>{item.summary}</td>
              <td>{item.content}</td>
              <td>{item.published}</td>
              <td><a href={item.link}>Read more</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;