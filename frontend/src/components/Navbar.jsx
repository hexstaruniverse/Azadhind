import React from 'react';
import Azad from '../assets/Azad.svg';

const Navbar = () => {
  return (
    <div className='w-full h-20 bg-black border-b-2 border-white/10 font-sans'>
        <div className='pl-25 pt-4 inline-flex'>
            <div className='flex justify-left items-center'>
                <a href="/"><img src={Azad} alt='Logo'/></a>
            </div>
            <div className='pl-65 pt-1 inline-flex gap-20 text-[18px] justify-center items-center'>
                <div className='text-white'><a href="">About</a></div>
                <div className='text-white'><a href="">Azad</a></div>
                <div className='text-white'><a href="/contact-us">Contact Us</a></div>
                <div className='text-white'><a href="">News</a></div>
            </div>
            <div className='pl-70 pt-1'>
                <a href='/book-launch' className='flex justify-center items-center w-36 h-10 text-white border border-[#F00000] font-sans'>Book Launch</a>
            </div>
        </div>
    </div>
  );
};

export default Navbar;