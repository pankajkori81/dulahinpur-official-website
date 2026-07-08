
// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";

// /* ═══════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════ */
// const prayers = [
//   {
//     sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।",
//     transliteration: "Vakratunda Mahakaya Suryakoti Samaprabha",
//     meaning: "O Lord Ganesha, with a curved trunk and a mighty body, radiant as a million suns",
//   },
//   {
//     sanskrit: "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा।",
//     transliteration: "Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada",
//     meaning: "Please bless me O Lord, to grant success in all my endeavours, forever",
//   },
// ];


// const SLIDER_IMAGES = [
//   { src: "/slide-img1.jpg", alt: "Ganpati Bappa" },
//   { src: "/slide-img2.jpg", alt: "Ganesh Festival" },
//   { src: "/slide-img3.jpg", alt: "Celebration" },
//   { src: "/slide-img4.jpg", alt: "Bappa Darshan" },
//   { src: "/slide-img5.jpg", alt: "Utsav" },
// ];

// // Marquee images — add as many as you want
// const MARQUEE_IMAGES = [
//   "https://images.unsplash.com/photo-1567591370429-35f31df0e8f7?w=400&q=75",
//   "https://images.unsplash.com/photo-1599030371558-21c2f47ec5d3?w=400&q=75",
//   "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=400&q=75",
//   "https://images.unsplash.com/photo-1567591370429-35f31df0e8f7?w=400&q=70",
//   "https://images.unsplash.com/photo-1599030371558-21c2f47ec5d3?w=400&q=70",
//   "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=400&q=70",
//   "https://images.unsplash.com/photo-1567591370429-35f31df0e8f7?w=400&q=65",
//   "https://images.unsplash.com/photo-1599030371558-21c2f47ec5d3?w=400&q=65",
//   "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=400&q=65",
//   "https://images.unsplash.com/photo-1567591370429-35f31df0e8f7?w=400&q=60",
//   "https://images.unsplash.com/photo-1599030371558-21c2f47ec5d3?w=400&q=60",
// ];

// /* ═══════════════════════════════════════════
//    SHADER SLIDER — Canvas dissolve transition
// ═══════════════════════════════════════════ */
// function ShaderSlider() {
//   const canvasRef    = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const imgsRef      = useRef<HTMLImageElement[]>([]);   // stable image store
//   const currentRef   = useRef(0);                        // shadow of current for callbacks
//   const animRef      = useRef<number>(0);
//   const autoRef      = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
//   const transitRef   = useRef(false);
//   const touchStartX  = useRef(0);
//   const touchStartY  = useRef(0);

//   const [current,        setCurrent]        = useState(0);
//   const [isTransitioning,setIsTransitioning]= useState(false);
//   const [ready,          setReady]          = useState(false);   // true once ≥1 img loaded

//   /* ── helpers ── */
//   const getCanvas = () => canvasRef.current;
//   const getCtx    = () => canvasRef.current?.getContext("2d") ?? null;

//   const syncCanvasSize = useCallback(() => {
//     const canvas    = getCanvas();
//     const container = containerRef.current;
//     if (!canvas || !container) return;
//     const w = container.clientWidth;
//     const h = container.clientHeight;
//     if (canvas.width !== w || canvas.height !== h) {
//       canvas.width  = w;
//       canvas.height = h;
//     }
//   }, []);

//   const drawImage = useCallback((img: HTMLImageElement) => {
//     syncCanvasSize();
//     const canvas = getCanvas();
//     const ctx    = getCtx();
//     if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) return;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   }, [syncCanvasSize]);

//   /* ── preload ── */
//   useEffect(() => {
//     let done = 0;
//     const total = SLIDER_IMAGES.length;
//     imgsRef.current = new Array(total);

