import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import axios from 'axios';

const AddNews = () => {
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('fetchng new data')
                const response = await axios.get('http://localhost:8000/api/add_news/');
                setNewData(response.data);
            } catch (error) {
                console.error('Error adding news:', error);
            }
        };
        fetchData();
    }, []);

};

export default AddNews;