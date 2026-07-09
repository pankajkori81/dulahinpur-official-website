
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image"; // Image optimization for faster loading
import DomeGallery from "./DomeGallery";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const prayers = [
  {
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।",
    transliteration: "Vakratunda Mahakaya Suryakoti Samaprabha",
    meaning: "O Lord Ganesha, with a curved trunk and a mighty body, radiant as a million suns",
  },
  {
    sanskrit: "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा।",
    transliteration: "Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada",
    meaning: "Please bless me O Lord, to grant success in all my endeavours, forever",
  },
];

const SLIDER_IMAGES = [
  { src: "/slide-img1.jpg", alt: "Dulahinpur Utsav" },
  { src: "/slide-img2.jpg", alt: "Chintamani Darsan" },
  { src: "/slide-img3.jpg", alt: "Celebration" },
  { src: "/slide-img4.jpg", alt: "Dulahinpur Utsav" },
  { src: "/slide-img5.jpg", alt: "Ramganj Utsav" },
  { src: "/slide-img6.jpg", alt: "Chintamani Darsan" },
  { src: "/slide-img7.jpg", alt: "Ramganj Utsav" },
  { src: "/slide-img8.jpg", alt: "Ramganj Utsav" },
  { src: "/slide-img9.jpg", alt: "Dulahinpur Utsav" },
  { src: "/slide-img10.jpg", alt:"Dulahinpur Utsav" },
  { src: "/slide-img11.jpg", alt: "Dulahinpur Utsav" },

];

const MARQUEE_IMAGES = [
  { src: "/marque-img1.jpg", alt: "Utsav" },
  { src: "/marque-img2.jpg", alt: "Utsav" },
  { src: "/marque-img3.jpg", alt: "Utsav" },
  { src: "/marque-img4.jpg", alt: "Utsav" },
  { src: "/marque-img5.jpg", alt: "Utsav" },
  { src: "/marque-img6.jpg", alt: "Utsav" },
  { src: "/marque-img7.jpg", alt: "Utsav" },
  { src: "/marque-img8.jpg", alt: "Utsav" },
  { src: "/marque-img9.jpg", alt: "Utsav" },
  { src: "/marque-img10.jpg", alt: "Utsav" },
  { src: "/marque-img11.jpg", alt: "Utsav" },
  { src: "/marque-img12.jpg", alt: "Utsav" },
  { src: "/marque-img13.jpg", alt: "Utsav" },
  { src: "/marque-img14.jpg", alt: "Utsav" },
 
];

/* ═══════════════════════════════════════════
   3D COVERFLOW SLIDER (0% Load, High Performance)
═══════════════════════════════════════════ */
function CoverflowSlider() {
  const [current, setCurrent] = useState(0);
  const length = SLIDER_IMAGES.length;
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 3500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) nextSlide();
    if (touchStartX.current - touchEndX < -50) prevSlide();
  };



  // Helper to calculate 3D position
  const getCardStyle = (index: number) => {
    // Determine shortest distance in circular array
    let diff = (index - current) % length;
    if (diff > Math.floor(length / 2)) diff -= length;
    if (diff < -Math.floor(length / 2)) diff += length;

    // Default styles (Hidden cards)
    let style: React.CSSProperties = {
      // 🚀 FIX: Added translate(X, -50%) to correctly align with top-1/2 left-1/2
      transform: `translate(${diff > 0 ? "50%" : "-150%"}, -50%) scale(0.5) translateZ(-200px)`,
      opacity: 0,
      zIndex: 0,
      filter: "blur(4px) brightness(0.4)",
      pointerEvents: "none",
    };

    // Center Active Card
    if (diff === 0) {
      style = {
        // 🚀 FIX: Perfectly centers the main card
        transform: "translate(-50%, -50%) scale(1) translateZ(0)",
        opacity: 1,
        zIndex: 10,
        filter: "blur(0px) brightness(1)",
        pointerEvents: "auto",
        boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.4)",
      };
    } 
    // Right Card
    else if (diff === 1 || (diff === - (length - 1) && current === length - 1)) {
      style = {
        transform: "translate(0%, -50%) scale(0.8) translateZ(-80px)",
        opacity: 0.7,
        zIndex: 5,
        filter: "blur(1px) brightness(0.6)",
        pointerEvents: "auto",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
      };
    } 
    // Left Card
    else if (diff === -1 || (diff === length - 1 && current === 0)) {
      style = {
        transform: "translate(-100%, -50%) scale(0.8) translateZ(-80px)",
        opacity: 0.7,
        zIndex: 5,
        filter: "blur(1px) brightness(0.6)",
        pointerEvents: "auto",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
      };
    }

    return style;
  };

