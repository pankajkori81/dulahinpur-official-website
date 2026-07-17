// "use client";

// import { useState, useEffect } from "react";

// export default function Countdown() {
//   // Target Date: 14 September 2026, 00:00:00
//   const TARGET_DATE = new Date("2026-09-14T00:00:00").getTime();

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     const updateTimer = () => {
//       const now = new Date().getTime();
//       const distance = TARGET_DATE - now;

//       if (distance < 0) {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     };

//     updateTimer(); // Initial call
//     const interval = setInterval(updateTimer, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // To prevent hydration errors, don't render numbers until client is ready
//   if (!isClient) return null;

//   return (
//     <section className="relative w-full py-16 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
//       {/* Background Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-900/20 blur-[100px] rounded-full -z-10"></div>

//       <div className="text-center mb-8 z-10">
//         <h2 className="text-[#FFD700] text-2xl md:text-4xl font-bold font-['Cormorant_Garamond'] tracking-widest drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
//           उत्सव की प्रतीक्षा
//         </h2>
//         <div className="flex items-center justify-center gap-4 mt-2">
//           <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F5A623]"></div>
//           <span className="text-[#F5A623] text-sm">🪷</span>
//           <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F5A623]"></div>
//         </div>
//       </div>

//       {/* The Flip Clock Container */}
//       <div className="flex items-center justify-center gap-4 md:gap-8 z-10">
//         <FlipCard label="दिन" value={timeLeft.days} />
//         <span className="text-[#FFD700] text-3xl md:text-5xl font-bold pb-8 animate-pulse">:</span>
//         <FlipCard label="घंटे" value={timeLeft.hours} />
//         <span className="text-[#FFD700] text-3xl md:text-5xl font-bold pb-8 animate-pulse">:</span>
//         <FlipCard label="मिनट" value={timeLeft.minutes} />
//         <span className="text-[#FFD700] text-3xl md:text-5xl font-bold pb-8 animate-pulse">:</span>
//         <FlipCard label="सेकंड" value={timeLeft.seconds} />
//       </div>

//       {/* Custom CSS for the 3D Flip Effect */}
//       <style>{`
//         .flip-card-inner {
//           position: relative;
//           width: 70px;
//           height: 90px;
//           perspective: 1000px;
//         }
        
//         @media (min-width: 768px) {
//           .flip-card-inner {
//             width: 100px;
//             height: 120px;
//           }
//         }

//         .flip-card-bg {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(180deg, #1a0505 0%, #2a0a0a 100%);
//           border: 1px solid rgba(255, 215, 0, 0.2);
//           border-radius: 12px;
//           box-shadow: 
//             0 10px 20px rgba(0,0,0,0.5),
//             inset 0 2px 0 rgba(255,255,255,0.1);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }

//         /* The dividing line in the middle of the card */
//         .flip-card-bg::after {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 0;
//           width: 100%;
//           height: 2px;
//           background: rgba(0,0,0,0.6);
//           box-shadow: 0 1px 0 rgba(255,255,255,0.05);
//           z-index: 10;
//         }

//         .flip-number {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: 2.5rem;
//           font-weight: bold;
//           color: #FFD700;
//           text-shadow: 0 2px 10px rgba(255, 215, 0, 0.4);
//           z-index: 5;
//         }

//         @media (min-width: 768px) {
//           .flip-number {
//             font-size: 4rem;
//           }
//         }

//         /* Continuous subtle breathing effect to make it feel alive */
//         .flip-breathe {
//           animation: card-breathe 3s ease-in-out infinite alternate;
//         }

//         @keyframes card-breathe {
//           0% { box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.1); }
//           100% { box-shadow: 0 10px 30px rgba(255,215,0,0.15), inset 0 2px 0 rgba(255,255,255,0.1); }
//         }
//       `}</style>
//     </section>
//   );
// }

// // Sub-component for individual time blocks
// function FlipCard({ label, value }: { label: string; value: number }) {
//   // Ensure we always show two digits (e.g., "09" instead of "9")
//   const formattedValue = value.toString().padStart(2, "0");

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flip-card-inner">
//         <div className="flip-card-bg flip-breathe">
//           <span className="flip-number">{formattedValue}</span>
//         </div>
//       </div>
//       <span className="mt-4 text-[#F5A623] text-sm md:text-lg font-['Cormorant_Garamond'] tracking-widest uppercase">
//         {label}
//       </span>
//     </div>
//   );
// }







// "use client";

// import { useState, useEffect } from "react";

// export default function Countdown() {
//   // Target Date: 14 September 2026, 00:00:00
//   const TARGET_DATE = new Date("2026-09-14T00:00:00").getTime();

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);

