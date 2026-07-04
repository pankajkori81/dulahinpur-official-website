// import React from "react";

// const App = () => {
//   return (
//     <div className="bg-[#FFF9F0] w-full min-h-screen font-sans overflow-x-hidden">
      
//       {/* --- HERO SECTION --- */}
//       {/* Added pt-24 to account for a fixed navbar at the top */}
//       <section 
//         id="home" 
//         className="relative w-full bg-[#2A1B54] pt-32 pb-20 px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between"
//       >
//         {/* Left Side: Typography and Buttons */}
//         <div className="z-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          
//           <div className="flex items-center gap-4 mb-2">
//             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
//             <p className="text-yellow-400 text-xl font-bold tracking-[0.2em] uppercase">
//               Happy
//             </p>
//             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
//           </div>

//           <h1 className="text-white text-7xl md:text-8xl font-black drop-shadow-xl tracking-wide mb-2">
//             GANESH
//           </h1>
          
//           <h2 className="text-yellow-400 text-4xl md:text-5xl font-bold mb-8">
//             CHATURTHI
//           </h2>
          
//           {/* Date Ribbon */}
//           <div className="bg-[#F5B53F] text-[#2A1B54] px-10 py-3 font-black text-2xl mb-12 transform -skew-x-12 shadow-lg">
//             31ST AUG
//           </div>

//           {/* Lower Hero / Description Area (Matching the white curved area in design) */}
//           <div className="bg-[#FFF9F0] w-[120%] -ml-10 p-8 rounded-tr-[4rem] relative">
//             <div className="flex gap-6 items-center mb-6">
//               <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-md">
//                 Sign in
//               </button>
//               <button className="text-[#2A1B54] hover:text-pink-500 font-bold transition-colors">
//                 Read more
//               </button>
//             </div>
            
//             <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Ganesha Illustration Placeholder */}
//         <div className="z-10 md:w-1/2 flex justify-center mt-16 md:mt-0 relative">
//           {/* Fluid Floating Animation Effect */}
//           <div className="w-80 h-80 md:w-[500px] md:h-[500px] relative animate-[bounce_4s_infinite]">
//             {/* Replace this div with an actual <img /> or Next.js <Image /> tag later */}
//             <div className="w-full h-full bg-gradient-to-tr from-yellow-300 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-[#2A1B54] font-bold text-2xl text-center p-8 border-8 border-white border-opacity-20">
//               Put Your Ganesha Image Here
//             </div>
            
//             {/* Decorative background circle effect */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white opacity-5 rounded-full scale-125 -z-10"></div>
//           </div>
//         </div>
//       </section>

//       {/* --- SCROLLABLE ONE-PAGE SECTIONS --- */}
//       {/* scroll-mt-24 ensures the header doesn't cover the title when clicking navbar links */}
      
//       <section id="about" className="min-h-screen flex items-center justify-center bg-white px-8 scroll-mt-24">
//         <div className="text-center">
//           <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">About the Festival</h2>
//           <p className="text-gray-500">Your about content goes here.</p>
//         </div>
//       </section>

//       <section id="celebration" className="min-h-screen flex items-center justify-center bg-[#FFF9F0] px-8 scroll-mt-24">
//         <div className="text-center">
//           <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">Celebration Details</h2>
//           <p className="text-gray-500">Your celebration content goes here.</p>
//         </div>
//       </section>

//       <section id="gallery" className="min-h-screen flex items-center justify-center bg-white px-8 scroll-mt-24">
//         <div className="text-center">
//           <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">Photo Gallery</h2>
//           <p className="text-gray-500">Your gallery content goes here.</p>
//         </div>
//       </section>

//       <section id="contact" className="min-h-[70vh] flex items-center justify-center bg-[#2A1B54] px-8 scroll-mt-24">
//         <div className="text-center text-white">
//           <h2 className="text-5xl font-bold text-yellow-400 mb-4">Contact Us</h2>
//           <p className="text-gray-300">Your contact form goes here.</p>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default App;















import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InvitationCard from "@/components/Celebration";
import Celebration from "@/components/Celebration";

const App = () => {
  return (
    <div className="bg-[#FFF9F0] w-full min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION (Imported from components) --- */}
      <Hero />

      {/* --- About page --- */}

      <About/>


      {/* Celebration */}

      <Celebration/>
      
      {/* <section id="about" className="min-h-screen flex items-center justify-center bg-white px-8 scroll-mt-24">
        <div className="text-center font-[family-name:var(--font-mukta)]">
          <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">About the Festival</h2>
          <p className="text-gray-500 text-xl">Your about content goes here.</p>
        </div>
      </section> */}

      {/* <section id="celebration" className="min-h-screen flex items-center justify-center bg-[#FFF9F0] px-8 scroll-mt-24">
        <div className="text-center font-[family-name:var(--font-mukta)]">
          <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">कार्यक्रम रूपरेखा</h2>
          <p className="text-gray-500 text-xl">Schedule and event details will go here.</p>
        </div>
      </section> */}

      <section id="gallery" className="min-h-screen flex items-center justify-center bg-white px-8 scroll-mt-24">
        <div className="text-center font-[family-name:var(--font-mukta)]">
          <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">Photo Gallery</h2>
          <p className="text-gray-500 text-xl">Your gallery content goes here.</p>
        </div>
      </section>

      <section id="contact" className="min-h-[70vh] flex items-center justify-center bg-[#2A1B54] px-8 scroll-mt-24">
        <div className="text-center text-white font-[family-name:var(--font-mukta)]">
          <h2 className="text-5xl font-bold text-yellow-400 mb-4">स्थान एवं संपर्क</h2>
          <p className="text-gray-300 text-xl">दुलहिनपुर, रामगंज बाज़ार, अमेठी ।</p>
        </div>
      </section>

    </div>
  );
};

export default App;