import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <header className="w-full p-4 flex justify-between items-center">
  <div className="ml-auto">
    <div className="text-[#B96663] text-md font-bold">
      {username ? `${username} is here!` : 'Welcome!'}
    </div>
    <div>
    {username && (
      <button
        onClick={handleLogout}
        className="bg-[#B96663] text-md text-white py-1 px-3 rounded hover:scale-105 duration-300"
      >
        Logout
      </button>
    )}
    </div>
  </div>
</header>
  );
};
export default Header;
