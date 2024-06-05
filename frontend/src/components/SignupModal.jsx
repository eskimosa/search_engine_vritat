import React, { useState } from 'react';
import axios from 'axios';

const SignupModal = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup/', {
                username: username,
                password: password,
                email: email
            });
            closeModal();
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 rounded border" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 rounded border" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded border" />
                    <button type="submit" className="bg-[#B96663] text-white py-2 rounded hover:scale-105 duration-300">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