//     SLIDER_IMAGES.forEach((s, i) => {
//       const img = new window.Image();
//       // crossOrigin only for external URLs — local /public files must NOT have it
//       if (s.src.startsWith("http")) img.crossOrigin = "anonymous";
//       img.onload = () => {
//         imgsRef.current[i] = img;
//         done++;
//         // Draw first image the moment it arrives (don't wait for all)
//         if (i === 0 || (!imgsRef.current[0] && done === 1)) {
//           // Make sure canvas is sized first
//           syncCanvasSize();
//           // Small rAF delay so the DOM has painted the container
//           requestAnimationFrame(() => {
//             requestAnimationFrame(() => {
//               drawImage(img);
//               setReady(true);
//             });
//           });
//         }
//         if (done === total) {
//           // Re-draw slide 0 in case it loaded late
//           if (currentRef.current === 0) drawImage(imgsRef.current[0]);
//         }
//       };
//       img.onerror = () => {
//         console.warn("Slider image failed:", s.src);
//         done++;
//       };
//       img.src = s.src;
//     });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /* ── canvas resize observer ── */
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     const ro = new ResizeObserver(() => {
//       syncCanvasSize();
//       const img = imgsRef.current[currentRef.current];
//       if (img) drawImage(img);
//     });
//     ro.observe(container);
//     return () => ro.disconnect();
//   }, [syncCanvasSize, drawImage]);

//   /* ── shader transition ── */
//   const runTransition = useCallback((from: number, to: number) => {
//     const fromImg = imgsRef.current[from];
//     const toImg   = imgsRef.current[to];
//     if (!fromImg || !toImg) {
//       // Image not loaded yet — just jump cut
//       if (toImg) drawImage(toImg);
//       setCurrent(to);
//       currentRef.current = to;
//       transitRef.current = false;
//       setIsTransitioning(false);
//       return;
//     }

//     transitRef.current = true;
//     setIsTransitioning(true);

//     syncCanvasSize();
//     const canvas = getCanvas()!;
//     const ctx    = getCtx()!;
//     const W = canvas.width;
//     const H = canvas.height;

//     // Capture both image pixel buffers at full canvas size
//     ctx.drawImage(fromImg, 0, 0, W, H);
//     const fromData = ctx.getImageData(0, 0, W, H).data;
//     ctx.drawImage(toImg,   0, 0, W, H);
//     const toData   = ctx.getImageData(0, 0, W, H).data;
//     const out      = ctx.createImageData(W, H);

//     const duration = 800;
//     const start    = performance.now();

//     const animate = (now: number) => {
//       const p = Math.min((now - start) / duration, 1);
//       // ease in-out cubic
//       const e = p < 0.5 ? 4*p**3 : 1-(-2*p+2)**3/2;

//       for (let y = 0; y < H; y++) {
//         for (let x = 0; x < W; x++) {
//           const idx = (y * W + x) * 4;
//           const normX = x / W;
//           // ripple wave sweeping left→right
//           const wave = Math.sin(y * 0.04 + e * Math.PI * 8) * 0.1;
//           const edgeWidth = 0.07;
//           const threshold = e + wave;
//           let a: number;
//           if      (normX < threshold - edgeWidth) a = 1;
//           else if (normX > threshold + edgeWidth) a = 0;
//           else {
//             a = (normX - (threshold - edgeWidth)) / (edgeWidth * 2);
//             a = a * a * (3 - 2 * a); // smoothstep
//           }
//           // secondary vertical ripple
//           a = Math.max(0, Math.min(1, a + Math.sin(x*0.05 + e*Math.PI*4)*0.05));

//           out.data[idx]   = fromData[idx]   * (1-a) + toData[idx]   * a;
//           out.data[idx+1] = fromData[idx+1] * (1-a) + toData[idx+1] * a;
//           out.data[idx+2] = fromData[idx+2] * (1-a) + toData[idx+2] * a;
//           out.data[idx+3] = 255;
//         }
//       }
//       ctx.putImageData(out, 0, 0);

//       if (p < 1) {
//         animRef.current = requestAnimationFrame(animate);
//       } else {
//         // Clean final draw
//         ctx.drawImage(toImg, 0, 0, W, H);
//         currentRef.current = to;
//         setCurrent(to);
//         transitRef.current = false;
//         setIsTransitioning(false);
//       }
//     };
//     animRef.current = requestAnimationFrame(animate);
//   }, [syncCanvasSize, drawImage]);

//   /* ── navigation ── */
//   const goTo = useCallback((next: number) => {
//     if (transitRef.current) return;
//     const from = currentRef.current;
//     const to   = ((next % SLIDER_IMAGES.length) + SLIDER_IMAGES.length) % SLIDER_IMAGES.length;
//     if (from === to) return;
//     cancelAnimationFrame(animRef.current);
//     runTransition(from, to);
//   }, [runTransition]);

//   const goNext = useCallback(() => goTo(currentRef.current + 1), [goTo]);
//   const goPrev = useCallback(() => goTo(currentRef.current - 1), [goTo]);

//   /* ── auto-slide ── */
//   useEffect(() => {
//     if (!ready) return;
//     clearTimeout(autoRef.current);
//     autoRef.current = setTimeout(goNext, 4000);
//     return () => clearTimeout(autoRef.current);
//   }, [current, ready, goNext]);

//   /* ── touch swipe ── */
//   const onTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//     touchStartY.current = e.touches[0].clientY;
//   };
//   const onTouchEnd = (e: React.TouchEvent) => {
//     const dx = e.changedTouches[0].clientX - touchStartX.current;
//     const dy = e.changedTouches[0].clientY - touchStartY.current;
//     if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
//       dx < 0 ? goNext() : goPrev();
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
//       {/* Slider card */}
//       <div
//         ref={containerRef}
//         className="relative w-full rounded-3xl overflow-hidden"
//         style={{
//           aspectRatio: "16/9",
//           border: "1px solid rgba(245,166,35,0.3)",
//           boxShadow: "0 0 60px rgba(192,57,43,0.25), 0 20px 60px rgba(0,0,0,0.6)",
//           cursor: isTransitioning ? "default" : "grab",
//         }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         {/* Canvas — shader renders here */}
//         <canvas
//           ref={canvasRef}
//           style={{ width: "100%", height: "100%", display: "block" }}
//         />

//         {/* Loading state */}
//         {!ready && (
//           <div className="absolute inset-0 flex items-center justify-center"
//             style={{ background: "rgba(30,2,6,0.9)" }}>
//             <div className="flex flex-col items-center gap-3">
//               <div
//                 className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
//                 style={{ borderColor: "rgba(245,166,35,0.6)", borderTopColor: "transparent" }}
//               />
//               <span style={{ fontFamily: "'Cormorant Garamond', serif",
//                 color: "rgba(245,166,35,0.7)", fontSize: "13px", letterSpacing: "0.15em" }}>
//                 Loading...
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Gradient overlay — bottom fade for text readability */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: "linear-gradient(to top, rgba(10,1,2,0.7) 0%, transparent 50%)",
//           }}
//         />

//         {/* Slide label */}
//         <div className="absolute bottom-12 left-5 pointer-events-none">
//           <p style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             color: "rgba(255,220,150,0.85)",
//             fontSize: "13px",
//             letterSpacing: "0.12em",
//             fontStyle: "italic",
//           }}>
//             {SLIDER_IMAGES[current]?.alt}
//           </p>
//         </div>

//         {/* Prev / Next arrow buttons */}
//         {[
//           { dir: "prev", label: "‹", action: goPrev, side: "left-3" },
//           { dir: "next", label: "›", action: goNext, side: "right-3" },
//         ].map(({ dir, label, action, side }) => (
//           <button
//             key={dir}
//             onClick={action}
//             disabled={isTransitioning}
//             className={`absolute ${side} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
//             style={{
//               background: "rgba(10,1,2,0.65)",
//               backdropFilter: "blur(8px)",
//               border: "1px solid rgba(245,166,35,0.3)",
//               color: "rgba(245,166,35,0.9)",
//               fontSize: "22px",
//               lineHeight: 1,
//               cursor: isTransitioning ? "default" : "pointer",
//               opacity: isTransitioning ? 0.4 : 1,
//             }}
//           >
//             {label}
//           </button>
//         ))}

//         {/* Gold border glow overlay */}
//         <div className="absolute inset-0 rounded-3xl pointer-events-none"
//           style={{ boxShadow: "inset 0 0 0 1px rgba(245,166,35,0.15)" }} />
//       </div>

//       {/* Dot navigation */}
//       <div className="flex items-center justify-center gap-2.5">
//         {SLIDER_IMAGES.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => goTo(i)}
//             disabled={isTransitioning}
//             className="transition-all duration-300"
//             style={{
//               width: i === current ? "24px" : "8px",
//               height: "8px",
//               borderRadius: i === current ? "4px" : "50%",
//               background: i === current
//                 ? "linear-gradient(90deg, #F5A623, #FFD700)"
//                 : "rgba(245,166,35,0.3)",
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//               boxShadow: i === current ? "0 0 10px rgba(245,166,35,0.5)" : "none",
//             }}
//           />
//         ))}
//       </div>

//       {/* Swipe hint — mobile only */}
//       <p className="text-center md:hidden" style={{
//         fontFamily: "'Cormorant Garamond', serif",
//         color: "rgba(245,166,35,0.4)",
//         fontSize: "11px",
//         letterSpacing: "0.15em",
//         fontStyle: "italic",
//       }}>
//         ← Swipe to navigate →
//       </p>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    INFINITE MARQUEE — two rows opposite dirs
// ═══════════════════════════════════════════ */
// function MarqueeGallery() {
//   // Duplicate images enough times for seamless loop
//   const row1 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
//   const row2 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES].reverse();

//   return (
//     <div className="w-full flex flex-col gap-4 overflow-hidden">
//       <style>{`
//         @keyframes marqueeLeft {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes marqueeRight {
//           0%   { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }
//         .marquee-track-left {
//           display: flex;
//           width: max-content;
//           animation: marqueeLeft 55s linear infinite;
//         }
//         .marquee-track-right {
//           display: flex;
//           width: max-content;
//           animation: marqueeRight 55s linear infinite;
//         }
//         .marquee-track-left:hover,
//         .marquee-track-right:hover {
//           animation-play-state: paused;
//         }
//         .marquee-img {
//           width: 220px;
//           height: 155px;
//           object-fit: cover;
//           border-radius: 16px;
//           margin-right: 14px;
//           flex-shrink: 0;
//           border: 1px solid rgba(245,166,35,0.2);
//           filter: brightness(0.82) saturate(0.85);
//           transition: filter 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
//         }
//         .marquee-img:hover {
//           filter: brightness(1) saturate(1.1);
//           transform: scale(1.04);
//           border-color: rgba(245,166,35,0.6);
//         }
//       `}</style>

//       {/* Row 1 — scrolls left */}
//       <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
//                     WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
//         <div className="marquee-track-left">
//           {row1.map((src, i) => (
//             <img key={i} src={src} alt={`Festival ${i + 1}`} className="marquee-img" />
//           ))}
//         </div>
//       </div>

//       {/* Row 2 — scrolls right */}
//       <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
//                     WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
//         <div className="marquee-track-right">
//           {row2.map((src, i) => (
//             <img key={i} src={src} alt={`Festival ${i + 1}`} className="marquee-img" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    MAIN DEVOTIONAL SECTION
// ═══════════════════════════════════════════ */
// export default function DevotionalSection() {
//   return (
//     <section
//       id="devotional"
//       className="relative py-24 px-4 flex flex-col items-center gap-16"
//     >
//       {/* ── SECTION HEADER ── */}
//       <div className="flex flex-col items-center gap-3">
//         <div className="flex items-center gap-3"
//           style={{ color: "rgba(245,166,35,0.6)", letterSpacing: "0.25em", fontSize: "12px" }}>
//           <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.5))" }} />
//           <span style={{ fontFamily: "'Cinzel Decorative', cursive" }}>PRAYERS</span>
//           <div className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(245,166,35,0.5))" }} />
//         </div>
//         <h2 className="text-3xl md:text-4xl text-center"
//           style={{
//             fontFamily: "'Cinzel Decorative', cursive",
//             background: "linear-gradient(135deg, #FFD700 0%, #F5A623 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}>
//           In His Blessings
//         </h2>
//       </div>

//       {/* ── MAIN SLOGAN CARD ── */}
//       <div className="w-full max-w-2xl">
//         <div
//           className="relative rounded-3xl overflow-hidden px-8 py-12 md:px-14 md:py-14 flex flex-col items-center gap-5 text-center"
//           style={{
//             background: "linear-gradient(160deg, rgba(72,8,16,0.85) 0%, rgba(30,2,6,0.92) 50%, rgba(26,10,46,0.88) 100%)",
//             backdropFilter: "blur(24px)",
//             border: "1px solid rgba(245,166,35,0.22)",
//             boxShadow: "0 0 60px rgba(192,57,43,0.2), 0 30px 80px rgba(0,0,0,0.5)",
//           }}
//         >
//           {/* Top gold band */}
//           <div className="absolute top-0 left-0 right-0 h-px"
//             style={{ background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent)" }} />

//           <div
//             style={{
//               fontFamily: "'Cinzel Decorative', cursive",
//               background: "linear-gradient(135deg, #F5A623 0%, #FFD700 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: "clamp(28px, 7vw, 48px)",
//               fontWeight: 700,
//               filter: "drop-shadow(0 0 20px rgba(245,166,35,0.5))",
//               lineHeight: 1.2,
//             }}
//           >
//             गणपती बाप्पा मोरया
//           </div>

//           <p style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             color: "rgba(255,210,120,0.7)",
//             fontSize: "16px",
//             fontStyle: "italic",
//             letterSpacing: "0.08em",
//           }}>
//             Ganapati Bappa Morya — Puncha Varshi Laukariya
//           </p>

//           <div className="flex items-center gap-3 w-full max-w-xs">
//             <div className="flex-1 h-px" style={{ background: "rgba(245,166,35,0.25)" }} />
//             <span style={{ color: "rgba(245,166,35,0.6)", fontSize: "14px" }}>❋</span>
//             <div className="flex-1 h-px" style={{ background: "rgba(245,166,35,0.25)" }} />
//           </div>

//           <p style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             color: "rgba(255,220,160,0.8)",
//             fontSize: "16px",
//             lineHeight: 1.9,
//             maxWidth: "480px",
//           }}>
//             May Bappa bring joy, prosperity, and remove all obstacles from the
//             path of life. We welcome you to be a part of this divine celebration
//             and receive his blessings.
//           </p>

//           {/* Bottom gold band */}
//           <div className="absolute bottom-0 left-0 right-0 h-px"
//             style={{ background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent)" }} />
//         </div>
//       </div>

//       {/* ── PRAYER SHLOKA CARDS ── */}
//       <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
//         {prayers.map((prayer, i) => (
//           <div
//             key={i}
//             className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
//             style={{
//               background: "linear-gradient(160deg, rgba(58,4,10,0.88) 0%, rgba(26,10,46,0.85) 100%)",
//               backdropFilter: "blur(20px)",
//               border: "1px solid rgba(245,166,35,0.18)",
//               boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//             }}
//           >
//             {/* Quote mark */}
//             <div style={{
//               fontFamily: "'Cinzel Decorative', cursive",
//               color: "rgba(245,166,35,0.25)",
//               fontSize: "52px",
//               lineHeight: 0.75,
//               marginBottom: "-4px",
//             }}>
//               "
//             </div>
//             <p style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               color: "rgba(255,235,180,0.92)",
//               fontSize: "17px",
//               lineHeight: 1.75,
//               fontWeight: 500,
//             }}>
//               {prayer.sanskrit}
//             </p>
//             <div className="h-px w-10" style={{ background: "rgba(245,166,35,0.4)" }} />
//             <p style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               color: "rgba(245,166,35,0.7)",
//               fontSize: "12px",
//               fontStyle: "italic",
//               letterSpacing: "0.04em",
//             }}>
//               {prayer.transliteration}
//             </p>
//             <p style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               color: "rgba(255,210,150,0.6)",
//               fontSize: "13px",
//               lineHeight: 1.65,
//             }}>
//               {prayer.meaning}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* ── SHADER SLIDER ── */}
//       <div className="w-full flex flex-col items-center gap-5">
//         <div className="flex flex-col items-center gap-2">
//           <p style={{
//             fontFamily: "'Cinzel Decorative', cursive",
//             color: "rgba(245,166,35,0.6)",
//             fontSize: "11px",
//             letterSpacing: "0.25em",
//           }}>
//             BAPPA KI JHALAK
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
//             <span style={{ color: "rgba(245,166,35,0.5)", fontSize: "14px" }}>🪷</span>
//             <div className="w-12 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
//           </div>
//         </div>
//         <ShaderSlider />
//       </div>

//       {/* ── FESTIVE GALLERY MARQUEE ── */}
//       <div className="w-full flex flex-col gap-6">
//         <div className="flex flex-col items-center gap-2">
//           <p style={{
//             fontFamily: "'Cinzel Decorative', cursive",
//             color: "rgba(245,166,35,0.6)",
//             fontSize: "11px",
//             letterSpacing: "0.25em",
//           }}>
//             FESTIVE GALLERY
//           </p>
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
//             <span style={{ color: "rgba(245,166,35,0.5)", fontSize: "14px" }}>❋</span>
//             <div className="w-12 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
//           </div>
//         </div>
//         <MarqueeGallery />
//         <p className="text-center" style={{
//           fontFamily: "'Cormorant Garamond', serif",
//           color: "rgba(255,200,100,0.35)",
//           fontSize: "12px",
//           fontStyle: "italic",
//         }}>
//           Hover to pause · Your photos will replace these placeholders
//         </p>
//       </div>
//     </section>
//   );
// } 


















"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image"; // Image optimization for faster loading

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
  // ... (CoverflowSlider का ऊपर का लॉजिक वैसा ही रहेगा) ...
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 items-center">
      
      {/* 3D Scene Container */}
      <div 
        className="relative w-full h-[220px] sm:h-[350px] md:h-[450px] overflow-visible"
        style={{ perspective: "1200px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDER_IMAGES.map((img, i) => {
          // 🚀 FIX: Eager load center, right(1), and left(last) cards instantly
          const isVisibleInstantly = i === 0 || i === 1 || i === length - 1;

          return (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className="absolute top-1/2 left-1/2 w-[85%] sm:w-[70%] md:w-[600px] lg:w-[700px] aspect-video rounded-2xl overflow-hidden transition-all duration-700 ease-out"
              style={{
                transformStyle: "preserve-3d",
                border: "1px solid rgba(212,175,55,0.3)",
                ...getCardStyle(i),
              }}
            >
              {/* 🚀 FIX: Next.js Optimized Image Component */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 70vw, 700px"
                className="object-cover"
                priority={isVisibleInstantly} // पलक झपकते ही लोड होगा
              />
              
              {/* Active Card Text Overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 pt-12 transition-opacity duration-500"
                style={{ 
                  background: "linear-gradient(to top, rgba(15,3,3,0.9), transparent)",
                  opacity: current === i ? 1 : 0 
                }}
              >
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#E8D4B4",
                  fontSize: "18px",
                  letterSpacing: "0.1em",
                  textAlign: "center"
                }}>
                  {img.alt}
                </h3>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-2 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#110505]/80 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#110505] transition-all backdrop-blur-md">
          ‹
        </button>
        <button onClick={nextSlide} className="absolute right-2 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#110505]/80 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#110505] transition-all backdrop-blur-md">
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
  );
}
  


/* ═══════════════════════════════════════════
   FIXED MARQUEE (Optimized Loading)
═══════════════════════════════════════════ */
function MarqueeGallery() {
  const row1 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
  const row2 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES].reverse();

  return (
    <div className="w-full flex flex-col gap-5 overflow-hidden">
      <style>{`
        @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        
        .marquee-track-left { display: flex; width: max-content; animation: marqueeLeft 40s linear infinite; }
        .marquee-track-right { display: flex; width: max-content; animation: marqueeRight 40s linear infinite; }
        .marquee-track-left:hover, .marquee-track-right:hover { animation-play-state: paused; }
        
        .marquee-img-container {
          position: relative;
          width: 260px;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          margin-right: 16px;
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid rgba(212,175,55,0.2);
          transition: all 0.3s ease;
        }
        .marquee-img-container img {
          filter: brightness(0.8) saturate(0.8);
          transition: all 0.3s ease;
        }
        .marquee-img-container:hover {
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
          transform: scale(1.03);
          z-index: 10;
        }
        .marquee-img-container:hover img {
          filter: brightness(1) saturate(1.1);
        }

        /* Mobile specific sizing */
        @media (max-width: 768px) {
          .marquee-img-container {
            width: 200px;
          }
        }
      `}</style>

      {/* Row 1 */}
      <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div className="marquee-track-left">
          {row1.map((item, i) => (
            <div key={`r1-${i}`} className="marquee-img-container">
              {/* 🚀 FIX: Next.js Image with priority for first 4 items */}
              <Image 
                src={item.src} 
                alt={item.alt} 
                fill
                sizes="(max-width: 768px) 200px, 260px"
                className="object-cover"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div className="marquee-track-right">
          {row2.map((item, i) => (
            <div key={`r2-${i}`} className="marquee-img-container">
              {/* 🚀 FIX: Next.js Image with priority for first 4 items */}
              <Image 
                src={item.src} 
                alt={item.alt} 
                fill
                sizes="(max-width: 768px) 200px, 260px"
                className="object-cover"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#530909]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#d4af37]/10 blur-[100px] pointer-events-none" />

      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 flex flex-col mt-15 items-center gap-3">
        <div className="flex items-center gap-3 text-[#d4af37] text-xl tracking-[0.25em]">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <span style={{ fontFamily: "'Cinzel Decorative', cursive" }}> GALLERY</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>
        <h2 className="text-3xl md:text-5xl mt-2 text-center font-bold"
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            background: "linear-gradient(135deg, #FFF0B3 0%, #d4af37 50%, #997A00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.8))"
          }}>
          उत्सव की झलकियाँ
        </h2>
      </div>

      {/* ── MAIN SLOGAN CARD ── */}
      {/* <div className="relative z-10 w-full max-w-2xl">
        <div
          className="relative rounded-3xl px-8 py-12 md:px-14 md:py-14 flex flex-col items-center gap-5 text-center transition-transform hover:-translate-y-1"
          style={{
            background: "linear-gradient(160deg, rgba(30,8,8,0.9) 0%, rgba(15,3,3,0.95) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(83,9,9,0.3)",
          }}
        >
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

          <h3
            style={{
              fontFamily: "'Cinzel Decorative', cursive",
              background: "linear-gradient(135deg, #F5A623 0%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(28px, 6vw, 44px)",
              fontWeight: 700,
            }}
          >
            गणपती बाप्पा मोरया
          </h3>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E8D4B4", fontSize: "16px", fontStyle: "italic", letterSpacing: "0.08em" }}>
            Ganapati Bappa Morya — Puncha Varshi Laukariya
          </p>

          <div className="flex items-center gap-3 w-full max-w-[200px] opacity-60">
            <div className="flex-1 h-px bg-[#d4af37]" />
            <span style={{ color: "#d4af37", fontSize: "12px" }}>❖</span>
            <div className="flex-1 h-px bg-[#d4af37]" />
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F3E9D8", fontSize: "17px", lineHeight: 1.8, maxWidth: "480px" }}>
            May Bappa bring joy, prosperity, and remove all obstacles from the path of life. We welcome you to be a part of this divine celebration and receive his blessings.
          </p>
        </div>
      </div> */}

      {/* ── PRAYER SHLOKA CARDS ── */}
      {/* <div className="relative z-10 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {prayers.map((prayer, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(145deg, rgba(45,10,10,0.7) 0%, rgba(20,5,5,0.9) 100%)",
              border: "1px solid rgba(212,175,55,0.15)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ fontFamily: "'Cinzel Decorative', cursive", color: "rgba(212,175,55,0.3)", fontSize: "60px", lineHeight: 0.5, marginBottom: "10px" }}>
              "
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F3E9D8", fontSize: "19px", lineHeight: 1.6, fontWeight: 600 }}>
              {prayer.sanskrit}
            </p>
            <div className="h-px w-12 bg-[#d4af37]/40" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4af37", fontSize: "14px", fontStyle: "italic", letterSpacing: "0.05em" }}>
              {prayer.transliteration}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E8D4B4", fontSize: "15px", lineHeight: 1.6, opacity: 0.8 }}>
              {prayer.meaning}
            </p>
          </div>
        ))}
      </div> */}

      {/* ── 3D COVERFLOW SLIDER ── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-8 mt-10">
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

      {/* ── FESTIVE GALLERY MARQUEE ── */}
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
        
        <MarqueeGallery />
        
        <p className="text-center mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E8D4B4", fontSize: "14px", fontStyle: "italic", opacity: 0.5 }}>
          Hover to pause · Swipe across the gallery
        </p>
      </div>
    </section>
  );
}