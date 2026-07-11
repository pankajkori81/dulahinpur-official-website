// "use client";

// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="relative w-full pt-16 pb-6 px-6 md:px-12  flex flex-col items-center bg-black">
      
//       {/* ── 1. THE ROYAL DIVIDER (Top Border) ── */}
//       {/* <div className="w-full max-w-6xl flex items-center justify-center opacity-80 mb-12">
//         <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
//         <span className="mx-4 text-[#d4af37] text-xl">🪷</span>
//         <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
//       </div> */}

//       {/* ── 2. MAIN FOOTER CONTENT ── */}
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
        
//         {/* Column 1: About / Brand */}
//         <div className="flex flex-col gap-4 items-center md:items-start">
//           <h2
//             style={{
//               fontFamily: "'Cinzel Decorative', cursive",
//               background: "linear-gradient(135deg, #FFF0B3 0%, #d4af37 50%, #997A00 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: "24px",
//               fontWeight: "bold",
//             }}
//           >
//             दुलहिनपुर गणेशोत्सव
//           </h2>
//           <p
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               color: "rgba(255,235,200,0.7)",
//               fontSize: "16px",
//               lineHeight: "1.6",
//               maxWidth: "300px",
//             }}
//           >
//             एक छोटी शुरुआत, एक बड़ा परिवार। बप्पा का आशीर्वाद हम सभी पर यूं ही बना रहे। 
//             आयोजक: श्री राजेंद्र कोरी एवं समस्त दुलहिनपुर परिवार।
//           </p>
//         </div>

//         {/* Column 2: Quick Links */}
//         <div className="flex flex-col gap-4 items-center md:items-start md:pl-10">
//           <h3 style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#d4af37", fontSize: "16px", letterSpacing: "0.05em" }}>
//             महत्वपूर्ण लिंक
//           </h3>
//           <ul className="flex flex-col gap-3">
//             {[
//               { name: "Home", href: "#home" },
//               { name: "About", href: "#about" },
//               { name: "Gallery", href: "#gallery" },
//               { name: "Invitation", href: "#invitation" },
//               { name: "Feedback", href: "#feedback" },
//             ].map((link, idx) => (
//               <li key={idx} className="group flex items-center justify-center md:justify-start">
//                 <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-all duration-300 mr-2 -translate-x-2 group-hover:translate-x-0">
//                   ❖
//                 </span>
//                 <Link 
//                   href={link.href}
//                   className="transition-all duration-300"
//                   style={{
//                     fontFamily: "'Cormorant Garamond', serif",
//                     color: "rgba(255,235,200,0.7)",
//                     fontSize: "16px",
//                   }}
//                 >
//                   <span className="group-hover:text-[#d4af37]">{link.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Column 3: Contact Info */}
//         <div className="flex flex-col gap-4 items-center md:items-start">
//           <h3 style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#d4af37", fontSize: "16px", letterSpacing: "0.1em" }}>
//             संपर्क एवं स्थान
//           </h3>
//           <p
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               color: "rgba(255,235,200,0.7)",
//               fontSize: "16px",
//               lineHeight: "1.6",
//             }}
//           >
//             दुलहिनपुर, रामगंज बाज़ार, <br />
//             अमेठी, उत्तर प्रदेश (227159)
//           </p>
//           <a
//             href="https://wa.me/918169585355" // आपका व्हाट्सएप नंबर
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-2 px-5 py-2 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-300"
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               color: "#d4af37",
//               fontSize: "15px",
//             }}
//           >
//             WhatsApp करें ↗
//           </a>
//         </div>

//       </div>

//       {/* ── 3. BOTTOM COPYRIGHT BAR ── */}
//       <div className="w-full max-w-6xl mt-16 pt-6 border-t border-[#d4af37]/20 flex flex-col md:flex-row items-center justify-between gap-4">
//         <p
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             color: "rgba(255,235,200,0.5)",
//             fontSize: "14px",
//           }}
//         >
//           Copyright © 2026 दुलहिनपुर गणेशोत्सव. All Rights Reserved.
//         </p>
        
//         <p
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             color: "rgba(255,235,200,0.4)",
//             fontSize: "13px",
//             letterSpacing: "0.05em",
//           }}
//         >
//           Designed & Developed by <span style={{ color: "#d4af37" }}>Pankaj Kori</span>
//         </p>
//       </div>

//     </footer>
//   );
// }










