// // import React from "react";

// // const App = () => {
// //   return (
// //     <div className="bg-[#FFF9F0] w-full min-h-screen font-sans overflow-x-hidden">
      
// //       {/* --- HERO SECTION --- */}
// //       {/* Added pt-24 to account for a fixed navbar at the top */}
// //       <section 
// //         id="home" 
// //         className="relative w-full bg-[#2A1B54] pt-32 pb-20 px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between"
// //       >
// //         {/* Left Side: Typography and Buttons */}
// //         <div className="z-10 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          
// //           <div className="flex items-center gap-4 mb-2">
// //             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
// //             <p className="text-yellow-400 text-xl font-bold tracking-[0.2em] uppercase">
// //               Happy
// //             </p>
// //             <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
// //           </div>

// //           <h1 className="text-white text-7xl md:text-8xl font-black drop-shadow-xl tracking-wide mb-2">
// //             GANESH
// //           </h1>
          
// //           <h2 className="text-yellow-400 text-4xl md:text-5xl font-bold mb-8">
// //             CHATURTHI
// //           </h2>
          
// //           {/* Date Ribbon */}
// //           <div className="bg-[#F5B53F] text-[#2A1B54] px-10 py-3 font-black text-2xl mb-12 transform -skew-x-12 shadow-lg">
// //             31ST AUG
// //           </div>

// //           {/* Lower Hero / Description Area (Matching the white curved area in design) */}
// //           <div className="bg-[#FFF9F0] w-[120%] -ml-10 p-8 rounded-tr-[4rem] relative">
// //             <div className="flex gap-6 items-center mb-6">
// //               <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-md">
// //                 Sign in
// //               </button>
// //               <button className="text-[#2A1B54] hover:text-pink-500 font-bold transition-colors">
// //                 Read more
// //               </button>
// //             </div>
            
// //             <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
// //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Right Side: Ganesha Illustration Placeholder */}
// //         <div className="z-10 md:w-1/2 flex justify-center mt-16 md:mt-0 relative">
// //           {/* Fluid Floating Animation Effect */}
// //           <div className="w-80 h-80 md:w-[500px] md:h-[500px] relative animate-[bounce_4s_infinite]">
// //             {/* Replace this div with an actual <img /> or Next.js <Image /> tag later */}
// //             <div className="w-full h-full bg-gradient-to-tr from-yellow-300 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-[#2A1B54] font-bold text-2xl text-center p-8 border-8 border-white border-opacity-20">
// //               Put Your Ganesha Image Here
// //             </div>
            
// //             {/* Decorative background circle effect */}
// //             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white opacity-5 rounded-full scale-125 -z-10"></div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* --- SCROLLABLE ONE-PAGE SECTIONS --- */}
// //       {/* scroll-mt-24 ensures the header doesn't cover the title when clicking navbar links */}
      
// //       <section id="about" className="min-h-screen flex items-center justify-center bg-white px-8 scroll-mt-24">
// //         <div className="text-center">
// //           <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">About the Festival</h2>
// //           <p className="text-gray-500">Your about content goes here.</p>
// //         </div>
// //       </section>

// //       <section id="celebration" className="min-h-screen flex items-center justify-center bg-[#FFF9F0] px-8 scroll-mt-24">
// //         <div className="text-center">
// //           <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">Celebration Details</h2>
// //           <p className="text-gray-500">Your celebration content goes here.</p>
// //         </div>
// //       </section>

// //       <section id="gallery" className="min-h-screen flex items-center justify-center bg-white px-8 scroll-mt-24">
// //         <div className="text-center">
// //           <h2 className="text-5xl font-bold text-[#2A1B54] mb-4">Photo Gallery</h2>
// //           <p className="text-gray-500">Your gallery content goes here.</p>
// //         </div>
// //       </section>

// //       <section id="contact" className="min-h-[70vh] flex items-center justify-center bg-[#2A1B54] px-8 scroll-mt-24">
// //         <div className="text-center text-white">
// //           <h2 className="text-5xl font-bold text-yellow-400 mb-4">Contact Us</h2>
// //           <p className="text-gray-300">Your contact form goes here.</p>
// //         </div>
// //       </section>

