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
        <div className="md:hidden absolute top-[90px] left-1/2 -translate-x-1/2 w-[95%] bg-black/50 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-8 shadow-[0_16px_40px_0_rgba(0,0,0,0.6)] text-white">
          <Link 
            href="#about" 
            onClick={() => setIsOpen(false)} 
            className="text-2xl font-medium hover:text-yellow-400 transition-colors"
          >
            About
          </Link>
          <Link 
            href="#celebration" 
            onClick={() => setIsOpen(false)} 
            className="text-2xl font-medium hover:text-yellow-400 transition-colors"
          >
            Celebration
          </Link>
          <Link 
            href="#gallery" 
            onClick={() => setIsOpen(false)} 
            className="text-2xl font-medium hover:text-yellow-400 transition-colors"
          >
            Gallery
          </Link>
          <Link 
            href="#contact" 
            onClick={() => setIsOpen(false)} 
            className="text-2xl font-medium hover:text-yellow-400 transition-colors"
          >
            Contact
          </Link>
        </div>

        
      )}
      
    </header>
  );
};

export default Navbar;

// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//     {/* Main Floating Glass Navbar */}
//     <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      
//       {/* 1. Left Side: Logo (Taking up 1/3 of the space to help center the links) */}
      
//       <div className="flex items-center gap-2 pl-2 w-1/3">
//         <span className="text-yellow-400 text-2xl font-bold">Your logo</span>
//       </div>

//       {/* 2. Center: 4 Navigation Links (Hidden on Mobile) */}
//       <ul className="hidden md:flex items-center justify-center gap-10 text-base font-medium w-1/3">
//         <li><Link href="#about" className="hover:text-yellow-400 transition-colors">About</Link></li>
//         <li><Link href="#celebration" className="hover:text-yellow-400 transition-colors">Celebration</Link></li>
//         <li><Link href="#gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link></li>
//         <li><Link href="#contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
//       </ul>

//       {/* Invisible Right Side (Taking up 1/3 of the space to keep the center links perfectly centered on desktop) */}
//       <div className="hidden md:block w-1/3"></div>

//       {/* 3. Mobile: Hamburger Icon (Hidden on Desktop) */}
//       <div className="md:hidden flex items-center pr-2">
//         <button 
//           onClick={() => setIsOpen(!isOpen)} 
//           className="text-white-600 focus:outline-none transition-transform duration-300"
//           aria-label="Toggle menu"
//         >
//           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {isOpen ? (
//               // X (Close) Icon
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               // Hamburger (Menu) Icon
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* --- Mobile Dropdown Menu (Glass Effect) --- */}
//       {isOpen && (
//         <div className="absolute top-20  left-0 w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] md:hidden">
//           <Link 
//             href="#about" 
//             onClick={() => setIsOpen(false)} 
//             className="text-xl font-medium hover:text-yellow-400 transition-colors"
//           >
//             About
//           </Link>
//           <Link 
//             href="#celebration" 
//             onClick={() => setIsOpen(false)} 
//             className="text-xl font-medium hover:text-yellow-400 transition-colors"
//           >
//             Celebration
//           </Link>
//           <Link 
//             href="#gallery" 
//             onClick={() => setIsOpen(false)} 
//             className="text-xl font-medium hover:text-yellow-400 transition-colors"
//           >
//             Gallery
//           </Link>
//           <Link 
//             href="#contact" 
//             onClick={() => setIsOpen(false)} 
//             className="text-xl font-medium hover:text-yellow-400 transition-colors"
//           >
//             Contact
//           </Link>
//         </div>
//       )}
//     </nav>
//     </>
//   );
// };

// export default Navbar;




// import React from 'react';
// import Link from 'next/link';

// const Navbar = () => {
//   return (
//     <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 flex items-center justify-between px-6 py-4 text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
//       {/* Floating Glassmorphism Navbar */}
      
//       {/* Left: Logo */}
//       <div className="flex items-center gap-2 pl-2">
//         <span className="text-yellow-400 text-2xl font-bold">Your logo</span>
//       </div>

//       {/* Center: Navigation Links */}
//       <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
//         <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
//         <li><Link href="#about" className="hover:text-yellow-400 transition-colors">About</Link></li>
//         <li><Link href="#celebration" className="hover:text-yellow-400 transition-colors">Celebration</Link></li>
//         <li><Link href="#gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link></li>
//         <li><Link href="#contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
//       </ul>

     
      
//     </nav>
//   );
// };

// export default Navbar;