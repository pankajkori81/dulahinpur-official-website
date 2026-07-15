// "use client";

// import { useEffect, useState, useRef } from "react";

// export default function Loader() {
//   const [phase, setPhase]       = useState<"visible" | "fading" | "done">("visible");
//   const [progress, setProgress] = useState(0);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef   = useRef<number>(0);

//   /* ── Mandala canvas animation ── */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const SIZE = 260;
//     canvas.width  = SIZE;
//     canvas.height = SIZE;
//     const cx = SIZE / 2;
//     const cy = SIZE / 2;

//     let t = 0;

//     const draw = () => {
//       t += 0.012;
//       ctx.clearRect(0, 0, SIZE, SIZE);

//       /* ── Outer ambient glow bg ── */
//       const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, SIZE / 2);
//       bg.addColorStop(0,   "rgba(140,20,10,0.18)");
//       bg.addColorStop(0.5, "rgba(80,5,5,0.08)");
//       bg.addColorStop(1,   "transparent");
//       ctx.fillStyle = bg;
//       ctx.beginPath();
//       ctx.arc(cx, cy, SIZE / 2, 0, Math.PI * 2);
//       ctx.fill();

//       /* ── Ring 1: 16 outer lotus petals (slow CW) ── */
//       const r1 = 105;
//       for (let i = 0; i < 16; i++) {
//         const angle = (i / 16) * Math.PI * 2 + t * 0.4;
//         const px = cx + Math.cos(angle) * r1;
//         const py = cy + Math.sin(angle) * r1;
//         const depth = 0.28 + 0.22 * (0.5 + 0.5 * Math.sin(angle));

//         ctx.save();
//         ctx.translate(px, py);
//         ctx.rotate(angle + Math.PI / 2);
//         ctx.beginPath();
//         ctx.ellipse(0, 0, 7, 16, 0, 0, Math.PI * 2);

//         const g1 = ctx.createLinearGradient(0, -16, 0, 16);
//         g1.addColorStop(0,   `rgba(245,166,35,${depth * 0.9})`);
//         g1.addColorStop(0.5, `rgba(255,215,0,${depth * 0.7})`);
//         g1.addColorStop(1,   `rgba(192,57,43,${depth * 0.4})`);
//         ctx.fillStyle = g1;
//         ctx.fill();
//         ctx.restore();
//       }

//       /* ── Ring 2: 10 middle dots (faster CCW) ── */
//       const r2 = 70;
//       for (let i = 0; i < 10; i++) {
//         const angle = (i / 10) * Math.PI * 2 - t * 0.7;
//         const px = cx + Math.cos(angle) * r2;
//         const py = cy + Math.sin(angle) * r2;
//         const pulse = 0.5 + 0.5 * Math.sin(t * 3 + i * 0.8);
//         const radius = 5 + pulse * 3;

//         /* Glow halo */
//         const gd = ctx.createRadialGradient(px, py, 0, px, py, radius * 2);
//         gd.addColorStop(0,   `rgba(255,215,0,${0.7 + pulse * 0.3})`);
//         gd.addColorStop(0.4, `rgba(245,166,35,${0.4 + pulse * 0.2})`);
//         gd.addColorStop(1,   "transparent");
//         ctx.fillStyle = gd;
//         ctx.beginPath();
//         ctx.arc(px, py, radius * 2, 0, Math.PI * 2);
//         ctx.fill();

//         /* Solid core */
//         ctx.fillStyle = `rgba(255,230,100,${0.8 + pulse * 0.2})`;
//         ctx.beginPath();
//         ctx.arc(px, py, radius * 0.55, 0, Math.PI * 2);
//         ctx.fill();

//         /* Drop shadow */
//         ctx.fillStyle = `rgba(0,0,0,${0.25 + pulse * 0.15})`;
//         ctx.beginPath();
//         ctx.ellipse(px + 2, py + 2, radius * 0.5, radius * 0.3, Math.PI / 4, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       /* ── Ring 3: Pulsing inner circle ── */
//       const innerPulse = 0.5 + 0.5 * Math.sin(t * 2);
//       const r3 = 34 + innerPulse * 4;

//       const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, r3);
//       ig.addColorStop(0,   "rgba(100,8,16,0.95)");
//       ig.addColorStop(0.6, "rgba(60,4,10,0.9)");
//       ig.addColorStop(1,   "rgba(192,57,43,0.4)");
//       ctx.fillStyle = ig;
//       ctx.beginPath();
//       ctx.arc(cx, cy, r3, 0, Math.PI * 2);
//       ctx.fill();

//       /* Gold border */
//       ctx.strokeStyle = `rgba(245,166,35,${0.4 + innerPulse * 0.4})`;
//       ctx.lineWidth = 1.5;
//       ctx.beginPath();
//       ctx.arc(cx, cy, r3, 0, Math.PI * 2);
//       ctx.stroke();

//       /* Dashed second ring */
//       ctx.strokeStyle = `rgba(245,166,35,${0.15 + innerPulse * 0.1})`;
//       ctx.lineWidth = 1;
//       ctx.setLineDash([4, 6]);
//       ctx.beginPath();
//       ctx.arc(cx, cy, r3 + 10, 0, Math.PI * 2);
//       ctx.stroke();
//       ctx.setLineDash([]);

//       /* ── Center OM with flame glow ── */
//       const flameGlow = 0.6 + 0.4 * Math.sin(t * 4 + 0.3);
//       ctx.shadowColor = `rgba(255,150,0,${flameGlow * 0.8})`;
//       ctx.shadowBlur  = 12 + flameGlow * 14;
//       ctx.font        = "bold 28px serif";
//       ctx.textAlign   = "center";
//       ctx.textBaseline = "middle";

