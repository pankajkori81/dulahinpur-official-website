// import React from "react";
// import Image from "next/image";

// const Hero = () => {
//   return (

//     <div>

//         <div className="mt-4 md:mt-20 flex flex-col items-center w-full">
//           <p className="text-yellow-400 text-xl md:text-2xl font-bold mb-6 font-[family-name:var(--font-mukta)] leading-relaxed text-center drop-shadow-md">
//             ॥ वक्रतुंड महाकाय सूर्यकोटी समप्रभ <br />
//             निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥
//           </p>
//           </div>
    
    
//     <section 
//       id="home" 
//       className="relative w-full bg-[#2A1B54] pt-32 pb-20 px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between min-h-screen"
//     >


//       {/* Left Side: Typography */}
//       <div className="z-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative h-full justify-center">
        
//         {/* Sthapana Text (Top Left) */}
//         <div className="md:absolute top-0 left-0 bg-[#F5B53F] text-[#2A1B54] px-6 py-2 font-bold text-xl shadow-lg rounded-br-2xl rounded-tl-2xl mb-8 md:mb-0 font-[family-name:var(--font-mukta)]">
//           स्थापना :- २०१९
//         </div>

//         {/* Center Mantra & Title */}
//         <div className="mt-4 md:mt-20 flex flex-col items-center w-full">
        
          
//           <h1 className="text-white text-5xl md:text-7xl font-bold drop-shadow-xl tracking-wide mb-8 font-[family-name:var(--font-yatra)] leading-tight text-center md:text-left">
//             दुलहिनपुर गणेश उत्सव <br className="hidden md:block"/> पूजा समिति ।
//           </h1>
          
//           {/* Lower Action Area */}
//           <div className="bg-[#FFF9F0] w-full max-w-lg p-6 rounded-tr-[3rem] rounded-bl-[3rem] shadow-2xl mt-4">
//             <h3 className="text-[#2A1B54] text-2xl font-bold mb-2 font-[family-name:var(--font-mukta)]">
//               सभी गणेश भक्तो को गणेश चतुर्थी की <br/> हार्दिक शुभकामनाएं।
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* Right Side: Ganesha Image */}
//       <div className="z-10 md:w-1/2 flex justify-center mt-16 md:mt-0 relative">
//         <div className="relative w-[300px] h-[400px] md:w-[500px] md:h-[650px] ">
//           {/* Decorative background glow behind Ganesha */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500 opacity-20 blur-3xl rounded-full -z-10"></div>
          
//           <Image 
//             src="/ganpati.png" 
//             alt="Lord Ganesha" 
//             fill
//             className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//             priority
//           />
//         </div>
//       </div>
//     </section>

//     </div>
//   );
// };

// export default Hero;
















// import React from "react";
// import Image from "next/image";

// const Hero = () => {
//   return (
//    <section 
//       id="home" 
//       className="relative w-full bg-[#2A1B54] pt-12 pb-20 px-8 lg:px-24 flex flex-col min-h-screen"
//     >
//       {/* 1. Add the local style block here so it lives with the component */}
//      {/* 1. Updated Local Style Block for Constrained Marquee */}
//       <style>{`
//         .marquee-container {
//           max-width: 800px; /* Adjust this value if you want the box wider or narrower */
//           margin: 0 auto;
//           overflow: hidden;
//           white-space: nowrap;
//         }
        
//         .marquee-content {
//           display: inline-block;
//           padding-left: 100%; /* Forces text to start exactly at the right edge of the container */
//           animation: marquee-scroll 18s linear infinite;
//           will-change: transform;
//         }
        
//         @keyframes marquee-scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//       `}</style>

//       {/* Sthapana Text (Top Left) */}
//       <div className="md:absolute top-8 left-8 bg-[#F5B53F] text-[#2A1B54] px-6 py-2 font-bold text-xl shadow-lg rounded-br-2xl rounded-tl-2xl mb-8 md:mb-0 font-[family-name:var(--font-mukta)]">
//         स्थापना :- २०१९
//       </div>

