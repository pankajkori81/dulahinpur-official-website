
"use client";

import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const [phase, setPhase]       = useState<"visible" | "fading" | "done">("visible");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  /* ── Mandala canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 260;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    let t = 0;

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, SIZE, SIZE);

      /* ── Outer ambient glow bg ── */
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, SIZE / 2);
      bg.addColorStop(0,   "rgba(140,20,10,0.18)");
      bg.addColorStop(0.5, "rgba(80,5,5,0.08)");
      bg.addColorStop(1,   "transparent");
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(cx, cy, SIZE / 2, 0, Math.PI * 2);
      ctx.fill();

      /* ── Ring 1: 16 outer lotus petals (slow CW) ── */
      const r1 = 105;
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + t * 0.4;
        const px = cx + Math.cos(angle) * r1;
        const py = cy + Math.sin(angle) * r1;
        const depth = 0.28 + 0.22 * (0.5 + 0.5 * Math.sin(angle));

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle + Math.PI / 2);
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 16, 0, 0, Math.PI * 2);

        const g1 = ctx.createLinearGradient(0, -16, 0, 16);
        g1.addColorStop(0,   `rgba(245,166,35,${depth * 0.9})`);
        g1.addColorStop(0.5, `rgba(255,215,0,${depth * 0.7})`);
        g1.addColorStop(1,   `rgba(192,57,43,${depth * 0.4})`);
        ctx.fillStyle = g1;
        ctx.fill();
        ctx.restore();
      }

      /* ── Ring 2: 10 middle dots (faster CCW) ── */
      const r2 = 70;
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 - t * 0.7;
        const px = cx + Math.cos(angle) * r2;
        const py = cy + Math.sin(angle) * r2;
        const pulse = 0.5 + 0.5 * Math.sin(t * 3 + i * 0.8);
        const radius = 5 + pulse * 3;

        /* Glow halo */
        const gd = ctx.createRadialGradient(px, py, 0, px, py, radius * 2);
        gd.addColorStop(0,   `rgba(255,215,0,${0.7 + pulse * 0.3})`);
        gd.addColorStop(0.4, `rgba(245,166,35,${0.4 + pulse * 0.2})`);
        gd.addColorStop(1,   "transparent");
        ctx.fillStyle = gd;
        ctx.beginPath();
        ctx.arc(px, py, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        /* Solid core */
        ctx.fillStyle = `rgba(255,230,100,${0.8 + pulse * 0.2})`;
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.55, 0, Math.PI * 2);
        ctx.fill();

        /* Drop shadow */
        ctx.fillStyle = `rgba(0,0,0,${0.25 + pulse * 0.15})`;
        ctx.beginPath();
        ctx.ellipse(px + 2, py + 2, radius * 0.5, radius * 0.3, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── Ring 3: Pulsing inner circle ── */
      const innerPulse = 0.5 + 0.5 * Math.sin(t * 2);
      const r3 = 34 + innerPulse * 4;

      const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, r3);
      ig.addColorStop(0,   "rgba(100,8,16,0.95)");
      ig.addColorStop(0.6, "rgba(60,4,10,0.9)");
      ig.addColorStop(1,   "rgba(192,57,43,0.4)");
      ctx.fillStyle = ig;
      ctx.beginPath();
      ctx.arc(cx, cy, r3, 0, Math.PI * 2);
      ctx.fill();

      /* Gold border */
      ctx.strokeStyle = `rgba(245,166,35,${0.4 + innerPulse * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r3, 0, Math.PI * 2);
      ctx.stroke();

      /* Dashed second ring */
      ctx.strokeStyle = `rgba(245,166,35,${0.15 + innerPulse * 0.1})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, r3 + 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      /* ── Center OM with flame glow ── */
      const flameGlow = 0.6 + 0.4 * Math.sin(t * 4 + 0.3);
      ctx.shadowColor = `rgba(255,150,0,${flameGlow * 0.8})`;
      ctx.shadowBlur  = 12 + flameGlow * 14;
      ctx.font        = "bold 28px serif";
      ctx.textAlign   = "center";
      ctx.textBaseline = "middle";

      const omGrad = ctx.createLinearGradient(cx, cy - 14, cx, cy + 14);
      omGrad.addColorStop(0,   "#FFF0B3");
      omGrad.addColorStop(0.5, "#d4af37");
      omGrad.addColorStop(1,   "#997A00");
      ctx.fillStyle = omGrad;
      ctx.fillText("ॐ", cx, cy + 1);
      ctx.shadowBlur = 0;

      /* ── Outer orbit dashes ── */
      ctx.strokeStyle = "rgba(245,166,35,0.1)";
      ctx.lineWidth   = 1;
      ctx.setLineDash([2, 10]);
      ctx.beginPath();
      ctx.arc(cx, cy, 118, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  /* ── Progress 0 → 100 over 3.2s with ease-out ── */
  useEffect(() => {
    const start    = performance.now();
    const duration = 3200;

    const tick = (now: number) => {
      const p     = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - p) ** 2;
      setProgress(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* ── Phase: visible → fading → done ── */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 3400);
    const t2 = setTimeout(() => setPhase("done"),   4050);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-label="Loading दुलहिनपुर गणेश उत्सव"
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#080106",
        opacity:        phase === "fading" ? 0 : 1,
        transition:     phase === "fading" ? "opacity 0.65s ease-out" : "none",
        pointerEvents:  phase === "fading" ? "none" : "all",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');

        @keyframes ldrFadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ldrShimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes ldrDotBlink {
          0%,100% { opacity:0.15; }
          50%     { opacity:1;    }
        }
        @keyframes ldrPulseRing {
          0%   { transform:scale(1);    opacity:0.5; }
          100% { transform:scale(1.35); opacity:0;   }
        }

        .ldr-name {
          font-family: 'Cinzel Decorative', cursive;
          font-size: clamp(18px, 4.5vw, 26px);
          letter-spacing: 0.05em;
          text-align: center;
          
          line-height: 1.5;
           padding-top: 8px;
           padding-bottom: 4px;
          background: linear-gradient(
            90deg,
            #d4af37 0%, #d4af37 20%,
            #FFF8DC 38%, #FFD700 50%,
            #FFF8DC 62%, #d4af37 80%,
            #d4af37 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation:
            ldrFadeUp  0.7s ease-out 0.7s both,
            ldrShimmer 2.8s linear   1.2s infinite;
        }
        .ldr-puja {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(12px, 2.8vw, 15px);
          color: rgba(245,166,35,0.5);
          letter-spacing: 0.18em;
          text-align: center;
          animation: ldrFadeUp 0.7s ease-out 1.2s both;
        }
        .ldr-bappa {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px, 2.5vw, 14px);
          color: rgba(245,166,35,0.45);
          letter-spacing: 0.22em;
          font-style: italic;
          animation: ldrFadeUp 0.6s ease-out 2.0s both;
        }
        .ldr-morya {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10px, 2vw, 12px);
          color: rgba(255,200,120,0.3);
          letter-spacing: 0.22em;
          font-style: italic;
          animation: ldrFadeUp 0.6s ease-out 2.4s both;
        }
        .ldr-dot {
          display: inline-block;
          animation: ldrDotBlink 1.1s ease-in-out infinite;
        }
        .ldr-dot:nth-child(2) { animation-delay: 0.18s; }
        .ldr-dot:nth-child(3) { animation-delay: 0.36s; }

        .ldr-pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(245,166,35,0.3);
          animation: ldrPulseRing 2s ease-out infinite;
        }
      `}</style>

      {/* Fixed dot grid */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(circle, rgba(245,166,35,0.06) 1px, transparent 1px)",
        backgroundSize:"46px 46px",
      }} />

      {/* Ambient center glow */}
      <div aria-hidden="true" style={{
        position:"absolute",
        width:"400px", height:"400px",
        top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        background:"radial-gradient(ellipse, rgba(120,10,5,0.15) 0%, transparent 70%)",
        filter:"blur(10px)",
        pointerEvents:"none",
      }} />

      {/* ── Top year ornament ── */}


      {/* ── Mandala canvas + pulse rings ── */}
      <div style={{ position:"relative", width:"220px", height:"220px", animation:"ldrFadeUp 0.6s ease-out 0.05s both" }}>
        {/* Pulse rings behind canvas */}
        <div className="ldr-pulse-ring" style={{ inset:"-10px", animationDelay:"0s" }} />
        <div className="ldr-pulse-ring" style={{ inset:"-10px", animationDelay:"0.7s" }} />
        <div className="ldr-pulse-ring" style={{ inset:"-10px", animationDelay:"1.4s" }} />
        <canvas ref={canvasRef} style={{ width:"220px", height:"220px", display:"block" }} />
      </div>

           {/* SITE NAME */}
         {/* 🚀 FIX: z-index: 10 जोड़ा गया है ताकि यह टेक्स्ट किसी भी ग्लो या रिंग के पीछे न छिपे */}
         <h1 className="ldr-name" style={{ marginTop: "10px", position: "relative", zIndex: 10  }}>
           दुलहिनपुर गणेश उत्सव
         </h1>

         {/* PUJA SAMITI */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 16px)", color: "#F5A623",
          letterSpacing: "0.05em", textAlign: "center", margin: "5px 0 0 0", fontWeight: 600,
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
              borderRadius:"2px", transition:"width 0.08s linear", boxShadow:"0 0 10px rgba(255,200,50,0.65)",
            }} />
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", color:"rgba(253, 180, 21, 0.89)", fontSize:"14px", textAlign:"center", marginTop:"5px", letterSpacing:"0.08em" }}>
            {progress}%
          </p>
        </div>

        {/* Bottom tagline */}
        <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(10px, 2vw, 11px)", color:"rgba(255,200,120,0.32)", letterSpacing:"0.05em",  marginTop:"7px", marginBottom: 0 }}>
          ॥ गणपति बाप्पा मोरया ॥
        </p>

    
    </div>
  );
}