//       const omGrad = ctx.createLinearGradient(cx, cy - 14, cx, cy + 14);
//       omGrad.addColorStop(0,   "#FFF0B3");
//       omGrad.addColorStop(0.5, "#d4af37");
//       omGrad.addColorStop(1,   "#997A00");
//       ctx.fillStyle = omGrad;
//       ctx.fillText("ॐ", cx, cy + 1);
//       ctx.shadowBlur = 0;

//       /* ── Outer orbit dashes ── */
//       ctx.strokeStyle = "rgba(245,166,35,0.1)";
//       ctx.lineWidth   = 1;
//       ctx.setLineDash([2, 10]);
//       ctx.beginPath();
//       ctx.arc(cx, cy, 118, 0, Math.PI * 2);
//       ctx.stroke();
//       ctx.setLineDash([]);

//       animRef.current = requestAnimationFrame(draw);
//     };

//     draw();
//     return () => cancelAnimationFrame(animRef.current);
//   }, []);

//   /* ── Progress 0 → 100 over 3.2s with ease-out ── */
//   useEffect(() => {
//     const start    = performance.now();
//     const duration = 3200;

//     const tick = (now: number) => {
//       const p     = Math.min((now - start) / duration, 1);
//       const eased = 1 - (1 - p) ** 2;
//       setProgress(Math.round(eased * 100));
//       if (p < 1) requestAnimationFrame(tick);
//     };
//     requestAnimationFrame(tick);
//   }, []);

//   /* ── Phase: visible → fading → done ── */
//   useEffect(() => {
//     const t1 = setTimeout(() => setPhase("fading"), 3400);
//     const t2 = setTimeout(() => setPhase("done"),   4050);
//     return () => { clearTimeout(t1); clearTimeout(t2); };
//   }, []);

//   if (phase === "done") return null;

//   return (
//     <div
//       aria-label="Loading दुलहिनपुर गणेश उत्सव"
//       style={{
//         position:       "fixed",
//         inset:          0,
//         zIndex:         9999,
//         display:        "flex",
//         flexDirection:  "column",
//         alignItems:     "center",
//         justifyContent: "center",
//         background:     "#080106",
//         opacity:        phase === "fading" ? 0 : 1,
//         transition:     phase === "fading" ? "opacity 0.65s ease-out" : "none",
//         pointerEvents:  phase === "fading" ? "none" : "all",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');

//         @keyframes ldrFadeUp {
//           from { opacity:0; transform:translateY(14px); }
//           to   { opacity:1; transform:translateY(0);    }
//         }
//         @keyframes ldrShimmer {
//           0%   { background-position: -300% center; }
//           100% { background-position:  300% center; }
//         }
//         @keyframes ldrDotBlink {
//           0%,100% { opacity:0.15; }
//           50%     { opacity:1;    }
//         }
//         @keyframes ldrPulseRing {
//           0%   { transform:scale(1);    opacity:0.5; }
//           100% { transform:scale(1.35); opacity:0;   }
//         }

//         .ldr-name {
//           font-family: 'Cinzel Decorative', cursive;
//           font-size: clamp(18px, 4.5vw, 26px);
//           letter-spacing: 0.05em;
//           text-align: center;
//           line-height: 1.45;
//           background: linear-gradient(
//             90deg,
//             #d4af37 0%, #d4af37 20%,
//             #FFF8DC 38%, #FFD700 50%,
//             #FFF8DC 62%, #d4af37 80%,
//             #d4af37 100%
//           );
//           background-size: 300% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation:
//             ldrFadeUp  0.7s ease-out 0.7s both,
//             ldrShimmer 2.8s linear   1.2s infinite;
//         }
//         .ldr-puja {
//           font-family: 'Cormorant Garamond', serif;
//           font-style: italic;
//           font-size: clamp(12px, 2.8vw, 15px);
//           color: rgba(245,166,35,0.5);
//           letter-spacing: 0.18em;
//           text-align: center;
//           animation: ldrFadeUp 0.7s ease-out 1.2s both;
//         }
//         .ldr-bappa {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(12px, 2.5vw, 14px);
//           color: rgba(245,166,35,0.45);
//           letter-spacing: 0.22em;
//           font-style: italic;
//           animation: ldrFadeUp 0.6s ease-out 2.0s both;
//         }
//         .ldr-morya {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(10px, 2vw, 12px);
//           color: rgba(255,200,120,0.3);
//           letter-spacing: 0.22em;
//           font-style: italic;
//           animation: ldrFadeUp 0.6s ease-out 2.4s both;
//         }
//         .ldr-dot {
//           display: inline-block;
//           animation: ldrDotBlink 1.1s ease-in-out infinite;
//         }
//         .ldr-dot:nth-child(2) { animation-delay: 0.18s; }
//         .ldr-dot:nth-child(3) { animation-delay: 0.36s; }

//         .ldr-pulse-ring {
//           position: absolute;
//           border-radius: 50%;
//           border: 1px solid rgba(245,166,35,0.3);
//           animation: ldrPulseRing 2s ease-out infinite;
//         }
//       `}</style>

//       {/* Fixed dot grid */}
//       <div aria-hidden="true" style={{
//         position:"absolute", inset:0, pointerEvents:"none",
//         backgroundImage:"radial-gradient(circle, rgba(245,166,35,0.06) 1px, transparent 1px)",
//         backgroundSize:"46px 46px",
//       }} />

//       {/* Ambient center glow */}
//       <div aria-hidden="true" style={{
//         position:"absolute",
//         width:"400px", height:"400px",
//         top:"50%", left:"50%",
//         transform:"translate(-50%,-50%)",
//         background:"radial-gradient(ellipse, rgba(120,10,5,0.15) 0%, transparent 70%)",
//         filter:"blur(40px)",
//         pointerEvents:"none",
//       }} />