//     const updateTimer = () => {
//       const now = new Date().getTime();
//       const distance = TARGET_DATE - now;

//       if (distance < 0) {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     };

//     updateTimer(); // Initial call
//     const interval = setInterval(updateTimer, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   if (!isClient) return null;

//   return (
//     /* 🚀 FIX 1: bg-transparent सुनिश्चित करता है कि पीछे कोई सफ़ेद डिब्बा न दिखे और तारों वाले बैकग्राउंड में घुल जाए */
//     <section className="relative w-full py-10 md:py-16 flex flex-col items-center justify-center bg-black overflow-hidden z-20">
      
//       {/* Background Glow (ऑप्शनल, ताकि कार्ड्स और अच्छे दिखें) */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#4a0808]/30 blur-[80px] rounded-full -z-10"></div>

//       <div className="text-center mb-6 md:mb-10 z-10 px-4">
//         <h2 className="text-[#FFD700] text-3xl md:text-5xl font-bold font-['Cormorant_Garamond'] tracking-widest drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
//           उत्सव की प्रतीक्षा
//         </h2>
        
//         {/* 🚀 FIX 2: आगामी गणेश चतुर्थी टेक्स्ट जोड़ा गया */}
//         <p className="text-[#F5A623] text-sm md:text-lg font-medium mt-2 md:mt-3 mb-4 tracking-wide font-['Mukta']">
//           आगामी गणेश चतुर्थी : १४ सितंबर २०२६
//         </p>

//         <div className="flex items-center justify-center gap-4">
//           <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5A623]"></div>
//           <span className="text-[#F5A623] text-sm drop-shadow-[0_0_5px_rgba(245,166,35,0.8)]">🪷</span>
//           <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5A623]"></div>
//         </div>
//       </div>

//       {/* 🚀 FIX 3: Mobile Responsive Layout (gap कम किया गया है और रैपिंग को रोका गया है) */}
//       <div className="flex items-center justify-center gap-1 md:gap-6 z-10 w-full max-w-4xl px-2">
//         <FlipCard label="दिन" value={timeLeft.days} />
//         <span className="text-[#FFD700] text-2xl md:text-5xl font-bold pb-6 md:pb-8 animate-pulse drop-shadow-md">:</span>
//         <FlipCard label="घंटे" value={timeLeft.hours} />
//         <span className="text-[#FFD700] text-2xl md:text-5xl font-bold pb-6 md:pb-8 animate-pulse drop-shadow-md">:</span>
//         <FlipCard label="मिनट" value={timeLeft.minutes} />
//         <span className="text-[#FFD700] text-2xl md:text-5xl font-bold pb-6 md:pb-8 animate-pulse drop-shadow-md">:</span>
//         <FlipCard label="सेकंड" value={timeLeft.seconds} />
//       </div>

//       {/* 🚀 FIX 4: 3D Flip Animation CSS */}
//       <style>{`
//         .flip-card-wrapper {
//           perspective: 1000px;
//         }

//         .flip-card-bg {
//           position: relative;
//           background: linear-gradient(180deg, #150202 0%, #2b0505 100%);
//           border: 1px solid rgba(255, 215, 0, 0.25);
//           border-radius: 8px;
//           box-shadow: 0 8px 25px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.05);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }

//         @media (min-width: 768px) {
//           .flip-card-bg {
//             border-radius: 12px;
//           }
//         }

