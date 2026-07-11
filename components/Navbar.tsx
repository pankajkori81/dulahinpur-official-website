"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 pt-6 md:pt-8">
      
      {/* =========================================
          DESKTOP VIEW (Screens larger than 768px)
          ========================================= */}
      
      <div className="hidden md:flex justify-between items-center relative w-full h-14">
        
        {/* Freestanding Desktop Logo */}
        {/* Adjusted to be perfectly level (top-1/2 -translate-y-1/2) and much larger (h-24 lg:h-32) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-50">
          <Image 
            src="/logo-bappa.png" 
            alt="Dulahinpur Logo" 
            width={400} 
            height={200} 
            className="w-auto mt-10 h-24 lg:h-32 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            priority 
          />
        </div>


      {/* 2. Desktop Navigation (Center Glass Pill, ONLY links) */}
      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-12 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] items-center gap-10 text-white font-medium">
        <Link href="#" className="hover:text-yellow-400 transition-colors tracking-wide">Home</Link>
        <Link href="#about" className="hover:text-yellow-400 transition-colors tracking-wide">About</Link>
        <Link href="#celebration" className="hover:text-yellow-400 transition-colors tracking-wide">Celebration</Link>
        <Link href="#gallery" className="hover:text-yellow-400 transition-colors tracking-wide">Gallery</Link>
        <Link href="#contact" className="hover:text-yellow-400 transition-colors tracking-wide">Contact</Link>
        <Link href="#feedback" className="hover:text-yellow-400 transition-colors tracking-wide">Feedback</Link>
      </nav>

      </div>

      {/* =========================================
          MOBILE VIEW (Screens smaller than 768px)
          ========================================= */}
      
      {/* 3. Mobile Glass Pill (Logo on left, Hamburger on right) */}
      <nav className="md:hidden relative mx-auto w-[96%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center justify-between text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300">
        
        {/* Mobile Logo */}
       {/* <div className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Dulahinpur Logo" 
            width={200} 
            height={100} 
            className="w-auto h-12 object-contain drop-shadow-md"
            priority 
          />
        </div> */}

        <div className="flex items-center -ml-5">
          <Image 
            src="/logo-bappa.png" 
            alt="Dulahinpur Logo" 
            width={200} 
            height={100} 
            className="w-auto h-12 md:h-18 object-contain drop-shadow-md"
            priority 
          />
        </div>

      

        {/* Hamburger Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white focus:outline-none transition-transform duration-300"
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              // X (Close) Icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger (Menu) Icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* 4. Mobile Dropdown Menu (Enhanced Visibility) */}
      {isOpen && (
        <div className="md:hidden absolute top-[94px] left-1/2 -translate-x-1/2 w-[95%] bg-black/50 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-8 shadow-[0_16px_40px_0_rgba(0,0,0,0.6)] text-white">
            <Link 
            href="#home" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-medium hover:text-yellow-400 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="#about" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-medium hover:text-yellow-400 transition-colors"
          >
            About
          </Link>
          <Link 
            href="#celebration" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-medium hover:text-yellow-400 transition-colors"
          >
            Celebration
          </Link>
          <Link 
            href="#gallery" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-medium hover:text-yellow-400 transition-colors"
          >
            Gallery
          </Link>
          <Link 
            href="#contact" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-medium hover:text-yellow-400 transition-colors"
          >
            Contact
          </Link>
            <Link 
            href="#feedback" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-medium hover:text-yellow-400 transition-colors"
          >
            Feedback
          </Link>
        </div>

        
      )}
      
    </header>
  );
};

export default Navbar;