//       {/* 2. Top Center: Mantra (Now constrained to the specific width) */}
//       <div className="w-full mb-12 md:mb-16">
//         <div className="marquee-container">
//           <p className="marquee-content text-yellow-400 text-2xl md:text-3xl font-bold font-[family-name:var(--font-mukta)] drop-shadow-lg">
//             ॥ वक्रतुंड महाकाय सूर्यकोटी समप्रभ निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥
//           </p>
//         </div>
//       </div>

//       {/* Main Content: Split Layout (Text Left, Image Right) */}
//       <div className="flex -top-5 flex-col md:flex-row items-center justify-between w-full flex-grow relative">

// {/* Title & Greeting Card */}
// <div className="z-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left w-full relative">

//   {/* Decorative glow behind heading */}
//   <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-500 opacity-20 blur-[100px] rounded-full -z-10"></div>

//   <h1 className="tracking-wide mb-6   font-[family-name:var(--font-yatra)] w-full">

//     {/* Highlighted 'Dulahinpur' with Gradient - same size as line below */}
//    <span className="inline-block bg-[#F5B53F] text-[#2A1B54] px-8 py-2 rounded-br-3xl rounded-tl-3xl shadow-lg font-extrabold text-6xl md:text-8xl leading-[1.3] mb-4">
//       दुलहिनपुर
//     </span>

//     {/* Accent divider */}
//     <span className="block h-1 w-24  rounded-full my-2 mx-auto md:mx-0"></span>

//     {/* Remaining Text - matched size */}
//     <span className="block text-white ml-0 font-bold text-5xl md:text-[65px] leading-[1.3] drop-shadow-xl">
//       गणेश उत्सव पूजा समिति ।
//     </span>
//   </h1>

//   {/* Glassmorphic Greeting Card */}
//   <div className="relative w-full max-w-lg mt-6 group">
//     <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-tr-[3rem] rounded-bl-[3rem] -z-10 group-hover:bg-yellow-400/40 transition-all duration-500"></div>

//     <div
//       className="
//         bg-white/10 backdrop-blur-xl
//         border border-white/20
//         w-full p-7
//         rounded-tr-[3rem] rounded-bl-[3rem]
//         shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
//         transition-transform duration-300 hover:-translate-y-1
//       "
//     >
//       <h3 className="text-[#FFF9F0] text-xl md:text-2xl font-bold leading-relaxed font-[family-name:var(--font-mukta)] drop-shadow-md">
//         सभी गणेश भक्तो को गणेश चतुर्थी की
//         <br />
//         हार्दिक शुभकामनाएं।
//       </h3>
//     </div>
//   </div>

// </div>
          
//         {/* Right Side: Ganesha Image */}
//         <div className="z-10 md:w-1/2 flex justify-center mt-16 md:mt-0 relative">
//           <div className="relative w-[300px] h-[400px] md:w-[500px] md:h-[650px]">
//             {/* Decorative background glow behind Ganesha */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500 opacity-20 blur-3xl rounded-full -z-10"></div>
            
//             <Image 
//               src="/ganpati.png" 
//               alt="Lord Ganesha" 
//               fill
//               className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//               priority
//             />
//           </div>
//         </div>
        
//       </div>
//     </section>
//   );
// };

// export default Hero;




// import React from "react";
// import Image from "next/image";
// import { GridScan } from "./GridScan"; // Imported the new 3D background component
// import Lightfall from "./LineFall";

// const Hero = () => {
//   return (
//     <section 
//       id="home" 
//       // Added overflow-hidden to keep the 3D grid contained within the hero section
//       className="relative w-full bg-[#111] pt-12 pb-20 px-8 lg:px-24 flex flex-col min-h-screen overflow-hidden"
//     >
  

