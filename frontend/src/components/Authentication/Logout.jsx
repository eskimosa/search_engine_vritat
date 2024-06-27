import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/auth/logout/`, {
                refresh: localStorage.getItem('refresh_token')
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;