//       {/* ── Top year ornament ── */}
//       <div style={{
//         display:"flex", alignItems:"center", gap:"14px",
//         marginBottom:"6px",
//         animation:"ldrFadeUp 0.5s ease-out 0.2s both",
//       }}>
//         <div style={{ width:"50px", height:"1px", background:"linear-gradient(to right, transparent, rgba(245,166,35,0.35))" }} />
//         <span style={{
//           fontFamily:"'Cinzel Decorative', cursive",
//           fontSize:"10px",
//           letterSpacing:"0.3em",
//           color:"rgba(245,166,35,0.45)",
//         }}>
//           २०२६
//         </span>
//         <div style={{ width:"50px", height:"1px", background:"linear-gradient(to left, transparent, rgba(245,166,35,0.35))" }} />
//       </div>

//       {/* ── Mandala canvas + pulse rings ── */}
//       <div style={{ position:"relative", width:"220px", height:"220px", animation:"ldrFadeUp 0.6s ease-out 0.05s both" }}>
//         {/* Pulse rings behind canvas */}
//         <div className="ldr-pulse-ring" style={{ inset:"-10px", animationDelay:"0s" }} />
//         <div className="ldr-pulse-ring" style={{ inset:"-10px", animationDelay:"0.7s" }} />
//         <div className="ldr-pulse-ring" style={{ inset:"-10px", animationDelay:"1.4s" }} />
//         <canvas ref={canvasRef} style={{ width:"220px", height:"220px", display:"block" }} />
//       </div>

//       {/* ── Site name ── */}
//       <h1 className="ldr-name" style={{ marginTop:"5px" }}>
//         दुलहिनपुर<br />गणेश उत्सव
//       </h1>

//       {/* ── Puja samiti ── */}
//       <p className="ldr-puja" style={{ marginTop:"6px" }}>
//         पूजा समिति
//       </p>

//       {/* ── Ornament divider ── */}
//       <div style={{
//         display:"flex", alignItems:"center", gap:"10px",
//         margin:"14px 0 12px",
//         animation:"ldrFadeUp 0.5s ease-out 1.6s both",
//       }}>
//         <div style={{ width:"36px", height:"1px", background:"rgba(245,166,35,0.18)" }} />
//         <span style={{ color:"rgba(245,166,35,0.3)", fontSize:"11px" }}>❋</span>
//         <div style={{ width:"36px", height:"1px", background:"rgba(245,166,35,0.18)" }} />
//       </div>

//       {/* ── Progress bar ── */}
//       <div style={{
//         width:"130px",
//         animation:"ldrFadeUp 0.5s ease-out 1.9s both",
//       }}>
//         <div style={{
//           height:"2px",
//           background:"rgba(245,166,35,0.08)",
//           borderRadius:"2px",
//           overflow:"hidden",
//         }}>
//           <div style={{
//             height:"100%",
//             width:`${progress}%`,
//             background:"linear-gradient(90deg, #8B0000, #C0392B, #F5A623, #FFD700)",
//             borderRadius:"2px",
//             transition:"width 0.08s linear",
//             boxShadow:"0 0 10px rgba(245,166,35,0.55)",
//           }} />
//         </div>
//         <p style={{
//           fontFamily:"'Cormorant Garamond', serif",
//           color:"rgba(245,166,35,0.3)",
//           fontSize:"11px",
//           textAlign:"center",
//           marginTop:"5px",
//           letterSpacing:"0.08em",
//         }}>
//           {progress}%
//         </p>
//       </div>

//       {/* ── Loading text ── */}
//       <p className="ldr-bappa" style={{ marginTop:"8px" }}>
//         बप्पा आ रहे हैं
//         <span className="ldr-dot"> .</span>
//         <span className="ldr-dot">.</span>
//         <span className="ldr-dot">.</span>
//       </p>

//       {/* ── Bottom tagline ── */}
//       <p className="ldr-morya" style={{ marginTop:"8px" }}>
//         ॥ गणपति बाप्पा मोरया ॥
//       </p>
//     </div>
//   );
// } 


























// "use client";

// import { useEffect, useState, useRef } from "react";

// export default function Loader() {
//   const [phase, setPhase]       = useState<"visible" | "fading" | "done">("visible");
//   const [progress, setProgress] = useState(0);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef   = useRef<number>(0);

//   /* ══════════════════════════════
//      MANDALA CANVAS
//   ══════════════════════════════ */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const SIZE = 290;
//     canvas.width  = SIZE;
//     canvas.height = SIZE;
//     const cx = SIZE / 2;
//     const cy = SIZE / 2;
//     let t = 0;

//     const draw = () => {
//       t += 0.011;
//       ctx.clearRect(0, 0, SIZE, SIZE);

//       /* Ambient bg glow */
//       const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, SIZE / 2);
//       bg.addColorStop(0,   "rgba(160,25,10,0.22)");
//       bg.addColorStop(0.5, "rgba(90,8,5,0.1)");
//       bg.addColorStop(1,   "transparent");
//       ctx.fillStyle = bg;
//       ctx.beginPath();
//       ctx.arc(cx, cy, SIZE / 2, 0, Math.PI * 2);
//       ctx.fill();

//       /* ── Ring 1: 16 outer lotus petals CW ── */
//       const r1 = 118;
//       for (let i = 0; i < 16; i++) {
//         const angle = (i / 16) * Math.PI * 2 + t * 0.38;
//         const px = cx + Math.cos(angle) * r1;
//         const py = cy + Math.sin(angle) * r1;
//         const depth = 0.35 + 0.3 * (0.5 + 0.5 * Math.sin(angle + t));