//    <div className="absolute inset-0 z-0 opacity-60"> 
//   <Lightfall
//     colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
//     backgroundColor="#0A29FF"
//     speed={0.5}
//     streakCount={2}
//     streakWidth={1}
//     streakLength={1}
//     glow={1}
//     density={0.6}
//     twinkle={1}
//     zoom={3}
//     backgroundGlow={0.5}
//     opacity={1}
//     mouseInteraction
//     mouseStrength={0.5}
//     mouseRadius={1}
//     color1="#A6C8FF"
//     color2="#5227FF"
//     color3="#FF9FFC"
// />
// </div>

//       {/* --------------------------- */}

//       {/* Local Style Block for Constrained Marquee */}
//       <style>{`
//         .marquee-container {
//           max-width: 800px;
//           margin: 0 auto;
//           overflow: hidden;
//           white-space: nowrap;
//         }
        
//         .marquee-content {
//           display: inline-block;
//           padding-left: 100%;
//           animation: marquee-scroll 18s linear infinite;
//           will-change: transform;
//         }
        
//         @keyframes marquee-scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//       `}</style>

//       {/* Sthapana Text (Top Left) - Added relative/z-10 to stay above background */}
//       <div className="relative md:absolute z-10 top-12  right-8 bg-[#F5B53F] text-[#2A1B54] px-6 py-2 font-bold text-xl shadow-lg rounded-br-2xl rounded-tl-2xl mb-8 md:mb-0 font-[family-name:var(--font-mukta)]">
//         स्थापना :- २०१९
//       </div>

//       {/* Top Center: Mantra - Added relative/z-10 to stay above background */}
//       <div className="relative z-10 w-full mt-20 md:mt-24">
//         <div className="marquee-container">
//           <p className="marquee-content text-yellow-400 text-2xl md:text-3xl font-bold font-[family-name:var(--font-mukta)] drop-shadow-lg">
//             ॥ वक्रतुंड महाकाय सूर्यकोटी समप्रभ निर्विघ्नं कुरुमे देव सर्वकार्येषु सर्वदा ॥
//           </p>
//         </div>
//       </div>

//       {/* Main Content: Split Layout - Added z-10 to stay above background */}
//       <div className="relative z-10 flex -top-5 flex-col md:flex-row items-center justify-between w-full flex-grow">

//         {/* Title & Greeting Card */}

//         {/* Title & Greeting Card */}
//         <div className="z-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left w-full relative">

//           {/* Decorative glow behind heading */}
//           <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-500 opacity-20 blur-[100px] rounded-full -z-10"></div>

   
//          {/* --- REPLACED TEXT TITLE WITH IMAGE --- */}
//           <div className="w-full flex justify-center md:justify-start mt-10 md:mt-16 mb-6 md:mb-8 md:-ml-8 lg:-ml-20">
//             <Image 
//               src="/title-image.png" 
//               alt="Dulahinpur Ganesh Utsav" 
//               width={1200}  /* Increased native resolution for HD scaling */
//               height={375} 
//               /* Tailwind handles the responsive sizing here: */
//               /* transform, scale, and origin-left make it beautifully large on desktop */
//               className="w-[90%] max-w-[300px] md:max-w-[550px] lg:max-w-[800px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 md:origin-left lg:scale-110 xl:scale-125"
//               priority 
//             />
//           </div>
     
    
//           {/* Increased max-w-lg to max-w-2xl to give it more room, and removed negative left margins to keep it centered */}
//           <div className="relative w-full max-w-2xl -mt-10 md:-mt-15 mb-6 md:mb-8 ml-10 md:ml-12 flex justify-center md:justify-start mx-auto md:mx-0 group">
            
//             {/* Background Glow */}
//             <div className="absolute inset-20  bg-yellow-400/30 blur-[40px] rounded-full -z-10 group-hover:bg-yellow-400/40 transition-all duration-500"></div>

         
//             <div className="flex justify-center items-center w-full p-2">
//               <Image 
//                 src="/slogan.png" 
//                 alt="Ganesh Chaturthi Greetings" 
//                 width={1200} 
//                 height={375} 
//                 /* Increased sizes here: 350px on mobile, 600px on tablet, 750px on desktop */
//                 className="w-[95%] max-w-[350px] md:max-w-[600px] lg:max-w-[750px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 lg:scale-110"
//                 priority
//               />
//             </div>
//           </div>
        