//         /* Center dividing line for the mechanical clock look */
//         .flip-card-bg::after {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 0;
//           width: 100%;
//           height: 2px;
//           background: rgba(0,0,0,0.8);
//           box-shadow: 0 1px 0 rgba(255,255,255,0.05);
//           z-index: 10;
//         }

//         /* The actual flipping animation when a number changes */
//         .animate-flip {
//           animation: flip-down 0.6s cubic-bezier(0.37, 0.01, 0.94, 0.35) forwards;
//           transform-origin: bottom center;
//         }

//         @keyframes flip-down {
//           0% { transform: rotateX(80deg); opacity: 0; filter: brightness(1.5); }
//           20% { opacity: 1; }
//           100% { transform: rotateX(0deg); opacity: 1; filter: brightness(1); }
//         }
//       `}</style>
//     </section>
//   );
// }

// // Sub-component for individual time blocks
// function FlipCard({ label, value }: { label: string; value: number }) {
//   const formattedValue = value.toString().padStart(2, "0");

//   return (
//     <div className="flex flex-col items-center mx-1 md:mx-0">
//       <div className="flip-card-wrapper">
//         {/* Responsive Width & Height (w-14/h-20 for Mobile, w-24/h-32 for Desktop) */}
//         <div className="flip-card-bg w-[60px] h-[75px] md:w-[100px] md:h-[120px]">
//           {/* React 'key' prop ensures the div re-renders and triggers the CSS animation ONLY when value changes */}
//           <div key={value} className="absolute inset-0 flex items-center justify-center animate-flip z-0">
//             <span className="font-['Cinzel_Decorative'] font-bold text-3xl md:text-5xl text-[#FFD700] drop-shadow-[0_2px_8px_rgba(255,215,0,0.5)]">
//               {formattedValue}
//             </span>
//           </div>
//         </div>
//       </div>
//       <span className="mt-3 md:mt-5 text-[#F5A623] text-[11px] md:text-sm font-['Cormorant_Garamond'] font-bold tracking-widest uppercase">
//         {label}
//       </span>
//     </div>
//   );
// } 
























"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  // Target Date: 14 September 2026, 00:00:00
  const TARGET_DATE = new Date("2026-09-14T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <section className="relative w-full py-10 md:py-16 flex flex-col items-center justify-center -mt-5 md:-mt-8   overflow-hidden z-20">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[#4a0808]/20 blur-[80px] rounded-full -z-10"></div>

      <div className="text-center mb-8 md:mb-12 z-10 px-4">
        <h2 className="text-[#FFD700] text-3xl md:text-5xl font-bold font-['Cormorant_Garamond']  drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
          उत्सव की प्रतीक्षा
        </h2>
        
       
        <p className="text-[#F5A623] text-sm md:text-lg font-medium mt-2 md:mt-3 mb-4 tracking-wide font-['Mukta']">
          आगामी गणेश चतुर्थी : १४ सितंबर २०२६
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5A623]"></div>
          <span className="text-[#F5A623] text-sm drop-shadow-[0_0_5px_rgba(245,166,35,0.8)]">🪷</span>
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5A623]"></div>
        </div>
      </div>

      
      <div className="flex items-center justify-center gap-2 md:gap-6 z-10 w-full max-w-4xl px-2">
        <FlipCard label="दिन" value={timeLeft.days} />
        <span className="text-[#FFD700] text-3xl md:text-5xl font-bold pb-6 md:pb-8 animate-pulse drop-shadow-md">:</span>
        <FlipCard label="घंटे" value={timeLeft.hours} />
        <span className="text-[#FFD700] text-3xl md:text-5xl font-bold pb-6 md:pb-8 animate-pulse drop-shadow-md">:</span>
        <FlipCard label="मिनट" value={timeLeft.minutes} />
        <span className="text-[#FFD700] text-3xl md:text-5xl font-bold pb-6 md:pb-8 animate-pulse drop-shadow-md">:</span>
        <FlipCard label="सेकंड" value={timeLeft.seconds} />
      </div>

      {/* 🚀 REAL MECHANICAL FLIP CLOCK CSS */}
      <style>{`
        /* 1. आधा हिस्सा काटने के लिए (Top / Bottom Clip) */
        .clip-top { clip-path: inset(0 0 50% 0); }
        .clip-bottom { clip-path: inset(50% 0 0 0); }
        
        /* 2. पीछे का हिस्सा छुपाने के लिए */
        .backface-hidden { 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; 
        }

        /* 3. कार्ड का बेस बैकग्राउंड (Solid Dark Maroon) */
        .flip-bg {
          background: #1a0202;
        }

        /* 4. मुख्य कंटेनर जिसमें 3D इफ़ेक्ट होगा */
        .flip-container {
          perspective: 1000px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.8);
        }

        /* 5. घूमने वाला (Flipper) कार्ड */
        .flipper {
          transform-style: preserve-3d;
          transform-origin: center;
          z-index: 10;
        }

        /* 6. सिर्फ़ 0.6s के लिए गिरने वाला एनीमेशन */
        .animating {
          animation: mechanical-flip 0.6s ease-in forwards;
        }

        /* ऊपर से टूट कर नीचे गिरने का मैजिक */
        @keyframes mechanical-flip {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }
      `}</style>
    </section>
  );
}