//         ctx.save();
//         ctx.translate(px, py);
//         ctx.rotate(angle + Math.PI / 2);
//         ctx.beginPath();
//         ctx.ellipse(0, 0, 8, 18, 0, 0, Math.PI * 2);
//         const g1 = ctx.createLinearGradient(0, -18, 0, 18);
//         g1.addColorStop(0,   `rgba(255,200,50,${depth})`);
//         g1.addColorStop(0.4, `rgba(245,166,35,${depth * 0.85})`);
//         g1.addColorStop(1,   `rgba(180,40,10,${depth * 0.5})`);
//         ctx.fillStyle = g1;
//         ctx.fill();
//         /* Petal highlight */
//         ctx.beginPath();
//         ctx.ellipse(0, -4, 2.5, 8, 0, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,240,160,${depth * 0.4})`;
//         ctx.fill();
//         ctx.restore();
//       }

//       /* ── Ring 2: 10 gold dots CCW ── */
//       const r2 = 76;
//       for (let i = 0; i < 10; i++) {
//         const angle  = (i / 10) * Math.PI * 2 - t * 0.65;
//         const px     = cx + Math.cos(angle) * r2;
//         const py     = cy + Math.sin(angle) * r2;
//         const pulse  = 0.5 + 0.5 * Math.sin(t * 3.2 + i * 0.9);
//         const radius = 5.5 + pulse * 3.5;

//         /* Halo */
//         const gd = ctx.createRadialGradient(px, py, 0, px, py, radius * 2.5);
//         gd.addColorStop(0,   `rgba(255,220,80,${0.75 + pulse * 0.25})`);
//         gd.addColorStop(0.5, `rgba(245,166,35,${0.35 + pulse * 0.2})`);
//         gd.addColorStop(1,   "transparent");
//         ctx.fillStyle = gd;
//         ctx.beginPath();
//         ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
//         ctx.fill();

//         /* Core */
//         ctx.fillStyle = `rgba(255,240,120,${0.9 + pulse * 0.1})`;
//         ctx.beginPath();
//         ctx.arc(px, py, radius * 0.6, 0, Math.PI * 2);
//         ctx.fill();

//         /* 3D shadow */
//         ctx.fillStyle = `rgba(0,0,0,${0.3 + pulse * 0.15})`;
//         ctx.beginPath();
//         ctx.ellipse(px + 2.5, py + 2.5, radius * 0.55, radius * 0.32, Math.PI / 4, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       /* ── Inner pulsing circle ── */
//       const ip = 0.5 + 0.5 * Math.sin(t * 1.8);
//       const r3 = 37 + ip * 5;

//       const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, r3);
//       ig.addColorStop(0,   "rgba(110,10,18,0.98)");
//       ig.addColorStop(0.55,"rgba(65,5,12,0.92)");
//       ig.addColorStop(1,   "rgba(192,57,43,0.5)");
//       ctx.fillStyle = ig;
//       ctx.beginPath();
//       ctx.arc(cx, cy, r3, 0, Math.PI * 2);
//       ctx.fill();

//       /* Gold border */
//       ctx.strokeStyle = `rgba(255,200,60,${0.5 + ip * 0.45})`;
//       ctx.lineWidth = 1.8;
//       ctx.beginPath();
//       ctx.arc(cx, cy, r3, 0, Math.PI * 2);
//       ctx.stroke();

//       /* Dashed ring */
//       ctx.strokeStyle = `rgba(245,166,35,${0.18 + ip * 0.12})`;
//       ctx.lineWidth = 1;
//       ctx.setLineDash([4, 7]);
//       ctx.beginPath();
//       ctx.arc(cx, cy, r3 + 11, 0, Math.PI * 2);
//       ctx.stroke();
//       ctx.setLineDash([]);

//       /* ── OM with flame glow ── */
//       const fl = 0.55 + 0.45 * Math.sin(t * 4.2 + 0.4);
//       ctx.shadowColor = `rgba(255,160,20,${fl * 0.85})`;
//       ctx.shadowBlur  = 14 + fl * 18;
//       ctx.font        = "bold 30px serif";
//       ctx.textAlign   = "center";
//       ctx.textBaseline = "middle";

//       const og = ctx.createLinearGradient(cx, cy - 15, cx, cy + 15);
//       og.addColorStop(0,   "#FFF5C0");
//       og.addColorStop(0.5, "#FFD700");
//       og.addColorStop(1,   "#B8860B");
//       ctx.fillStyle = og;
//       ctx.fillText("ॐ", cx, cy + 1);
//       ctx.shadowBlur = 0;

//       /* Outer orbit ring */
//       ctx.strokeStyle = "rgba(245,166,35,0.1)";
//       ctx.lineWidth   = 1;
//       ctx.setLineDash([2, 12]);
//       ctx.beginPath();
//       ctx.arc(cx, cy, 130, 0, Math.PI * 2);
//       ctx.stroke();
//       ctx.setLineDash([]);

//       animRef.current = requestAnimationFrame(draw);
//     };

//     draw();
//     return () => cancelAnimationFrame(animRef.current);
//   }, []);

//   /* ══════════════════════════════
//      PROGRESS: 0→100 over 4.2s
//   ══════════════════════════════ */
//   useEffect(() => {
//     const start    = performance.now();
//     const duration = 4200;
//     const tick = (now: number) => {
//       const p     = Math.min((now - start) / duration, 1);
//       const eased = 1 - (1 - p) ** 2;
//       setProgress(Math.round(eased * 100));
//       if (p < 1) requestAnimationFrame(tick);
//     };
//     requestAnimationFrame(tick);
//   }, []);

//   /* ══════════════════════════════
//      PHASE TIMING — 4.5s total
//   ══════════════════════════════ */
//   useEffect(() => {
//     const t1 = setTimeout(() => setPhase("fading"), 3800); // start fade
//     const t2 = setTimeout(() => setPhase("done"),   4500); // unmount
//     return () => { clearTimeout(t1); clearTimeout(t2); };
//   }, []);