//         </div>
     
          
//         {/* Right Side: Ganesha Image */}
//     <div className="z-10 md:w-1/2 flex justify-center mt-10 md:-mt-10 lg:-mt-16 relative">
//           <div className="relative w-[300px] h-[400px] md:w-[650px] md:h-[800px]">
            
//             {/* Decorative background glow behind Ganesha */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500 opacity-20 blur-3xl rounded-full -z-10"></div>
            
//             <Image 
//               src="/ganpati-bappa.png" 
//               alt="Lord Ganesha" 
//               fill
//               className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//               priority
//             />
//           </div> 
//         </div>
        
//       </div>
//     </section>
//   );
// };

// export default Hero;











import React from "react";
import Image from "next/image";
import { GridScan } from "./GridScan";
import Lightfall from "./LineFall";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative w-full bg-[#111] pt-12 pb-20 px-4 md:px-8 lg:px-24 flex flex-col min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-60"> 
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A29FF"
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1}
        
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
              className="w-[90%] max-w-[280px] md:max-w-[550px] lg:max-w-[800px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 md:origin-left lg:scale-110 xl:scale-125"
              priority 
            />
          </div>
     
          {/* Slogan - DESKTOP ONLY (Hidden on mobile) */}
          {/* <div className="hidden md:flex relative w-full max-w-2xl -mt-10 md:-mt-15 mb-6 md:mb-8 ml-10 md:ml-12 justify-start group">
            <div className="absolute inset-20 bg-yellow-400/30 blur-[40px] rounded-full -z-10 group-hover:bg-yellow-400/40 transition-all duration-500"></div>
            <div className="flex justify-center items-center w-full p-2">
              <Image 
                src="/slogan.png" 
                alt="Ganesh Chaturthi Greetings" 
                width={1200} 
                height={375} 
                className="w-[95%] max-w-[350px] md:max-w-[600px] lg:max-w-[750px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 lg:scale-110"
                priority
              />
            </div>
          </div> */}

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
                  className="w-[95%] max-w-[350px] md:max-w-[600px] lg:max-w-[750px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-500 lg:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Desktop Redirect Button */}
            {/* <div className="mt-4 md:mt-8 ml-4 md:ml-8 lg:ml-16">
              <a href="#celebration" className="gradient-button">
                <span className="gradient-text">आमंत्रण देखें</span>
              </a>
            </div> */}

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
        {/* <div className="z-10 w-full md:w-1/2 flex justify-center -mt-8 md:-mt-10 lg:-mt-16 relative order-2">
          <div className="relative w-[280px] h-[380px] md:w-[650px] md:h-[800px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-500 opacity-20 blur-3xl rounded-full -z-10"></div>
            <Image 
              src="/ganpati-bappa.png" 
              alt="Lord Ganesha" 
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </div> 
        </div> */}

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

        {/* Slogan - MOBILE ONLY (Hidden on desktop, placed below Ganpati) */}
        {/* <div className="flex md:hidden relative w-full max-w-2xl -mt-6 mb-10 justify-center group order-3">
          <div className="absolute inset-10 bg-yellow-400/30 blur-[30px] rounded-full -z-10 group-hover:bg-yellow-400/40 transition-all duration-500"></div>
          <div className="flex justify-center items-center w-full p-2">
            <Image 
              src="/slogan.png" 
              alt="Ganesh Chaturthi Greetings" 
              width={1200} 
              height={375} 
              className="w-[95%] max-w-[450px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div> */}

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
                className="w-[95%] max-w-[450px] h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Mobile Redirect Button */}
          {/* <div className="mt-0 z-20">
            <a href="#celebration" className="gradient-button">
              <span className="gradient-text">आमंत्रण देखें</span>
            </a>
          </div> */}

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