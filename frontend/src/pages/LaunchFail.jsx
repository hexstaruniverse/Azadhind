import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterLine from '../assets/FooterLine.svg';

const LaunchFail = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/launch-pass"); // change to your target route
    },30000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);
  return (
    <div className='w-full h-full bg-black'>
      <Navbar />
      <div className='pt-15'>
      <div className="bg-[url('./assets/LaunchFail.svg')] bg-cover bg-center w-full h-[900px]">
        <div className='flex flex-col items-end pt-40 pr-20 gap-2'>

        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default LaunchFail