// //     </div>
// //   );
// // };

// // export default App;















import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InvitationCard from "@/components/Celebration";
import Celebration from "@/components/Celebration";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

const App = () => {
  return (
    <div className="bg-[#FFF9F0] w-full min-h-screen font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION (Imported from components) --- */}
      <Hero />


      {/* 🚀 NEON RUNNING DIVIDER (Hero और About के बीच) */}
      <div className="w-full h-2 flex items-center justify-center relative overflow-hidden  mt-0 mb-0 z-20"
       style={{ background: "radial-gradient(ellipse at bottom, #0f141b 0%, #050505 100%)" }} >
      
        {/* बेस की पतली डार्क लाइन */}
        <div className="absolute w-full h-[4px] z-0"  style={{ background: "radial-gradient(ellipse at bottom, #090c10 0%, #050505 100%)" }} ></div>

        {/* 🚀 CSS for Continuous Running Light */}
        <style>{`
          .running-light {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* पर्पल, पिंक और सोने का खूबसूरत ब्लेंड */
            background: linear-gradient(90deg, transparent, #402fb5, #cf30aa, #FFD700, #cf30aa, #402fb5, transparent);
            box-shadow: 0 0 20px #cf30aa, 0 0 10px #402fb5;
            animation: run-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-light"></div>

        {/* बीच का कमल (Lotus) जो दोनों सेक्शंस को आपस में जोड़ता है */}
        {/* <div className="z-10 bg-[#050105] px-4 py-1 rounded-full border border-[#cf30aa]/30 shadow-[0_0_15px_rgba(207,48,170,0.2)]">
          <span className="text-[#FFD700] text-xl drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">🪷</span>
        </div> */}
        
      </div>

      {/* --- About page --- */}
      <About/>


       <div className="w-full h-2 flex items-center justify-center relative overflow-hidden  mt-0 mb-0 z-20"
       style={{ background: "radial-gradient(ellipse at bottom, #0f141b 0%, #050505 100%)" }} >
      
        {/* बेस की पतली डार्क लाइन */}
        <div className="absolute w-full h-[2px] z-0"  style={{ background: "radial-gradient(ellipse at bottom, #090c10 0%, #050505 100%)" }} ></div>

        {/* 🚀 CSS for Continuous Running Light */}
        <style>{`
          .running-light-brown {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* पर्पल, पिंक और सोने का खूबसूरत ब्लेंड */
               background: linear-gradient(90deg, transparent, #5c0000, #04007e, #0b0089, #6d0000, #7b0a0a, transparent);
            box-shadow: 0 0 20px #f30e0e, 0 0 10px #402fb5;
            animation: run-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-light-brown"></div>

        </div>


      {/* Celebration */}
      <Celebration/>


      {/* venue */}
      <Venue/>

         {/* 🚀 ROYAL GOLD RUNNING DIVIDER (About और Celebration के बीच) */}
    <div 
        /* 🚀 FIX: ऊँचाई 'h-16' कर दी गई है ताकि दोनों रंग आपस में स्मूथली मिल सकें */
        className="w-full h-2 flex items-center justify-center relative overflow-hidden mt-0 mb-0 z-20"   
        /* 🚀 FIX: ऊपर के काले (#050505) रंग से नीचे के मरून (#140000) रंग का पर्फेक्ट ग्रेडिएंट ब्लेंड */
        style={{ background: "linear-gradient(to bottom, #050505 0%, #140000 100%)" }}   
      >
        {/* हल्की सी डार्क बेस लाइन (ताकि लाइट का रास्ता दिखे) */}
        <div className="absolute w-full h-[2px] z-0" style={{ background: "linear-gradient(to bottom, #050505 0%, #140000 100%)" }}  ></div>

        {/* 🚀 CSS for Golden Continuous Running Light */}
        <style>{`
          .running-gold-light {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* 🚀 FIX: आमंत्रण कार्ड से मैच करता हुआ मरून (Maroon) और सोने (Gold) का ब्लेंड */
            background: linear-gradient(90deg, transparent, #7B0A14, #F5A623, #FFD700, #F5A623, #7B0A14, transparent);
            box-shadow: 0 0 15px #F5A623, 0 0 8px #7B0A14;
            animation: run-gold-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-gold-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-gold-light"></div>
        
      </div>


      {/* Gallery */}

        <Gallery/>    

           {/* 🚀 ROYAL GOLD RUNNING DIVIDER (About और Celebration के बीच) */}
    <div 
        /* 🚀 FIX: ऊँचाई 'h-16' कर दी गई है ताकि दोनों रंग आपस में स्मूथली मिल सकें */
        className="w-full h-2 flex items-center justify-center relative overflow-hidden mt-0 mb-0 z-20"   
        /* 🚀 FIX: ऊपर के काले (#050505) रंग से नीचे के मरून (#140000) रंग का पर्फेक्ट ग्रेडिएंट ब्लेंड */
        style={{ background: "linear-gradient(to bottom, #050505 0%, #1b0000 100%)" }}   
      >
        {/* हल्की सी डार्क बेस लाइन (ताकि लाइट का रास्ता दिखे) */}
        <div className="absolute w-full h-[2px] z-0" style={{ background: "linear-gradient(to bottom, #050505 0%, #1b0000 100%)" }}  ></div>

        {/* 🚀 CSS for Golden Continuous Running Light */}
        <style>{`
          .running-gold-end {
            position: absolute;
            width: 100%; /* लाइट की लंबाई */
            height: 2px;
            /* 🚀 FIX: आमंत्रण कार्ड से मैच करता हुआ मरून (Maroon) और सोने (Gold) का ब्लेंड */
            background: linear-gradient(90deg, transparent, #7B0A14, #F5A623, #FFD700, #F5A623, #7B0A14, transparent);
            box-shadow: 0 0 15px #F5A623, 0 0 8px #7B0A14;
            animation: run-gold-light 3s linear infinite;
            z-index: 1;
          }
          @keyframes run-gold-light {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
        
        {/* दौड़ने वाली लाइट */}
        <div className="running-gold-end"></div>
        
      </div>  


        {/* FeebackSection */}

        <FeedbackSection/>

       {/* Footer */}

       <Footer/>


    </div>
  );
};

export default App;




// import React from "react";
// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// // import HeroSection from "@/components/HeroSection";
// // import InvitationSection from "./components/InvitationSection";
// // import VenueSection from "./components/VenueSection";
// // import DevotionalSection from "./components/DevotionalSection";
// // import ClosingSection from "./components/ClosingSection";
// // import FeedbackSection from "./components/FeedbackSection";

// // import Hero from "@/components/Hero";
// import About from "@/components/About";
// import InvitationCard from "@/components/Celebration";
// import Celebration from "@/components/Celebration";
// import Venue from "@/components/Venue";
// import Gallery from "@/components/Gallery";
// import FeedbackSection from "@/components/FeedbackSection";

// export const metadata: Metadata = {
//   title: "Ganpati Bappa Morya | You Are Invited",
//   description: "Join us in celebrating Ganesh Chaturthi with your blessings and presence.",
// };

// export default function GanpatiPage() {
//   return (
//     <>
//       <style>{`
//         /* ── Fonts ── */
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

//         /* ── Base ── */
//         html { scroll-behavior: smooth; }

//         body {
//           background: #080106;
//           margin: 0;
//           padding: 0;
//         }

//         /* ── Scrollbar ── */
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #080106; }
//         ::-webkit-scrollbar-thumb {
//           background: rgba(245,166,35,0.35);
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(245,166,35,0.65);
//         }

//         /* ── Shared keyframes ── */
//         @keyframes floatParticle {
//           0%,100% { transform: translateY(0) translateX(0);   opacity: 0.3; }
//           25%      { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
//           50%      { transform: translateY(-55px) translateX(-10px);opacity: 0.15;}
//           75%      { transform: translateY(-25px) translateX(20px); opacity: 0.5; }
//         }

//         @keyframes fadeInUp {
//           from { opacity:0; transform:translateY(32px); }
//           to   { opacity:1; transform:translateY(0);    }
//         }
//         .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }

//         @keyframes pulseGlow {
//           0%,100% { box-shadow: 0 0 20px rgba(245,166,35,0.2); }
//           50%      { box-shadow: 0 0 50px rgba(245,166,35,0.5),
//                                  0 0 100px rgba(245,166,35,0.2); }
//         }

//         /* ── Section ambient blooms ── */
//         /* Each section is transparent — blooms give identity without bg breaks */
//         .bloom-hero       { --bloom: rgba(120,10,30,0.12);  }
//         .bloom-invitation { --bloom: rgba(80,5,15,0.14);    }
//         .bloom-venue      { --bloom: rgba(60,5,30,0.1);     }
//         .bloom-devotional { --bloom: rgba(100,40,5,0.1);    }
//         .bloom-feedback   { --bloom: rgba(70,5,20,0.12);    }

//         .section-bloom::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(
//             ellipse 80% 60% at 50% 40%,
//             var(--bloom) 0%,
//             transparent 70%
//           );
//           pointer-events: none;
//           z-index: 0;
//         }

//         /* ── Section divider ── */
//         .section-divider {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 16px;
//           padding: 4px 0;
//           position: relative;
//           z-index: 2;
//         }
//         .section-divider::before,
//         .section-divider::after {
//           content: "";
//           flex: 1;
//           max-width: 180px;
//           height: 1px;
//           background: linear-gradient(
//             to var(--dir, right),
//             transparent,
//             rgba(245,166,35,0.25)
//           );
//         }
//         .section-divider::after { --dir: left; }
//       `}</style>

//       {/* ══════════════════════════════════════════
//           UNIFIED BACKGROUND — runs full page height
//           All sections are transparent on top of this
//       ══════════════════════════════════════════ */}
//       <div
//         style={{
//           /* Single continuous gradient top → bottom */
//           background: `
//             linear-gradient(
//               180deg,
//               #0D0208 0%,
//               #0A0102 15%,
//               #0B0108 30%,
//               #080106 45%,
//               #09010A 60%,
//               #0A0102 75%,
//               #08010D 90%,
//               #080106 100%
//             )
//           `,
//           minHeight: "100vh",
//           position: "relative",
//         }}
//       >

//         {/* ── FIXED STAR FIELD — sits behind everything ── */}
//         <div
//           aria-hidden="true"
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 0,
//             pointerEvents: "none",
//             overflow: "hidden",
//           }}
//         >
//           {/* Dot grid */}
//           <div style={{
//             position: "absolute", inset: 0,
//             backgroundImage:
//               "radial-gradient(circle, rgba(245,166,35,0.055) 1px, transparent 1px)",
//             backgroundSize: "52px 52px",
//           }} />

//           {/* Static stars — pseudo-random positions via box-shadow */}
//           <div style={{
//             position: "absolute",
//             width: "2px", height: "2px",
//             borderRadius: "50%",
//             background: "transparent",
//             top: 0, left: 0,
//             boxShadow: `
//               120px  80px 0 rgba(255,220,150,0.55),
//               340px 160px 0 rgba(255,220,150,0.40),
//               560px  60px 0 rgba(255,220,150,0.60),
//               780px 200px 0 rgba(255,220,150,0.35),
//               980px  90px 0 rgba(255,220,150,0.50),
//              1200px 140px 0 rgba(255,220,150,0.45),
//               200px 320px 0 rgba(255,220,150,0.30),
//               450px 280px 0 rgba(255,220,150,0.55),
//               650px 350px 0 rgba(255,220,150,0.40),
//               850px 300px 0 rgba(255,220,150,0.50),
//              1100px 380px 0 rgba(255,220,150,0.35),
//                80px 480px 0 rgba(255,220,150,0.45),
//               300px 520px 0 rgba(255,220,150,0.60),
//               520px 460px 0 rgba(255,220,150,0.35),
//               720px 550px 0 rgba(255,220,150,0.50),
//               920px 500px 0 rgba(255,220,150,0.40),
//              1150px 560px 0 rgba(255,220,150,0.55),
//               160px 680px 0 rgba(255,220,150,0.35),
//               380px 720px 0 rgba(255,220,150,0.50),
//               600px 660px 0 rgba(255,220,150,0.45),
//               800px 740px 0 rgba(255,220,150,0.30),
//              1050px 700px 0 rgba(255,220,150,0.55),
//               240px 860px 0 rgba(255,220,150,0.40),
//               460px 900px 0 rgba(255,220,150,0.60),
//               680px 840px 0 rgba(255,220,150,0.35),
//               880px 920px 0 rgba(255,220,150,0.50),
//              1120px 880px 0 rgba(255,220,150,0.45),
//                40px 1020px 0 rgba(255,220,150,0.55),
//               260px 1060px 0 rgba(255,220,150,0.35),
//               500px 1000px 0 rgba(255,220,150,0.50),
//               740px 1080px 0 rgba(255,220,150,0.40),
//               960px 1040px 0 rgba(255,220,150,0.60),
//              1180px 1100px 0 rgba(255,220,150,0.35)
//             `,
//           }} />

//           {/* Global aurora glow — very subtle */}
//           <div style={{
//             position: "absolute",
//             top: "20%", left: "50%",
//             transform: "translateX(-50%)",
//             width: "900px", height: "500px",
//             background:
//               "radial-gradient(ellipse, rgba(192,57,43,0.06) 0%, transparent 70%)",
//             filter: "blur(60px)",
//           }} />
//           <div style={{
//             position: "absolute",
//             bottom: "10%", right: "-50px",
//             width: "600px", height: "400px",
//             background:
//               "radial-gradient(ellipse, rgba(245,166,35,0.05) 0%, transparent 70%)",
//             filter: "blur(80px)",
//           }} />
//         </div>

//         {/* ── ALL CONTENT — sits above fixed bg ── */}
//         <div style={{ position: "relative", zIndex: 1 }}>
//           <Navbar />

//           {/* Hero */}
//           <div className="section-bloom bloom-hero" style={{ position: "relative" }}>
//             <Hero />
//           </div>

//           {/* Divider */}
//           <div className="section-divider" style={{ zIndex: 2 }}>
//             <span style={{ color: "rgba(245,166,35,0.4)", fontSize: "12px" }}>✦</span>
//           </div>

//           {/* Invitation */}
//           <div className="section-bloom bloom-invitation" style={{ position: "relative" }}>
//             <InvitationCard />
//           </div>

//           {/* Divider */}
//           <div className="section-divider">
//             <span style={{ color: "rgba(245,166,35,0.4)", fontSize: "12px" }}>🪷</span>
//           </div>

//           {/* Venue */}
//           <div className="section-bloom bloom-venue" style={{ position: "relative" }}>
//             <Venue  />
//           </div>

//           {/* Divider */}
//           <div className="section-divider">
//             <span style={{ color: "rgba(245,166,35,0.4)", fontSize: "12px" }}>✦</span>
//           </div>

//           {/* Devotional / Gallery */}
//           <div className="section-bloom bloom-devotional" style={{ position: "relative" }}>
//             <Gallery/>
//           </div>

//           {/* Divider */}
//           <div className="section-divider">
//             <span style={{ color: "rgba(245,166,35,0.4)", fontSize: "12px" }}>🙏</span>
//           </div>

//           {/* Feedback */}
//           <div className="section-bloom bloom-feedback" style={{ position: "relative" }}>
//             <FeedbackSection />
//           </div>

//           {/* Divider */}
//           <div className="section-divider">
//             <span style={{ color: "rgba(245,166,35,0.4)", fontSize: "12px" }}>✦</span>
//           </div>

//           {/* Closing */}
//           {/* <ClosingSection /> */}
//         </div>
//       </div>
//     </>
//   );
// }