//   if (phase === "done") return null;

//   return (
//     <div
//       aria-label="Loading दुलहिनपुर गणेश उत्सव"
//       style={{
//         position:       "fixed",
//         inset:          0,
//         zIndex:         9999,
//         display:        "flex",
//         flexDirection:  "column",
//         alignItems:     "center",
//         justifyContent: "center",
//         background:     "#080106",
//         opacity:        phase === "fading" ? 0 : 1,
//         transition:     phase === "fading" ? "opacity 0.7s ease-out" : "none",
//         pointerEvents:  phase === "fading" ? "none" : "all",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');

//         @keyframes ldrUp {
//           from { opacity:0; transform:translateY(18px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         @keyframes ldrShimmer {
//           0%   { background-position: -350% center; }
//           100% { background-position:  350% center; }
//         }
//         @keyframes ldrBlink {
//           0%,100% { opacity:0.12; }
//           50%     { opacity:1; }
//         }
//         @keyframes ldrPulse {
//           0%   { transform:scale(1);    opacity:0.5; }
//           100% { transform:scale(1.4);  opacity:0; }
//         }
//         @keyframes ldrBorderGlow {
//           0%,100% { opacity:0.35; }
//           50%     { opacity:0.7; }
//         }

//         /* ── Main site name — ONE LINE ── */
//         .ldr-name {
//           font-family: 'Cinzel Decorative', cursive;
//           font-size: clamp(15px, 4vw, 21px);
//           letter-spacing: 0.06em;
//           text-align: center;
//           line-height: 1;
//           white-space: nowrap;
//           margin: 0;
//           padding: 0;
//           background: linear-gradient(
//             90deg,
//             #FFD700 0%, #FFD700 15%,
//             #FFFACD 32%, #FFF8A0 50%,
//             #FFFACD 68%, #FFD700 85%,
//             #FFD700 100%
//           );
//           background-size: 350% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           filter: drop-shadow(0 0 12px rgba(255,215,0,0.4));
//           animation:
//             ldrUp      0.7s ease-out 0.8s both,
//             ldrShimmer 3s  linear   1.3s infinite;
//         }

//         /* Puja samiti — same line feel, smaller */
//         .ldr-puja {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(13px, 3vw, 16px);
//           color: #F5A623;
//           letter-spacing: 0.25em;
//           text-align: center;
//           margin: 0;
//           font-style: italic;
//           font-weight: 600;
//           filter: drop-shadow(0 0 8px rgba(245,166,35,0.5));
//           animation: ldrUp 0.7s ease-out 1.1s both;
//         }

//         /* Sthaapna */
//         .ldr-sthaapna {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(10px, 2vw, 12px);
//           color: rgba(245,166,35,0.45);
//           letter-spacing: 0.3em;
//           text-align: center;
//           margin: 0;
//           animation: ldrUp 0.6s ease-out 1.5s both;
//         }

//         .ldr-bappa {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(12px, 2.5vw, 14px);
//           color: rgba(255,180,60,0.6);
//           letter-spacing: 0.22em;
//           font-style: italic;
//           animation: ldrUp 0.6s ease-out 2.2s both;
//         }
//         .ldr-morya {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(10px, 2vw, 11px);
//           color: rgba(255,200,120,0.32);
//           letter-spacing: 0.24em;
//           font-style: italic;
//           animation: ldrUp 0.5s ease-out 2.7s both;
//         }
//         .ldr-dot {
//           display: inline-block;
//           animation: ldrBlink 1.1s ease-in-out infinite;
//         }
//         .ldr-dot:nth-child(2) { animation-delay: 0.2s; }
//         .ldr-dot:nth-child(3) { animation-delay: 0.4s; }

//         .ldr-pulse {
//           position:absolute; border-radius:50%;
//           border:1px solid rgba(245,166,35,0.28);
//           animation: ldrPulse 2.2s ease-out infinite;
//         }

//         /* Decorative outer border frame */
//         .ldr-frame {
//           position:absolute; inset:20px;
//           border:1px solid rgba(245,166,35,0.0);
//           border-radius:4px;
//           animation: ldrBorderGlow 3s ease-in-out 0.5s infinite;
//           pointer-events:none;
//         }
//         .ldr-frame::before, .ldr-frame::after {
//           content:"";
//           position:absolute;
//           width:18px; height:18px;
//           border-color: rgba(245,166,35,0.5);
//           border-style: solid;
//         }
//         .ldr-frame::before {
//           top:-1px; left:-1px;
//           border-width: 1.5px 0 0 1.5px;
//         }
//         .ldr-frame::after {
//           bottom:-1px; right:-1px;
//           border-width: 0 1.5px 1.5px 0;
//         }
//       `}</style>

//       {/* Dot grid */}
//       <div aria-hidden="true" style={{
//         position:"absolute", inset:0, pointerEvents:"none",
//         backgroundImage:"radial-gradient(circle, rgba(245,166,35,0.055) 1px, transparent 1px)",
//         backgroundSize:"48px 48px",
//       }} />

//       {/* Center ambient glow */}
//       <div aria-hidden="true" style={{
//         position:"absolute",
//         width:"450px", height:"450px",
//         top:"50%", left:"50%",
//         transform:"translate(-50%,-50%)",
//         background:"radial-gradient(ellipse, rgba(130,15,5,0.18) 0%, transparent 68%)",
//         filter:"blur(50px)",
//         pointerEvents:"none",
//       }} />

