'use client';
import React from "react";
import Image from "next/image";
import { GridScan } from "./GridScan";
// import Lightfall from "./LineFall";

// 👇 1. सबसे पहले dynamic को इम्पोर्ट करें
import dynamic from 'next/dynamic';

// 👇 2. पुरानी वाली import Lightfall लाइन हटाकर यह लगाएँ
const Lightfall = dynamic(() => import('./LineFall'), { 
  ssr: false 
});

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative w-full pt-12 pb-20 px-4 md:px-8 lg:px-24 flex flex-col min-h-screen overflow-hidden bg-black"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="absolute inset-0 z-0 opacity-60"> 
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A29FF"
          speed={0.5}
          streakCount={1}
          streakWidth={1}
          streakLength={1}
          glow={0.5}
          density={0.3}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction={false}
       
        
        />
      </div>

      {/* Local Style Block for Constrained Marquee */}
      <style>{`
        .marquee-container {
          max-width: 800px;
          margin: 0 auto;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .marquee-content {
          display: inline-block;
          padding-left: 100%;
          animation: marquee-scroll 18s linear infinite;
          will-change: transform;
        }
        
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>


      {/* --- CUSTOM BUTTON STYLES --- */}
      <style>{`
        .gradient-button {
          position: relative;
          padding: 12px 32px;
          font-size: 20px;
          font-weight: bold;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s ease;
          display: inline-flex;
          text-decoration: none;
          z-index: 20;
        }

        .gradient-button:hover { transform: scale(1.05); }
        .gradient-button:active { transform: scale(0.95); }

        .gradient-button::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          /* Festival Colors Gradient */
          background: conic-gradient(
            from 0deg,
            #ff4a4a,
            #004ac2,
            #FFD700,
            #750000
          );
        
          z-index: -2;
          filter: blur(6px);
          /* CONTINUOUS RUNNING BORDER LIGHT EFFECT */
          animation: spin-border 2.5s linear infinite; 
        }

        .gradient-button::after {
          content: "";
          position: absolute;
          inset: 3px;
          background: #111; /* Matches Hero background */
          border-radius: 12px;
          z-index: -1;
        }

        .gradient-text {
          color: transparent;
          background: linear-gradient(90deg, #fbe6e6, #d8d8d8, #f7ebeb);
          background-clip: text;
          -webkit-background-clip: text;
          font-family: var(--font-mukta), sans-serif;
          letter-spacing: 1px;
        }

        /* KEYFRAMES FOR CONTINUOUS SPIN */
        @keyframes spin-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    

      {/* Sthapana Text - Fixed for Mobile (Left side, smaller, pushed down) */}
      <div className="absolute z-20 top-28 left-4 md:top-12 md:right-8 md:left-auto bg-[#F5B53F] text-[#2A1B54] px-3 py-1 md:px-6 md:py-2 font-bold text-sm md:text-xl shadow-lg rounded-br-2xl rounded-tl-2xl font-[family-name:var(--font-mukta)]">
        स्थापना :- २०२०
      </div>

      {/* Top Center: Mantra */}
      <div className="relative z-10 w-full mt-29 md:mt-24">
        <div className="marquee-container">
          <p className="marquee-content text-yellow-400 text-xl md:text-3xl font-bold font-[family-name:var(--font-mukta)] drop-shadow-lg">
            ॥ वक्रतुंड महाकाय सूर्यकोटी समप्रभ निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥
          </p>
        </div>
      </div>

      {/* Main Content: Split Layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full flex-grow mt-4 md:mt-0">

        {/* Left Column (Title + Desktop Slogan) */}
        <div className="z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative order-1">
          {/* Decorative glow behind heading */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-500 opacity-20 blur-[100px] rounded-full -z-10"></div>

          {/* Title - Centered with little gap on mobile */}
          <div className="w-full flex justify-center md:justify-start mt-6 md:mt-16 mb-2 md:mb-8 md:-ml-8 lg:-ml-20">
            <Image 
              src="/title-image.png" 
              alt="Dulahinpur Ganesh Utsav" 
              width={1200}
              height={375} 
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 550px, 800px"
              className="w-[90%] max-w-[280px] md:max-w-[550px] lg:max-w-[800px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 md:origin-left lg:scale-110 xl:scale-125"
              priority 
            />
          </div>
     
        
          {/* Slogan & Button - DESKTOP ONLY */}
          <div className="hidden md:flex flex-col items-start relative w-full max-w-2xl -mt-10 md:-mt-15 mb-6 md:mb-8 ml-10 md:ml-12 group">
            
            {/* Slogan Image */}
            <div className="relative w-full">
              <div className="absolute inset-20 bg-yellow-400/30 blur-[40px] rounded-full -z-10 group-hover:bg-yellow-400/40 transition-all duration-500"></div>
              <div className="flex justify-center items-center w-full p-2">
                <Image 
                  src="/slogan.png" 
                  alt="Ganesh Chaturthi Greetings" 
                  width={1200} 
                  height={375} 
                  sizes="(max-width: 1024px) 600px, 750px"
                  className="w-[95%] max-w-[350px] md:max-w-[600px] lg:max-w-[750px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 lg:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Desktop Redirect Button */}
     
            <div className="w-full flex justify-center mt-0 md:mt-0">
              <a 
                href="#celebration" 
                className="gradient-button"
                style={{ padding: '16px 40px' }} /* Button का आकार यहाँ से बदलें */
              >
                <span 
                  className="gradient-text"
                  style={{ fontSize: '22px' }} /* Text का आकार यहाँ से बदलें */
                >
                  आमंत्रण देखें
                </span>
              </a>
            </div>

          </div>
        </div>
    

        {/* Right Side / Middle on Mobile: Ganesha Image */}
        <div className="z-10 w-full md:w-1/2 flex justify-center -mt-8 md:-mt-10 lg:-mt-16 relative order-2">
          <div className="relative w-[280px] h-[380px] md:w-[650px] md:h-[800px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500 opacity-20 blur-3xl rounded-full -z-10"></div>
            <Image 
              src="/ganpati-bappa.png" 
              alt="Lord Ganesha" 
              fill
              sizes="(max-width: 768px) 280px, 650px" /* 🚀 एक्स्ट्रा लोड टाइम खत्म करने के लिए यह जोड़ा गया है */
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority={true} /* 🚀 इसे सबसे पहले लोड करने का निर्देश */
            />
          </div> 
        </div>


        {/* Slogan & Button - MOBILE ONLY (Placed below Ganpati) */}
        <div className="flex md:hidden flex-col items-center relative w-full max-w-2xl -mt-6 mb-10 group order-3">
          
          {/* Slogan Image */}
          <div className="relative w-full">
            <div className="absolute inset-10 bg-yellow-400/30 blur-[30px] rounded-full -z-10 group-hover:bg-yellow-400/40 transition-all duration-500"></div>
            <div className="flex justify-center items-center w-full p-2">
              <Image 
                src="/slogan.png" 
                alt="Ganesh Chaturthi Greetings" 
                width={1200} 
                height={375} 
                sizes="(max-width: 768px) 450px, 100vw"
                className="w-[95%] max-w-[450px] h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>


          <div className="w-full flex justify-center mt-0 z-20 mb-4">
            <a 
              href="#celebration" 
              className="gradient-button"
              style={{ padding: '12px 24px' }} /* Mobile Button का आकार यहाँ से बदलें */
            >
              <span 
                className="gradient-text"
                style={{ fontSize: '18px' }} /* Mobile Text का आकार यहाँ से बदलें */
              >
                आमंत्रण देखें
              </span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;