/* 🚀 Sub-component for individual time blocks (Days, Hours, Min, Sec) */
function FlipCard({ label, value }: { label: string; value: number }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  // जब भी वैल्यू बदलेगी, एनीमेशन ट्रिगर होगा
  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setPrevValue(value);
      }, 600); // 0.6 सेकंड का एनीमेशन
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  // नंबर्स को 2 डिजिट में सेट करना (जैसे 9 को 09)
  const formattedCurrent = value.toString().padStart(2, "0");
  const formattedPrev = prevValue.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flip-container relative w-[65px] h-[80px] md:w-[105px] md:h-[120px] rounded-lg md:rounded-xl border border-[#FFD700]/25 flip-bg">
        
        {/* --- 1. Background TOP (नया नंबर दिखाता है) --- */}
        <div className="absolute inset-0 flex items-center justify-center clip-top">
          <span className="font-['Cinzel_Decorative'] font-bold text-4xl md:text-6xl text-[#FFD700] drop-shadow-md">{formattedCurrent}</span>
        </div>

        {/* --- 2. Background BOTTOM (पुराना नंबर दिखाता है) --- */}
        <div className="absolute inset-0 flex items-center justify-center clip-bottom">
          <span className="font-['Cinzel_Decorative'] font-bold text-4xl md:text-6xl text-[#FFD700] drop-shadow-md">{formattedPrev}</span>
        </div>

        {/* --- 3. FLIPPER (जो ऊपर से नीचे गिरता है) --- */}
        {isAnimating && (
          <div className="flipper absolute inset-0 animating">
            
            {/* Flipper का आगे का हिस्सा (पुराने नंबर का आधा हिस्सा जो गिरेगा) */}
            <div className="absolute inset-0 flex items-center justify-center clip-top backface-hidden flip-bg rounded-lg md:rounded-xl">
              <span className="font-['Cinzel_Decorative'] font-bold text-4xl md:text-6xl text-[#FFD700] drop-shadow-md">{formattedPrev}</span>
            </div>
            
            {/* Flipper का पीछे का हिस्सा (नये नंबर का आधा हिस्सा जो गिरने के बाद दिखेगा) */}
            <div className="absolute inset-0 flex items-center justify-center clip-bottom backface-hidden flip-bg rounded-lg md:rounded-xl" style={{ transform: 'rotateX(180deg)' }}>
              <span className="font-['Cinzel_Decorative'] font-bold text-4xl md:text-6xl text-[#FFD700] drop-shadow-md">{formattedCurrent}</span>
            </div>

          </div>
        )}

        {/* --- 4. Center Line (बीच की मैकेनिकल कटिंग लाइन) --- */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2 shadow-[0_1px_0_rgba(255,215,0,0.15)] z-20"></div>

      </div>
      
      {/* Label (दिन, घंटे...) */}
      <span className="mt-3 md:mt-5 text-[#F5A623] text-[12px] md:text-sm font-['Cormorant_Garamond'] font-bold tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}