//       {/* Decorative corner frame */}
//       <div className="ldr-frame" />
//       {/* Extra corners — top-right & bottom-left */}
//       <div aria-hidden="true" style={{
//         position:"absolute", top:"19px", right:"19px",
//         width:"18px", height:"18px",
//         borderTop:"1.5px solid rgba(245,166,35,0.5)",
//         borderRight:"1.5px solid rgba(245,166,35,0.5)",
//         animation:"ldrBorderGlow 3s ease-in-out 0.5s infinite",
//       }} />
//       <div aria-hidden="true" style={{
//         position:"absolute", bottom:"19px", left:"19px",
//         width:"18px", height:"18px",
//         borderBottom:"1.5px solid rgba(245,166,35,0.5)",
//         borderLeft:"1.5px solid rgba(245,166,35,0.5)",
//         animation:"ldrBorderGlow 3s ease-in-out 0.5s infinite",
//       }} />

//       {/* Year ornament */}
//       {/* <div style={{
//         display:"flex", alignItems:"center", gap:"14px",
//         marginBottom:"4px",
//         animation:"ldrUp 0.5s ease-out 0.2s both",
//       }}>
//         <div style={{ width:"55px", height:"1px", background:"linear-gradient(to right, transparent, rgba(255, 166, 22, 0.88))" }} />
//         <span style={{
//           fontFamily:"'Cinzel Decorative', cursive",
//           fontSize:"9px",
//           letterSpacing:"0.35em",
//           color:"rgba(255,200,80,0.55)",
//         }}>
       
//         </span>
//         <div style={{ width:"55px", height:"1px", background:"linear-gradient(to left, transparent, rgba(245,166,35,0.4))" }} />
//       </div> */}

//       {/* Mandala + pulse rings */}
//       <div style={{
//         position:"relative",
//         width:"240px", height:"240px",
//         animation:"ldrUp 0.6s ease-out 0.05s both",
//         marginBottom:"-4px",
//       }}>
//         <div className="ldr-pulse" style={{ inset:"-8px",  animationDelay:"0s" }} />
//         <div className="ldr-pulse" style={{ inset:"-8px",  animationDelay:"0.75s" }} />
//         <div className="ldr-pulse" style={{ inset:"-8px",  animationDelay:"1.5s" }} />
//         <canvas ref={canvasRef} style={{ width:"240px", height:"240px", display:"block" }} />
//       </div>

//       {/* ── SITE NAME — ONE LINE ── */}
//       <h1 className="ldr-name mt-5">
//         दुलहिनपुर गणेश उत्सव
//       </h1>

//       {/* ── PUJA SAMITI — one line below ── */}
//       <p className="ldr-puja" style={{ marginTop:"5px" }}>
//         पूजा समिति
//       </p>

//       {/* Sthaapna line */}
//       {/* <p className="ldr-sthaapna" style={{ marginTop:"3px" }}>
//         रामगंज बाज़ार · अमेठी
//       </p> */}

//       {/* Ornament divider */}
//       <div style={{
//         display:"flex", alignItems:"center", gap:"10px",
//         margin:"13px 0 10px",
//         animation:"ldrUp 0.5s ease-out 1.7s both",
//       }}>
//         <div style={{ width:"32px", height:"1px", background:"rgba(245,166,35,0.2)" }} />
//         <span style={{ color:"rgba(245,166,35,0.4)", fontSize:"10px" }}>❋</span>
//         <div style={{ width:"32px", height:"1px", background:"rgba(245,166,35,0.2)" }} />
//       </div>

//       {/* Progress bar */}
//       <div style={{
//         width:"140px",
//         animation:"ldrUp 0.5s ease-out 2.0s both",
//       }}>
//         <div style={{
//           height:"2px",
//           background:"rgba(245,166,35,0.08)",
//           borderRadius:"2px",
//           overflow:"hidden",
//         }}>
//           <div style={{
//             height:"100%",
//             width:`${progress}%`,
//             background:"linear-gradient(90deg, #8B0000, #C0392B 30%, #F5A623 70%, #FFD700)",
//             borderRadius:"2px",
//             transition:"width 0.08s linear",
//             boxShadow:"0 0 12px rgba(255,200,50,0.65)",
//           }} />
//         </div>
//         <p style={{
//           fontFamily:"'Cormorant Garamond', serif",
//           color:"rgba(255,200,80,0.38)",
//           fontSize:"11px",
//           textAlign:"center",
//           marginTop:"5px",
//           letterSpacing:"0.08em",
//         }}>
//           {progress}%
//         </p>
//       </div>

  

//       {/* Bottom tagline */}
//       <p className="ldr-morya" style={{ marginTop:"7px" }}>
//         ॥ गणपति बाप्पा मोरया ॥
//       </p>
//     </div>
//   );
// }









"use client";