return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 items-center">
      
      {/* ── 3D Scene Container ── */}
      <div 
        /* 🚀 FIX: h-[320px] मोबाइल की ऊँचाई है। अगर और ऊँचा करना हो तो इसे 350px कर दें */
        className="relative w-full h-[380px] sm:h-[400px] md:h-[450px] overflow-visible"
        style={{ perspective: "1200px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDER_IMAGES.map((img, i) => {
          // Eager load center, right(1), and left(last) cards instantly
          const isVisibleInstantly = i === 0 || i === 1 || i === length - 1;

          return (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              /* 🚀 FIX 1: w-[86%] मोबाइल की चौड़ाई है। (बढ़ाना हो तो 90% करें, कम करना हो तो 80% करें)
                 🚀 FIX 2: aspect-[4/3] मोबाइल पर इसे ऊँचा (Taller) बनाता है। md:aspect-video डेस्कटॉप पर इसे 16:9 रखता है।
              */
              className="absolute top-1/2 left-1/2 w-[78%] sm:w-[75%] md:w-[600px] lg:w-[700px] aspect-[4/5] md:aspect-video rounded-2xl overflow-hidden transition-all duration-700 ease-out"
              style={{
                transformStyle: "preserve-3d",
                border: "1px solid rgba(212,175,55,0.3)",
                ...getCardStyle(i),
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 86vw, (max-width: 1200px) 70vw, 700px"
                className="object-cover"
                priority={isVisibleInstantly}
              />
              
              {/* Active Card Text Overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-3 pt-10 md:p-4 md:pt-12 transition-opacity duration-500"
                style={{ 
                  background: "linear-gradient(to top, rgba(15,3,3,0.9), transparent)",
                  opacity: current === i ? 1 : 0 
                }}
              >
                <h3 className="text-sm md:text-lg" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#ffe6bc",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                 
                }}>
                  {img.alt}
                </h3>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        {/* 🚀 FIX: left-1 / right-1 बटन्स को किनारे से थोड़ी दूरी पर रखता है */}
        <button onClick={prevSlide} className="absolute left-1 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#110505]/80 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#110505] transition-all backdrop-blur-md">
          ‹
        </button>
        <button onClick={nextSlide} className="absolute right-1 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#110505]/80 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#110505] transition-all backdrop-blur-md">
          ›
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {SLIDER_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "linear-gradient(90deg, #F5A623, #FFD700)" : "rgba(212,175,55,0.3)",
              boxShadow: i === current ? "0 0 10px rgba(245,166,35,0.5)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  )
};


/* ═══════════════════════════════════════════
   FIXED MARQUEE (Optimized Loading)
═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   3D CIRCULAR CAROUSEL (360° Motion & Blending)
═══════════════════════════════════════════ */





// function MarqueeGallery() {
//   // 360 डिग्री में गोल घूमने के लिए इमेजेस को डबल करने की ज़रूरत नहीं है।
//   const items = MARQUEE_IMAGES;
//   const totalItems = items.length;

//   return (
//     <div className="w-full flex flex-col gap-16 overflow-hidden py-10">
//       <style>{`
//         :root {
//           /* Desktop Radius */
//           --carousel-radius: 620px; 
//           --carousel-push: -620px;
//         }
//         @media (max-width: 768px) {
//           :root {
//             /* Mobile Radius */
//             --carousel-radius: 400px;
//             --carousel-push: -400px;
//           }
//         }

//         .carousel-scene {
//           perspective: 1200px;
//           width: 100%;
//           display: flex;
//           justify-content: center;
//           /* Blending: किनारों और पीछे की इमेजेस को धुंधला (Fade) करने के लिए */
//           mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
//           -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
//         }

//         .carousel-pusher {
//           transform-style: preserve-3d;
//           /* पूरे गोल घेरे को पीछे धकेलता है ताकि सामने वाली इमेज स्क्रीन पर फिट रहे */
//           transform: translateZ(var(--carousel-push)); 
//         }

//         .carousel-track {
//           position: relative;
//           width: 260px;
//           aspect-ratio: 4 / 3;
//           transform-style: preserve-3d;
//         }

//         @media (max-width: 768px) {
//           .carousel-track {
//             width: 180px;
//           }
//         }

//         /* 360 Degree Rotations */
//         .spin-left { animation: spinLeft 45s linear infinite; }
//         .spin-right { animation: spinRight 45s linear infinite; }
        
//         .carousel-track:hover { animation-play-state: paused; }

//         @keyframes spinLeft {
//           0% { transform: rotateY(0deg); }
//           100% { transform: rotateY(360deg); }
//         }
//         @keyframes spinRight {
//           0% { transform: rotateY(360deg); }
//           100% { transform: rotateY(0deg); }
//         }

//         .carousel-item {
//           position: absolute;
//           top: 0; left: 0;
//           width: 100%; height: 100%;
//           border-radius: 12px;
//           overflow: hidden;
//           border: 1px solid rgba(212,175,55,0.3);
//           box-shadow: 0 10px 30px rgba(0,0,0,0.8);
//           transition: all 0.4s ease;
//         }
        
//         .carousel-item img {
//           filter: brightness(0.7) saturate(0.8);
//           transition: all 0.4s ease;
//         }

//         .carousel-item:hover {
//           border-color: rgba(212,175,55,0.9);
//           box-shadow: 0 0 30px rgba(212,175,55,0.4);
//         }

//         .carousel-item:hover img {
//           filter: brightness(1.1) saturate(1.2);
//         }
//       `}</style>

//       {/* ── ROW 1: बाएँ (Left) घूमता हुआ 360° घेरा ── */}
//       <div className="carousel-scene">
//         <div className="carousel-pusher">
//           <div className="carousel-track spin-left">
//             {items.map((item, i) => {
//               // हर इमेज को सर्कल में उसकी सही डिग्री पर सेट करना
//               const angle = (360 / totalItems) * i;
//               return (
//                 <div
//                   key={`r1-${i}`}
//                   className="carousel-item"
//                   style={{
//                     transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius))`
//                   }}
//                 >
//                   <Image 
//                     src={item.src} 
//                     alt={item.alt} 
//                     fill
//                     sizes="(max-width: 768px) 180px, 260px"
//                     className="object-cover"
//                     priority={i < 4}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ── ROW 2: दाएँ (Right) घूमता हुआ 360° घेरा ── */}
//       <div className="carousel-scene">
//         <div className="carousel-pusher">
//           <div className="carousel-track spin-right">
//             {items.map((item, i) => {
//               const angle = (360 / totalItems) * i;
//               return (
//                 <div
//                   key={`r2-${i}`}
//                   className="carousel-item"
//                   style={{
//                     transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius))`
//                   }}
//                 >
//                   <Image 
//                     src={item.src} 
//                     alt={item.alt} 
//                     fill
//                     sizes="(max-width: 768px) 180px, 260px"
//                     className="object-cover"
//                     priority={i < 4}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }
// function MarqueeGallery() {
//   const row1 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
//   const row2 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES].reverse();

//   return (
//     <div className="w-full flex flex-col gap-5 overflow-hidden">
//       <style>{`
//         @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//         @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        
//         .marquee-track-left { display: flex; width: max-content; animation: marqueeLeft 40s linear infinite; }
//         .marquee-track-right { display: flex; width: max-content; animation: marqueeRight 40s linear infinite; }
//         .marquee-track-left:hover, .marquee-track-right:hover { animation-play-state: paused; }
        
//         .marquee-img-container {
//           position: relative;
//           width: 260px;
//           aspect-ratio: 4 / 3;
//           border-radius: 12px;
//           margin-right: 16px;
//           flex-shrink: 0;
//           overflow: hidden;
//           border: 1px solid rgba(212,175,55,0.2);
//           transition: all 0.3s ease;
//         }
//         .marquee-img-container img {
//           filter: brightness(0.8) saturate(0.8);
//           transition: all 0.3s ease;
//         }
//         .marquee-img-container:hover {
//           border-color: rgba(212,175,55,0.6);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.5);
//           transform: scale(1.03);
//           z-index: 10;
//         }
//         .marquee-img-container:hover img {
//           filter: brightness(1) saturate(1.1);
//         }

//         /* Mobile specific sizing */
//         @media (max-width: 768px) {
//           .marquee-img-container {
//             width: 200px;
//           }
//         }
//       `}</style>

//       {/* Row 1 */}
//       <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
//         <div className="marquee-track-left">
//           {row1.map((item, i) => (
//             <div key={`r1-${i}`} className="marquee-img-container">
//               {/* 🚀 FIX: Next.js Image with priority for first 4 items */}
//               <Image 
//                 src={item.src} 
//                 alt={item.alt} 
//                 fill
//                 sizes="(max-width: 768px) 200px, 260px"
//                 className="object-cover"
//                 priority={i < 4}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Row 2 */}
//       <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%)" }}>
//         <div className="marquee-track-right">
//           {row2.map((item, i) => (
//             <div key={`r2-${i}`} className="marquee-img-container">
//               {/* 🚀 FIX: Next.js Image with priority for first 4 items */}
//               <Image 
//                 src={item.src} 
//                 alt={item.alt} 
//                 fill
//                 sizes="(max-width: 768px) 200px, 260px"
//                 className="object-cover"
//                 priority={i < 4}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

/* ═══════════════════════════════════════════
   MAIN DEVOTIONAL SECTION
═══════════════════════════════════════════ */
export default function DevotionalSection() {
  return (
    <section
      id="gallery"
      className="relative py-24 px-4 flex flex-col items-center gap-16 overflow-hidden bg-black"
      style={{ backgroundColor: "#080202" }} // Website matching background
    >

        {/* Background Gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ background: "radial-gradient(ellipse at bottom, #1f0707 0%, #000000 100%)" }}
      >
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>

      {/* 🚀 PERFORMANCE FIX: Drastically reduced the number of box-shadows. Browser GPU no longer struggles. */}
        <style>{`
        #stars, #stars2, #stars3 {
          position: absolute;
          background: transparent;
          will-change: transform;
        }
        
        /* Small Stars */
        #stars {
          width: 1px; height: 1px;
          box-shadow: 501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff, 1469px 678px #fff, 904px 741px #fff, 1160px 781px #fff, 1841px 1962px #fff, 1630px 1667px #fff, 1788px 676px #fff, 367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff, 1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff, 137px 1114px #fff, 1767px 1403px #fff, 1543px 11px #fff, 1078px 181px #fff, 1189px 1574px #fff, 1697px 1551px #fff, 439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff, 34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff, 169px 1907px #fff, 1219px 1125px #fff, 659px 18px #fff, 1731px 1959px #fff, 332px 1216px #fff, 1913px 788px #fff, 80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff, 473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff, 425px 1321px #fff, 1121px 1797px #fff, 731px 647px #fff, 891px 1584px #fff, 1523px 109px #fff, 1379px 244px #fff, 865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff, 440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff, 62px 729px #fff, 126px 946px #fff, 1256px 896px #fff, 1444px 256px #fff, 661px 1628px #fff, 1078px 1716px #fff, 300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff, 1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff, 665px 1531px #fff, 89px 701px #fff, 1084px 1183px #fff, 1597px 1576px #fff, 1354px 1774px #fff, 554px 1471px #fff, 1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff, 638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff, 24px 1152px #fff, 507px 558px #fff, 1262px 652px #fff, 246px 1048px #fff, 1077px 421px #fff, 1866px 1847px #fff, 1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff, 1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff, 890px 607px #fff, 787px 1235px #fff, 557px 524px #fff, 1582px 1285px #fff, 1725px 1366px #fff, 952px 747px #fff, 251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff, 1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff, 594px 510px #fff, 1345px 1990px #fff, 1919px 1803px #fff, 1117px 966px #fff, 1629px 97px #fff, 1046px 1196px #fff, 810px 1092px #fff, 722px 976px #fff, 406px 18px #fff, 1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff, 564px 239px #fff, 13px 1767px #fff, 1482px 1472px #fff, 1700px 347px #fff, 1362px 244px #fff, 1141px 1708px #fff, 22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff, 1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff, 1061px 478px #fff, 18px 1409px #fff, 729px 1364px #fff, 264px 911px #fff, 677px 1442px #fff, 123px 33px #fff, 1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff, 918px 1536px #fff, 620px 948px #fff, 183px 646px #fff, 695px 687px #fff, 881px 272px #fff, 1521px 1212px #fff, 1423px 1022px #fff, 1545px 1271px #fff, 1393px 348px #fff, 685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff, 736px 999px #fff, 673px 796px #fff, 469px 850px #fff, 1912px 142px #fff, 1278px 664px #fff, 184px 1990px #fff, 1173px 1312px #fff, 782px 1879px #fff, 323px 1035px #fff, 611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff, 1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff, 1806px 1327px #fff, 386px 575px #fff, 1550px 463px #fff, 148px 687px #fff, 651px 1683px #fff, 1588px 1194px #fff, 1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff, 1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff, 1859px 1809px #fff, 1456px 388px #fff, 186px 1627px #fff, 1528px 1145px #fff, 171px 97px #fff, 674px 1072px #fff, 676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff, 1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff, 549px 652px #fff, 1338px 74px #fff, 1749px 364px #fff, 931px 369px #fff, 383px 1428px #fff, 1558px 389px #fff, 927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff, 556px 643px #fff, 401px 275px #fff, 406px 1644px #fff, 1253px 1852px #fff, 1599px 883px #fff, 744px 1721px #fff, 524px 1297px #fff, 1226px 1177px #fff, 1679px 55px #fff, 874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff, 1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff, 1163px 237px #fff, 61px 223px #fff, 592px 456px #fff, 1844px 271px #fff, 1324px 1488px #fff, 1373px 717px #fff, 1822px 709px #fff, 1464px 941px #fff, 1445px 1118px #fff, 991px 1414px #fff, 1964px 1076px #fff, 108px 172px #fff, 641px 1722px #fff, 1539px 427px #fff, 1697px 45px #fff, 1301px 1353px #fff, 1060px 329px #fff, 967px 1396px #fff, 493px 301px #fff, 1228px 1406px #fff, 1211px 1653px #fff, 444px 1822px #fff, 1746px 353px #fff, 1449px 381px #fff, 671px 887px #fff, 650px 138px #fff, 30px 1839px #fff, 1094px 1405px #fff, 273px 796px #fff, 1618px 1964px #fff, 1045px 1849px #fff, 1472px 1155px #fff, 1529px 1312px #fff, 728px 448px #fff, 44px 1908px #fff, 691px 818px #fff, 254px 293px #fff, 1981px 1133px #fff, 1307px 375px #fff, 196px 316px #fff, 1241px 1975px #fff, 1138px 1706px #fff, 1769px 463px #fff, 1768px 1428px #fff, 1730px 590px #fff, 1780px 523px #fff, 1862px 1526px #fff, 1613px 909px #fff, 1266px 1781px #fff, 470px 352px #fff, 699px 1682px #fff, 1002px 614px #fff, 1209px 133px #fff, 1842px 518px #fff, 1422px 1836px #fff, 1720px 1901px #fff, 470px 1788px #fff, 1355px 1387px #fff, 146px 1162px #fff, 933px 80px #fff, 681px 1063px #fff, 313px 1341px #fff, 740px 1498px #fff, 168px 1014px #fff, 345px 1355px #fff, 1498px 1562px #fff, 1626px 1358px #fff, 890px 403px #fff, 663px 562px #fff, 1481px 168px #fff, 22px 719px #fff, 774px 1041px #fff, 1899px 829px #fff, 430px 158px #fff, 430px 361px #fff, 1592px 1334px #fff, 224px 323px #fff, 1639px 1131px #fff, 7px 271px #fff, 1646px 1514px #fff, 1605px 1444px #fff, 1820px 1665px #fff, 1549px 1641px #fff, 1609px 1377px #fff, 486px 1098px #fff, 229px 613px #fff, 542px 1694px #fff, 318px 256px #fff, 1861px 918px #fff, 889px 892px #fff, 442px 1524px #fff, 19px 422px #fff, 1935px 1908px #fff, 828px 109px #fff, 862px 1248px #fff, 1275px 560px #fff, 906px 63px #fff, 337px 1605px #fff, 1691px 918px #fff, 1414px 679px #fff, 1726px 749px #fff, 1540px 1149px #fff, 1337px 1466px #fff, 446px 430px #fff, 676px 1616px #fff, 840px 326px #fff, 976px 977px #fff, 1840px 642px #fff, 1273px 804px #fff, 1071px 928px #fff, 1292px 1675px #fff, 29px 1148px #fff, 1585px 135px #fff, 1007px 563px #fff, 1035px 78px #fff, 1174px 574px #fff, 120px 1304px #fff, 845px 1292px #fff, 861px 540px #fff, 234px 232px #fff, 1940px 1367px #fff, 759px 639px #fff, 1775px 1381px #fff, 906px 372px #fff, 1104px 1165px #fff, 1524px 911px #fff, 1882px 330px #fff, 1389px 700px #fff, 300px 1629px #fff, 220px 1614px #fff, 563px 140px #fff, 1611px 1586px #fff, 793px 1316px #fff, 325px 1070px #fff, 1722px 1462px #fff, 1406px 1120px #fff, 1169px 1768px #fff, 1956px 1053px #fff, 959px 1587px #fff, 585px 1566px #fff, 370px 204px #fff, 1606px 1416px #fff, 443px 1606px #fff, 1499px 1102px #fff, 1943px 105px #fff, 1121px 1594px #fff, 1512px 32px #fff, 871px 1425px #fff, 433px 100px #fff, 294px 1471px #fff, 1688px 1755px #fff, 1666px 591px #fff, 1034px 300px #fff, 734px 1178px #fff, 1342px 313px #fff, 1616px 1590px #fff, 1763px 1472px #fff, 632px 1935px #fff, 1708px 872px #fff, 1871px 915px #fff, 1829px 1020px #fff, 1599px 578px #fff, 42px 585px #fff, 1163px 1382px #fff, 1744px 1272px #fff, 984px 1426px #fff, 1786px 1584px #fff, 1813px 379px #fff, 1867px 1127px #fff, 97px 567px #fff, 626px 988px #fff, 1178px 79px #fff, 1703px 211px #fff, 961px 1785px #fff, 110px 975px #fff, 953px 1941px #fff, 1027px 1790px #fff, 1665px 107px #fff, 11px 964px #fff, 1718px 1147px #fff, 21px 1728px #fff, 1358px 1922px #fff, 872px 65px #fff, 1191px 1635px #fff, 762px 681px #fff, 1519px 1033px #fff, 906px 566px #fff, 1074px 657px #fff, 1093px 415px #fff, 51px 198px #fff, 1075px 1418px #fff, 1547px 1070px #fff, 225px 920px #fff, 850px 1974px #fff, 981px 595px #fff, 1425px 131px #fff, 460px 917px #fff, 56px 495px #fff, 714px 428px #fff, 920px 493px #fff, 470px 1521px #fff, 532px 821px #fff, 1905px 71px #fff, 883px 1501px #fff, 294px 196px #fff, 381px 1999px #fff, 332px 793px #fff, 1246px 408px #fff, 233px 149px #fff, 315px 231px #fff, 1594px 1302px #fff, 696px 1585px #fff, 791px 136px #fff, 479px 199px #fff, 1627px 1413px #fff, 1824px 924px #fff, 1631px 342px #fff, 1251px 1151px #fff, 284px 1781px #fff, 497px 1052px #fff, 204px 1161px #fff, 646px 1499px #fff, 1762px 558px #fff, 854px 1833px #fff, 883px 945px #fff, 44px 982px #fff, 1101px 834px #fff, 515px 1748px #fff, 1578px 1435px #fff, 819px 1258px #fff, 776px 670px #fff, 115px 385px #fff, 1478px 434px #fff, 885px 20px #fff, 192px 1513px #fff, 78px 1129px #fff, 1774px 1105px #fff, 955px 1149px #fff, 1817px 1929px #fff, 1106px 1832px #fff, 1107px 1997px #fff, 94px 23px #fff, 243px 982px #fff, 43px 1972px #fff, 1798px 673px #fff, 1131px 1589px #fff, 841px 14px #fff, 826px 345px #fff, 687px 56px #fff, 1084px 32px #fff, 1887px 1878px #fff, 153px 526px #fff, 1828px 253px #fff, 1947px 1105px #fff, 886px 700px #fff, 1307px 1723px #fff, 1274px 651px #fff, 1530px 837px #fff, 1699px 1637px #fff, 1703px 1331px #fff, 1929px 1557px #fff, 1763px 737px #fff, 1118px 1680px #fff, 1545px 692px #fff, 1462px 1092px #fff, 208px 1667px #fff, 1393px 859px #fff, 186px 1794px #fff, 351px 1199px #fff, 642px 1995px #fff, 1061px 1726px #fff, 1708px 115px #fff, 1233px 1305px #fff, 637px 1786px #fff, 1730px 603px #fff, 75px 1240px #fff, 1704px 1326px #fff, 584px 346px #fff, 438px 1554px #fff, 561px 513px #fff, 1382px 225px #fff, 467px 1674px #fff, 1403px 815px #fff, 1546px 1835px #fff, 127px 1119px #fff, 276px 591px #fff, 688px 1458px #fff, 765px 646px #fff, 474px 984px #fff, 171px 361px #fff, 94px 1480px #fff, 1962px 1666px #fff, 909px 1037px #fff, 1725px 222px #fff, 253px 1355px #fff, 1892px 1901px #fff, 275px 1847px #fff, 28px 1184px #fff, 1725px 1382px #fff, 882px 647px #fff, 1935px 1046px #fff, 10px 344px #fff, 292px 1328px #fff, 127px 1352px #fff, 752px 929px #fff, 1589px 384px #fff, 284px 1829px #fff, 381px 820px #fff, 1229px 1125px #fff, 777px 429px #fff, 1811px 1499px #fff, 1573px 287px #fff, 295px 756px #fff, 389px 616px #fff, 781px 41px #fff, 1092px 333px #fff, 794px 1588px #fff, 386px 1847px #fff, 1802px 710px #fff, 662px 60px #fff, 640px 264px #fff, 463px 746px #fff, 1859px 799px #fff, 763px 37px #fff, 639px 396px #fff, 357px 1071px #fff, 1190px 1430px #fff, 1814px 257px #fff, 1382px 235px #fff, 606px 1304px #fff, 1939px 1470px #fff, 1124px 349px #fff, 307px 1567px #fff, 310px 1323px #fff, 1145px 922px #fff, 1196px 1922px #fff, 1647px 544px #fff, 788px 1337px #fff, 257px 632px #fff, 1413px 414px #fff, 590px 620px #fff, 582px 794px #fff, 1702px 1481px #fff, 1055px 53px #fff, 157px 346px #fff, 50px 1901px #fff, 1038px 1369px #fff, 796px 1941px #fff, 215px 194px #fff, 1567px 1538px #fff, 367px 800px #fff, 1044px 489px #fff, 1109px 1712px #fff, 524px 327px #fff, 525px 1252px #fff, 1475px 1240px #fff, 529px 436px #fff, 795px 834px #fff, 122px 1371px #fff, 79px 482px #fff, 520px 1249px #fff, 336px 1878px #fff, 188px 944px #fff, 325px 1259px #fff, 1491px 1942px #fff, 620px 1054px #fff, 1606px 1153px #fff, 1448px 502px #fff, 53px 1381px #fff, 107px 1670px #fff, 1380px 618px #fff, 967px 1557px #fff, 1116px 1722px #fff, 1174px 1044px #fff, 1805px 717px #fff, 663px 394px #fff, 1848px 1007px #fff, 389px 802px #fff, 49px 392px #fff, 1650px 852px #fff, 1678px 1012px #fff, 335px 1009px #fff, 1818px 1631px #fff, 1568px 742px #fff, 1162px 1991px #fff, 52px 1190px #fff, 1401px 928px #fff, 119px 1549px #fff, 537px 1529px #fff, 2px 1709px #fff, 122px 387px #fff, 543px 2px #fff, 27px 1971px #fff, 507px 1377px #fff, 1362px 1080px #fff, 1031px 1544px #fff, 1631px 1174px #fff, 1603px 312px #fff, 1626px 1422px #fff, 1430px 615px #fff, 1958px 1431px #fff, 1946px 1412px #fff, 1848px 247px #fff, 984px 1808px #fff, 1396px 225px #fff, 319px 717px #fff, 1252px 875px #fff, 1619px 156px #fff, 951px 1971px #fff, 386px 355px #fff, 1406px 1151px #fff, 273px 1538px #fff, 844px 1570px #fff, 947px 151px #fff, 1363px 525px #fff, 209px 307px #fff, 1923px 1718px #fff, 993px 1741px #fff, 1513px 353px #fff, 1353px 61px #fff, 664px 352px #fff, 1382px 359px #fff, 1487px 1707px #fff, 657px 1045px #fff, 1107px 490px #fff, 1834px 1176px #fff, 837px 1438px #fff, 1947px 448px #fff, 1196px 333px #fff, 151px 555px #fff, 18px 992px #fff, 458px 748px #fff, 1801px 890px #fff, 1093px 1012px #fff, 315px 1101px #fff, 194px 323px #fff, 754px 292px #fff, 1737px 7px #fff, 40px 840px #fff, 1170px 805px #fff, 176px 1753px #fff, 805px 1148px #fff, 1578px 1271px #fff, 367px 1494px #fff, 363px 1111px #fff, 1955px 243px #fff, 1451px 1093px #fff, 375px 617px #fff, 1223px 720px #fff, 1178px 13px #fff, 1456px 865px #fff, 1440px 49px #fff, 186px 1569px #fff, 320px 1853px #fff, 300px 539px #fff, 1559px 509px #fff, 1985px 1108px #fff, 1588px 828px #fff, 525px 1432px #fff, 831px 363px #fff, 141px 281px #fff, 1319px 402px #fff, 40px 456px #fff, 1955px 478px #fff, 1758px 818px #fff, 1924px 688px #fff, 1030px 953px #fff, 1982px 210px #fff, 917px 1401px #fff, 1051px 1837px #fff, 1045px 463px #fff, 1744px 573px #fff, 529px 1530px #fff, 542px 469px #fff, 1982px 324px #fff, 1902px 1422px #fff, 1968px 782px #fff, 1666px 1561px #fff, 955px 304px #fff, 323px 778px #fff, 272px 443px #fff, 485px 581px #fff, 1353px 1058px #fff, 1257px 131px #fff, 434px 98px #fff, 1587px 1953px #fff, 1749px 68px #fff, 1984px 839px #fff, 1518px 183px #fff, 1071px 855px #fff, 1662px 1994px #fff, 1111px 106px #fff, 1954px 838px #fff;
          animation: animStar 50s linear infinite;
        }
        #stars:after {
          content: " "; position: absolute; top: 2000px;
          width: 1px; height: 1px;
          background: transparent;
          box-shadow: inherit; /* Copies the parent's box shadow for seamless loop */
        }
        
        /* Medium Stars */
        #stars2 {
          width: 2px; height: 2px;
          box-shadow: 1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff, 1171px 563px #fff, 661px 1919px #fff, 1610px 44px #fff, 1275px 140px #fff, 1208px 1802px #fff, 1473px 1587px #fff, 11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff, 1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff, 417px 1188px #fff, 286px 561px #fff, 393px 1765px #fff, 147px 881px #fff, 666px 1097px #fff, 1425px 1278px #fff, 806px 156px #fff, 1252px 561px #fff, 218px 52px #fff, 1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff, 137px 244px #fff, 939px 1922px #fff, 137px 1080px #fff, 1757px 50px #fff, 904px 536px #fff, 1938px 1001px #fff, 1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff, 804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff, 1216px 511px #fff, 1061px 1523px #fff, 97px 274px #fff, 704px 1318px #fff, 52px 1872px #fff, 1962px 296px #fff, 111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff, 820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff, 1286px 522px #fff, 955px 659px #fff, 428px 1805px #fff, 237px 557px #fff, 1689px 1058px #fff, 636px 1882px #fff, 1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff, 302px 252px #fff, 827px 1765px #fff, 620px 123px #fff, 207px 748px #fff, 1454px 1234px #fff, 1967px 1790px #fff, 542px 33px #fff, 742px 1214px #fff, 255px 1402px #fff, 74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff, 534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff, 1796px 120px #fff, 1409px 1263px #fff, 1627px 995px #fff, 969px 710px #fff, 1674px 676px #fff, 1832px 759px #fff, 1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff, 886px 239px #fff, 778px 150px #fff, 1767px 430px #fff, 765px 1259px #fff, 1189px 877px #fff, 444px 1629px #fff, 1560px 324px #fff, 1952px 1097px #fff, 712px 1173px #fff, 541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff, 784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff, 1821px 174px #fff, 221px 1795px #fff, 1004px 456px #fff, 1298px 941px #fff, 274px 387px #fff, 174px 376px #fff, 1491px 258px #fff, 1489px 1946px #fff, 1134px 1382px #fff, 1289px 1145px #fff, 464px 358px #fff, 1249px 1842px #fff, 1665px 831px #fff, 1982px 84px #fff, 541px 774px #fff, 1994px 523px #fff, 762px 1644px #fff, 1730px 867px #fff, 1951px 1287px #fff, 911px 1691px #fff, 1454px 725px #fff, 1287px 1940px #fff, 70px 564px #fff, 1980px 638px #fff, 1674px 1774px #fff, 1720px 116px #fff, 1747px 182px #fff, 1040px 450px #fff, 1795px 375px #fff, 857px 1471px #fff, 1326px 1730px #fff, 915px 274px #fff, 1224px 358px #fff, 1808px 60px #fff, 43px 1870px #fff, 1810px 1536px #fff, 1564px 1719px #fff, 731px 1388px #fff, 1953px 1967px #fff, 1744px 1119px #fff, 794px 1384px #fff, 959px 714px #fff, 18px 1932px #fff, 1358px 1437px #fff, 355px 939px #fff, 1355px 1648px #fff, 608px 719px #fff, 383px 758px #fff, 1164px 1681px #fff, 1045px 253px #fff, 424px 1279px #fff, 1899px 359px #fff, 379px 488px #fff, 214px 465px #fff, 179px 905px #fff, 830px 1993px #fff, 448px 1077px #fff, 1880px 1354px #fff, 1973px 347px #fff, 745px 1025px #fff, 788px 1007px #fff, 1377px 883px #fff, 6px 290px #fff, 1312px 407px #fff, 1398px 622px #fff, 1405px 339px #fff, 1198px 1709px #fff, 988px 1226px #fff, 87px 1459px #fff, 1113px 1698px #fff, 997px 732px #fff, 708px 331px #fff, 1876px 1112px #fff, 1729px 1797px #fff, 719px 703px #fff, 1295px 522px #fff, 758px 1061px #fff, 1309px 1014px #fff, 1327px 1365px #fff, 854px 1317px #fff, 531px 1001px #fff, 1751px 1040px #fff, 1354px 190px #fff, 800px 1538px #fff, 88px 1455px #fff, 668px 39px #fff, 1379px 41px #fff, 892px 524px #fff, 54px 649px #fff, 1289px 730px #fff, 727px 488px #fff, 181px 842px #fff, 1230px 64px #fff, 3px 857px #fff, 292px 1201px #fff, 1343px 673px #fff, 1096px 1412px #fff, 1520px 292px #fff, 104px 1683px #fff, 934px 1387px #fff, 314px 739px #fff;
          animation: animStar 100s linear infinite;
        }
        #stars2:after {
          content: " "; position: absolute; top: 2000px;
          width: 2px; height: 2px;
          background: transparent;
          box-shadow: inherit; /* Copies the parent's box shadow for seamless loop */
        }
        
        /* Large Stars */
        #stars3 {
          width: 3px; height: 3px;
          box-shadow: 200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff, 1888px 1547px #fff, 899px 1226px #fff, 1887px 580px #fff, 1548px 1092px #fff, 1626px 689px #fff, 254px 1072px #fff, 1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff, 1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff, 476px 876px #fff, 829px 1896px #fff, 1364px 1846px #fff, 1507px 1120px #fff, 936px 1948px #fff, 1833px 832px #fff, 1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff, 1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff, 264px 297px #fff, 811px 977px #fff, 1931px 673px #fff, 1734px 978px #fff, 1772px 1567px #fff, 1197px 1400px #fff, 764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff, 1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff, 235px 1082px #fff, 299px 1086px #fff, 1017px 1602px #fff, 1950px 626px #fff, 1306px 132px #fff, 1358px 1618px #fff, 1873px 1718px #fff, 1447px 940px #fff, 1888px 1195px #fff, 1704px 1765px #fff, 872px 1357px #fff, 1555px 1120px #fff, 250px 1415px #fff, 450px 415px #fff, 492px 901px #fff, 170px 1641px #fff, 56px 1129px #fff, 627px 1514px #fff, 1221px 500px #fff, 324px 1895px #fff, 1397px 1775px #fff, 1966px 598px #fff, 1550px 763px #fff, 326px 1605px #fff, 261px 969px #fff, 890px 281px #fff, 736px 544px #fff, 589px 1262px #fff, 1581px 368px #fff, 1900px 1132px #fff, 1914px 585px #fff, 1864px 1517px #fff, 241px 217px #fff, 859px 787px #fff, 996px 1729px #fff, 741px 121px #fff, 418px 414px #fff, 142px 967px #fff, 387px 896px #fff, 703px 562px #fff, 968px 1136px #fff, 1682px 332px #fff, 1287px 846px #fff, 256px 1427px #fff, 1885px 432px #fff, 1739px 1458px #fff, 345px 1769px #fff, 1140px 1612px #fff, 192px 1921px #fff, 920px 471px #fff, 834px 881px #fff, 917px 1803px #fff, 466px 1266px #fff, 483px 1108px #fff, 689px 986px #fff, 1279px 786px #fff, 458px 910px #fff, 1250px 870px #fff, 785px 1654px #fff, 1543px 1757px #fff, 287px 1272px #fff;
          animation: animStar 150s linear infinite;
        }
        #stars3:after {
          content: " "; position: absolute; top: 2000px;
          width: 3px; height: 3px;
          background: transparent;
          box-shadow: inherit; /* Copies the parent's box shadow for seamless loop */
        }
        
        /* The Moving Animation */
        @keyframes animStar {
          from { transform: translateY(0px) translateZ(0); }
          to { transform: translateY(-2000px) translateZ(0); }
        }
      `}</style>
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#530909]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#d4af37]/10 blur-[100px] pointer-events-none" />

      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 flex flex-col mt-10 items-center gap-3">
        <div className="flex items-center gap-3 text-[#d4af37] text-xl tracking-[0.25em]">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <span style={{ fontFamily: "'Cinzel Decorative', cursive" }}> GALLERY</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>
        <h2 className="text-3xl w-[250px] md:w-[420px] md:text-5xl mt-2 py-2 text-center font-bold"
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            background: "linear-gradient(135deg, #FFF0B3 0%, #d4af37 50%, #997A00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.8))",
            lineHeight: "1.4"
          }}>
          उत्सव की झलकियाँ
        </h2>
      </div>

      {/* ── 3D COVERFLOW SLIDER ── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-1 md:gap-6 mt-0">
        <div className="flex flex-col items-center gap-2">
          <p style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#d4af37", fontSize: "12px", letterSpacing: "0.25em" }}>
            BAPPA KI JHALAK
          </p>
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-12 h-px bg-[#d4af37]" />
            <span style={{ color: "#d4af37", fontSize: "14px" }}>🪷</span>
            <div className="w-12 h-px bg-[#d4af37]" />
          </div>
        </div>
        
        {/* New Hardware Accelerated Coverflow */}
        <CoverflowSlider />
      </div>


      {/* ── FESTIVE GALLERY 3D DOME ── */}
      <div className="relative z-10 w-full flex flex-col gap-8 mt-10">
        <div className="flex flex-col items-center gap-2">
          <p style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#d4af37", fontSize: "12px", letterSpacing: "0.25em" }}>
            FESTIVE GALLERY
          </p>
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-12 h-px bg-[#d4af37]" />
            <span style={{ color: "#d4af37", fontSize: "14px" }}>❖</span>
            <div className="w-12 h-px bg-[#d4af37]" />
          </div>
        </div>
        
        {/* 🚀 New 3D Dome Gallery Container */}
        {/* <div className="w-full h-[500px] md:h-[700px] relative">
          <DomeGallery 
             images={MARQUEE_IMAGES} 
             minRadius={300} 
             fit={0.55}
             overlayBlurColor="#080202" // आपकी वेबसाइट के डार्क बैकग्राउंड से ब्लेंड करने के लिए
             grayscale={false} // रंगीन (Colorful) फोटो दिखाने के लिए
          />
        </div> */}

        {/* 🚀 New 3D Dome Gallery Container */}
        {/* मोबाइल पर ऊँचाई कम (350px) और डेस्कटॉप पर ज़्यादा (600px) */}
        {/* <div className="w-full h-[350px] md:h-[600px] relative">
          <DomeGallery 
             images={MARQUEE_IMAGES} 
             
             // 🚀 FIX: Mobile Layout Issue
             // Desktop पर radius 350, Mobile पर 150 (ताकि इमेजेस पास-पास और बड़ी दिखें)
             minRadius={typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 350} 
             
             // 🚀 FIX: Circular images on mobile
             // मोबाइल पर 30px बॉर्डर रेडियस से ये गोल (circle) बन रहे थे। अब ये चौकोर (Rectangle) ही रहेंगे।
             imageBorderRadius="8px"
             openedImageBorderRadius="16px"
             
             fit={0.6} // थोड़ा सा स्केल (Scale) बड़ा करने के लिए
             overlayBlurColor="#080202"
             grayscale={false} 
             autoRotateSpeed={0.06} // 🚀 Marquee Auto-rotate speed
          />
        </div> */}

        {/* 🚀 3D Dome Gallery Container */}
        <div className="w-full h-[270px] md:h-[600px] relative">
          <DomeGallery 
             images={MARQUEE_IMAGES} 
             
             // 🚀 FIX: Segments घटाकर 18 कर दिए गए हैं, ताकि मोबाइल पर ये छोटे डॉट्स की बजाय बड़े रेक्टेंगल दिखें!
             segments={18}
             
             // 🚀 FIX: Mobile के लिए Radius 150 है, ताकि कार्ड्स एक-दूसरे के पास-पास आ जाएं।
             minRadius={typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 350} 
             
             // 🚀 FIX: Border radius कम (8px) कर दिया है ताकि ये गोल (Circle) न बनकर चौकोर ही रहें।
             imageBorderRadius="8px"
             openedImageBorderRadius="16px"
             
             fit={0.65} 
             overlayBlurColor="#080202"
             grayscale={false} 
             autoRotateSpeed={0.08} // लगातार घूमने की स्पीड
          />
        </div>
        
     
      </div>

      {/* ── FESTIVE GALLERY MARQUEE ── */}
      {/* <div className="relative z-10 w-full flex flex-col gap-8 mt-8">
        <div className="flex flex-col items-center gap-2">
          <p style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#d4af37", fontSize: "12px", letterSpacing: "0.25em" }}>
            FESTIVE GALLERY
          </p>
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-12 h-px bg-[#d4af37]" />
            <span style={{ color: "#d4af37", fontSize: "14px" }}>❖</span>
            <div className="w-12 h-px bg-[#d4af37]" />
          </div>
        </div>
        
        <MarqueeGallery />
        
        <p className="text-center mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E8D4B4", fontSize: "14px", fontStyle: "italic", opacity: 0.5 }}>
          Hover to pause · Swipe across the gallery
        </p>
      </div> */}
    </section>
  );
}