"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  // 🚀 Hydration Error से बचने के लिए Year State का इस्तेमाल (Best Practice)
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer 
      className="relative w-full pt-12 pb-6 px-6 md:px-12 mt-0 flex flex-col items-center"
      style={{
        /* 🚀 Glassmorphism Gradient (Deep Burgundy/Maroon highlight) */
        // background: "linear-gradient(135deg, rgba(4, 0, 54, 0.81) 0%, rgba(20, 5, 10, 0.9) 100%)",
    //    background: "radial-gradient(ellipse at bottom, #2d0909 0%, #2b0000 100%)",
      background: "linear-gradient(180deg, #2a0707 0%, #1a0303 100%)",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        // borderTop: "1px solid rgba(212,175,55,0.2)",
        // boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >

        <div className="w-full max-w-6xl flex flex-col">

        {/* ── 1. TOP HEADER (Logo & Photo) ── */}
       <div className="flex items-center justify-between pb-8 mb-10 border-b border-[#d4af37]/20">
          
          {/* Left: Website Logo */}
          {/* 🚀 FIX: Removed 'absolute' and added responsive heights (h-12 for mobile, h-16/20 for desktop) */}
          <div className="flex items-center">
            <Image 
              src="/logo-bappa.png" 
              alt="Dulahinpur Utsav Logo" 
              width={200} 
              height={100} 
              className="w-auto h-20 md:h-22 lg:h-28 -ml-5 object-contain   drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-300"
              priority 
            />
          </div>

          {/* Right: Self Photo (Round Circle) */}
          {/* <div className="shrink-0 w-15 h-15 md:w-24 md:h-24 rounded-md overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-110">
            <Image 
              src="/Profile.png" 
              alt="Pankaj Kori" 
              width={58} 
              height={58} 
              className="object-cover w-full h-full"
            />
          </div> */}
          
          {/* Right: Self Photo (Rounded Rectangle) */}
          <div className="shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full  overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-110">
        
            <Image 
              src="/profile.png" 
              alt="Pankaj Kori" 
              width={96} 
              height={96} 
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* <div className="shrink-0 w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full bg-[#f0f8ff] p-[1px] shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-110">
          
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image 
                src="/Pankaj3.jpg" 
                alt="Pankaj Kori" 
                width={100} 
                height={100} 
                className="object-cover w-full h-full"
              />
            </div>
          </div> */}
        </div>
     

        {/* ── 2. MAIN COLUMNS (4 Sections) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-left mb-16">
          
          {/* Column 1: Support / Help Center */}
          <div className="flex flex-col gap-4">
            <h3 style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#FFF", fontSize: "18px", fontWeight: "bold" }}>
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {["Contact Us", "Help Center", "FAQ"].map((item, idx) => (
                <li key={idx}>
                  <Link href="#contact" className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Important Links */}
          <div className="flex flex-col gap-4">
            <h3 style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#FFF", fontSize: "18px", fontWeight: "bold" }}>
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Gallery", href: "#gallery" },
                { name: "Feedback", href: "#feedback" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Media */}
          <div className="flex flex-col gap-4">
            <h3 style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#FFF", fontSize: "18px", fontWeight: "bold" }}>
              Media
            </h3>
            <ul className="flex flex-col gap-3">
              {["Instagram", "Facebook", "YouTube"].map((item, idx) => (
                <li key={idx}>
                  <Link href="#" className="text-gray-300 hover:text-[#d4af37] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Place */}
          <div className="flex flex-col gap-4">
            <h3 style={{ fontFamily: "'Cinzel Decorative', cursive", color: "#FFF", fontSize: "18px", fontWeight: "bold" }}>
              Location
            </h3>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
              दुलहिनपुर, रामगंज बाज़ार, <br />
              अमेठी, उत्तर प्रदेश (227159)
            </p>
            <a
              href="https://wa.me/918169585355"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-[#d4af37] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}
            >
              WhatsApp →
            </a>
          </div>

        </div>

        {/* ── 3. BOTTOM COPYRIGHT & LEGAL BAR ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#d4af37]/20">
          
          {/* Left: Dynamic Copyright */}
          <p className="text-gray-300 text-center md:text-left text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Copyright @{year} Pankajkori. All Rights Reserved
          </p>

          {/* Right: Legal Links */}
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-gray-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {["Legal Notice", "Privacy Policy", "Cookies", "Terms & Conditions"].map((item, idx) => (
              <li key={idx}>
                <Link href="#" className="hover:text-[#d4af37] transition-colors duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(255, 248, 237, 0.94)",
            fontSize: "13px",
            letterSpacing: "0.05em",
          }}
        >
          Designed & Developed by <span style={{ color: "#fdd247" }}>Pankaj Kori</span>
        </p>
          
        </div>
        </div>
     
    </footer>
  );
}