import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const [phase, setPhase]       = useState<"visible" | "fading" | "done">("visible");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  /* ══════════════════════════════
     MANDALA CANVAS (Optmized)
  ══════════════════════════════ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 290;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    let t = 0;

    const draw = () => {
      t += 0.011;
      ctx.clearRect(0, 0, SIZE, SIZE);

      /* Ambient bg glow */
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, SIZE / 2);
      bg.addColorStop(0,   "rgba(160,25,10,0.22)");
      bg.addColorStop(0.5, "rgba(90,8,5,0.1)");
      bg.addColorStop(1,   "transparent");
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(cx, cy, SIZE / 2, 0, Math.PI * 2);
      ctx.fill();

      /* Ring 1: 16 outer lotus petals CW */
      const r1 = 118;
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + t * 0.38;
        const px = cx + Math.cos(angle) * r1;
        const py = cy + Math.sin(angle) * r1;
        const depth = 0.35 + 0.3 * (0.5 + 0.5 * Math.sin(angle + t));

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle + Math.PI / 2);
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 18, 0, 0, Math.PI * 2);
        const g1 = ctx.createLinearGradient(0, -18, 0, 18);
        g1.addColorStop(0,   `rgba(255,200,50,${depth})`);
        g1.addColorStop(0.4, `rgba(245,166,35,${depth * 0.85})`);
        g1.addColorStop(1,   `rgba(180,40,10,${depth * 0.5})`);
        ctx.fillStyle = g1;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, -4, 2.5, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,160,${depth * 0.4})`;
        ctx.fill();
        ctx.restore();
      }

      /* Ring 2: 10 gold dots CCW */
      const r2 = 76;
      for (let i = 0; i < 10; i++) {
        const angle  = (i / 10) * Math.PI * 2 - t * 0.65;
        const px     = cx + Math.cos(angle) * r2;
        const py     = cy + Math.sin(angle) * r2;
        const pulse  = 0.5 + 0.5 * Math.sin(t * 3.2 + i * 0.9);
        const radius = 5.5 + pulse * 3.5;

        const gd = ctx.createRadialGradient(px, py, 0, px, py, radius * 2.5);
        gd.addColorStop(0,   `rgba(255,220,80,${0.75 + pulse * 0.25})`);
        gd.addColorStop(0.5, `rgba(245,166,35,${0.35 + pulse * 0.2})`);
        gd.addColorStop(1,   "transparent");
        ctx.fillStyle = gd;
        ctx.beginPath();
        ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,240,120,${0.9 + pulse * 0.1})`;
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Inner pulsing circle */
      const ip = 0.5 + 0.5 * Math.sin(t * 1.8);
      const r3 = 37 + ip * 5;

      const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, r3);
      ig.addColorStop(0,   "rgba(110,10,18,0.98)");
      ig.addColorStop(0.55,"rgba(65,5,12,0.92)");
      ig.addColorStop(1,   "rgba(192,57,43,0.5)");
      ctx.fillStyle = ig;
      ctx.beginPath();
      ctx.arc(cx, cy, r3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(255,200,60,${0.5 + ip * 0.45})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r3, 0, Math.PI * 2);
      ctx.stroke();

      /* OM with flame glow */
      const fl = 0.55 + 0.45 * Math.sin(t * 4.2 + 0.4);
      ctx.shadowColor = `rgba(255,160,20,${fl * 0.85})`;
      ctx.shadowBlur  = 14 + fl * 18;
      ctx.font        = "bold 30px serif";
      ctx.textAlign   = "center";
      ctx.textBaseline = "middle";

      const og = ctx.createLinearGradient(cx, cy - 15, cx, cy + 15);
      og.addColorStop(0,   "#FFF5C0");
      og.addColorStop(0.5, "#FFD700");
      og.addColorStop(1,   "#B8860B");
      ctx.fillStyle = og;
      ctx.fillText("ॐ", cx, cy + 1);
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  /* ══════════════════════════════
     PROGRESS: 0→100 over 4.2s
  ══════════════════════════════ */
  useEffect(() => {
    const start    = performance.now();
    const duration = 4200;
    const tick = (now: number) => {
      const p     = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - p) ** 2;
      setProgress(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* ══════════════════════════════
     PHASE TIMING — 4.5s total
  ══════════════════════════════ */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 3800);
    const t2 = setTimeout(() => setPhase("done"),   4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-label="Loading दुलहिनपुर गणेश उत्सव"
      style={{
        position:       "fixed",
        top:            0,
        left:           0,
        /* 🚀 FIX 1: '100vw' और '100vh' सुनिश्चित करेगा कि बॉर्डर कभी पिचक कर बीच में न आए */
        width:          "100vw",
        height:         "100vh",
        minHeight:      "100dvh",
        zIndex:         9999,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#080106",
        opacity:        phase === "fading" ? 0 : 1,
        transition:     phase === "fading" ? "opacity 0.7s ease-out" : "none",
        pointerEvents:  phase === "fading" ? "none" : "all",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        /* 🚀 FIX 2: गिरने (falling) की जगह स्मूथ ब्लूम इफ़ेक्ट (Smooth Bloom) */
        @keyframes ldrBloom {
          0%   { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes ldrShimmer {
          0%   { background-position: -350% center; }
          100% { background-position:  350% center; }
        }
        @keyframes ldrPulse {
          0%   { transform:scale(1);    opacity:0.5; }
          100% { transform:scale(1.4);  opacity:0; }
        }

        /* 🚀 FIX 3: 4 अलग-अलग कोने जो हमेशा स्क्रीन के किनारों पर चिपके रहेंगे */
        .ldr-corner {
          position: absolute;
          width: 28px; height: 28px;
          border-color: rgba(245,166,35,0.4);
          border-style: solid;
          animation: ldrBorderGlow 3s ease-in-out infinite;
          pointer-events: none;
        }
        .ldr-tl { top: 20px; left: 20px; border-width: 1.5px 0 0 1.5px; border-top-left-radius: 6px; }
        .ldr-tr { top: 20px; right: 20px; border-width: 1.5px 1.5px 0 0; border-top-right-radius: 6px; }
        .ldr-bl { bottom: 20px; left: 20px; border-width: 0 0 1.5px 1.5px; border-bottom-left-radius: 6px; }
        .ldr-br { bottom: 20px; right: 20px; border-width: 0 1.5px 1.5px 0; border-bottom-right-radius: 6px; }

        @keyframes ldrBorderGlow {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.9; box-shadow: 0 0 15px rgba(245,166,35,0.15); }
        }

        /* 🚀 FIX 4: एक मास्टर रैपर जो सब कुछ एक साथ स्मूथली सामने लाएगा */
        .ldr-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          /* बॉर्डर आने के ठीक 0.05s बाद यह सब कुछ एक साथ प्यार से उभार देगा */
          animation: ldrBloom 1.2s ease-out 0.05s both; 
          will-change: transform, opacity;
        }

        .ldr-name {
          font-family: 'Cinzel Decorative', cursive;
          font-size: clamp(15px, 4vw, 21px);
          letter-spacing: 0.06em;
          text-align: center;
        
          line-height: 1.5;
          padding-top: 8px;
          padding-bottom: 4px;
          white-space: nowrap;
          margin: 0;
          padding: 0;
          background: linear-gradient(90deg, #FFD700 0%, #FFD700 15%, #FFFACD 32%, #FFF8A0 50%, #FFFACD 68%, #FFD700 85%, #FFD700 100%);
          background-size: 350% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 12px rgba(255,215,0,0.4));
          animation: ldrShimmer 3s linear 1s infinite;
        }
      `}</style>

      {/* Dot grid (Appears immediately) */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(circle, rgba(245,166,35,0.055) 1px, transparent 1px)",
        backgroundSize:"48px 48px",
      }} />

      {/* Center ambient glow (Appears immediately) */}
      <div aria-hidden="true" style={{
        position:"absolute", width:"450px", height:"450px", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        background:"radial-gradient(ellipse, rgba(130,15,5,0.18) 0%, transparent 68%)", filter:"blur(50px)", pointerEvents:"none",
      }} />

      {/* 🚀 The 4 Fixed Corners (Never overlap text) */}
      <div className="ldr-corner ldr-tl" />
      <div className="ldr-corner ldr-tr" />
      <div className="ldr-corner ldr-bl" />
      <div className="ldr-corner ldr-br" />

      {/* 🚀 ALL CONTENT WRAPPED HERE TO BLOOM TOGETHER AFTER 0.05s */}
      <div className="ldr-content-wrapper">
        
        {/* Mandala + pulse rings */}
        {/* <div style={{ position:"relative", width:"240px", height:"240px", marginBottom:"-4px" }}>
          <div className="ldr-pulse" style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:"1px solid rgba(245,166,35,0.28)", animationDelay:"0s" }} />
          <div className="ldr-pulse" style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:"1px solid rgba(245,166,35,0.28)", animationDelay:"0.75s" }} />
          <div className="ldr-pulse" style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:"1px solid rgba(245,166,35,0.28)", animationDelay:"1.5s" }} />
          <canvas ref={canvasRef} style={{ width:"240px", height:"240px", display:"block" }} />
        </div>

      
        <h1 className="ldr-name mt-5">
          दुलहिनपुर गणेश उत्सव
        </h1>

    
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 16px)", color: "#F5A623",
          letterSpacing: "0.25em", textAlign: "center", margin: "5px 0 0 0", fontStyle: "italic", fontWeight: 600,
          filter: "drop-shadow(0 0 8px rgba(245,166,35,0.5))"
        }}>
          पूजा समिति
        </p> */}


        {/* Mandala + pulse rings */}
        {/* 🚀 FIX: marginBottom को "-4px" से हटाकर "24px" कर दिया गया है ताकि पर्याप्त जगह (Gap) रहे */}
        <div style={{ position:"relative", width:"240px", height:"240px", marginBottom:"24px" }}>
          <div className="ldr-pulse" style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:"1px solid rgba(245,166,35,0.28)", animationDelay:"0s" }} />
          <div className="ldr-pulse" style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:"1px solid rgba(245,166,35,0.28)", animationDelay:"0.75s" }} />
          <div className="ldr-pulse" style={{ position:"absolute", inset:"-8px", borderRadius:"50%", border:"1px solid rgba(245,166,35,0.28)", animationDelay:"1.5s" }} />
          <canvas ref={canvasRef} style={{ width:"240px", height:"240px", display:"block" }} />
        </div>

        {/* SITE NAME */}
        {/* 🚀 FIX: z-index: 10 जोड़ा गया है ताकि यह टेक्स्ट किसी भी ग्लो या रिंग के पीछे न छिपे */}
        <h1 className="ldr-name" style={{ marginTop: "8px", position: "relative", zIndex: 10 }}>
          दुलहिनपुर गणेश उत्सव
        </h1>

        {/* PUJA SAMITI */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 16px)", color: "#F5A623",
          letterSpacing: "0.25em", textAlign: "center", margin: "5px 0 0 0", fontStyle: "italic", fontWeight: 600,
          filter: "drop-shadow(0 0 8px rgba(245,166,35,0.5))"
        }}>
          पूजा समिति
        </p>

        {/* Ornament divider */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", margin:"13px 0 10px" }}>
          <div style={{ width:"32px", height:"1px", background:"rgba(245,166,35,0.2)" }} />
          <span style={{ color:"rgba(245,166,35,0.4)", fontSize:"10px" }}>❋</span>
          <div style={{ width:"32px", height:"1px", background:"rgba(245,166,35,0.2)" }} />
        </div>

        {/* Progress bar */}
        <div style={{ width:"140px" }}>
          <div style={{ height:"2px", background:"rgba(245,166,35,0.08)", borderRadius:"2px", overflow:"hidden" }}>
            <div style={{
              height:"100%", width:`${progress}%`,
              background:"linear-gradient(90deg, #8B0000, #C0392B 30%, #F5A623 70%, #FFD700)",
              borderRadius:"2px", transition:"width 0.08s linear", boxShadow:"0 0 12px rgba(255,200,50,0.65)",
            }} />
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", color:"rgba(255,200,80,0.38)", fontSize:"11px", textAlign:"center", marginTop:"5px", letterSpacing:"0.08em" }}>
            {progress}%
          </p>
        </div>

        {/* Bottom tagline */}
        <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(10px, 2vw, 11px)", color:"rgba(255,200,120,0.32)", letterSpacing:"0.24em", fontStyle:"italic", marginTop:"7px", marginBottom: 0 }}>
          ॥ गणपति बाप्पा मोरया ॥
        </p>

      </div>
    </div>
  );
}