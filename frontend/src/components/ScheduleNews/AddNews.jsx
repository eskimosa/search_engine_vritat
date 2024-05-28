import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddNews = () => {
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            console.log('fetching new data from AddNews');
            const response = await axios.get('http://localhost:8000/api/add_news/');
            if (response.data.length > 0) {
                setMessage('Your data has been updated!');
                console.log(response.data);
            } else {
                setMessage('No fresh news were added');
            }
        } catch (error) {
            console.error('Error adding news:', error);
            setMessage('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={fetchData} disabled={isLoading}>Fetch Data</button>
        </div>
    );
};

export default AddNews;
