import React, { useState, useEffect } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import homeImage from "../assets/homeImage.jpeg";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    if (isAuthenticated) {
        navigate('/news_dash');
    }
}, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-roboto font-medium text-[#B96663] mb-8 mt-10">
        Welcome to Vritat Search Engine!
      </h1>
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg max-w-6xl p-10 md:p-14 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#B96663] mt-0">Login</h2>
          <p className="text-lg mt-4 text-[#B96663]">
            If you are already a member, log in easily
          </p>
          <Login />
          <div className="mt-7 text-md border-t border-gray-400 py-4 flex justify-between items-center">
            <p>Don't have an account?</p>
            <button
              onClick={openSignupModal}
              className="py-2 px-5 text-md bg-white border rounded hover:scale-105 duration-300"
            >
              Register
            </button>
          </div>
        </div>

        <div className="md:w-1/2 md:pl-12 mt-10 md:mt-0">
          <img src={homeImage} className="rounded-lg" alt="Home" />
        </div>
      </div>
      {showSignupModal && <Signup closeModal={closeSignupModal} />}
    </section>
    </div>
  );
};

export default LandingPage;
