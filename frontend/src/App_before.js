import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("fetching data")
      const response = await axios.get('http://localhost:8000/api/news/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className='table-container'>
      <table style={{overflow: 'auto', maxWidth: '100vw'}}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Summary</th>
            <th>Content</th>
            <th>Published</th>
            <th>Link</th>
            <th>Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td style={{overflow: 'auto', maxWidth: '30vw'}}>{item.title}</td>
              <td style={{overflow: 'auto', maxWidth: '30vw'}}>{item.summary}</td>
              <td style={{overflow: 'auto', maxWidth: '300vw'}}>{item.content}</td>
              <td>{item.published}</td>
              <td><a href={item.link}>Read more</a></td>
              <td>{item.sentiment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;