import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNews = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback( async () => {
        setIsLoading(true);
        toast.info('Request sent! Waiting for response from the server');

        try {
            console.log('fetching new data from AddNews');
            const response = await axios.get('http://localhost:8000/api/add_news/');
            if (response.status === 200) {
                toast.success('Your request was successful!');
            }
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
    }, []);

    return (
        <div>
            <h1>{message}</h1>
            <button className="bg-gray-950 hover:bg-[#B96663] text-stone-50 font-roboto font-medium py-2 px-4 rounded-full mr-16 focus:outline-none focus:shadow-outline" type='button' onClick={fetchData} disabled={isLoading}>{isLoading ? 'Loading...' : 'Fetch Data'}</button>
            <ToastContainer />
        </div>
    );
};

export default AddNews;
