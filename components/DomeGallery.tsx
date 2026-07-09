// 'use client';

// import { useEffect, useMemo, useRef, useCallback } from 'react';
// import { useGesture } from '@use-gesture/react';
// import Image from 'next/image'; // 🚀 Next.js Image Optimization added

// type ImageItem = string | { src: string; alt?: string };

// type DomeGalleryProps = {
//   images?: ImageItem[];
//   fit?: number;
//   fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
//   minRadius?: number;
//   maxRadius?: number;
//   padFactor?: number;
//   overlayBlurColor?: string;
//   maxVerticalRotationDeg?: number;
//   dragSensitivity?: number;
//   enlargeTransitionMs?: number;
//   segments?: number;
//   dragDampening?: number;
//   openedImageWidth?: string;
//   openedImageHeight?: string;
//   imageBorderRadius?: string;
//   openedImageBorderRadius?: string;
//   grayscale?: boolean;
// };

// type ItemDef = {
//   src: string;
//   alt: string;
//   x: number;
//   y: number;
//   sizeX: number;
//   sizeY: number;
// };

// const DEFAULTS = {
//   maxVerticalRotationDeg: 5,
//   dragSensitivity: 20,
//   enlargeTransitionMs: 300,
//   segments: 35
// };

// const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
// const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
// const wrapAngleSigned = (deg: number) => {
//   const a = (((deg + 180) % 360) + 360) % 360;
//   return a - 180;
// };
// const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
//   const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
//   const n = attr == null ? NaN : parseFloat(attr);
//   return Number.isFinite(n) ? n : fallback;
// };

// function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
//   const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
//   const evenYs = [-4, -2, 0, 2, 4];
//   const oddYs = [-3, -1, 1, 3, 5];

//   const coords = xCols.flatMap((x, c) => {
//     const ys = c % 2 === 0 ? evenYs : oddYs;
//     return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
//   });

//   const totalSlots = coords.length;
//   if (pool.length === 0) {
//     return coords.map(c => ({ ...c, src: '', alt: '' }));
//   }

//   const normalizedImages = pool.map(image => {
//     if (typeof image === 'string') {
//       return { src: image, alt: '' };
//     }
//     return { src: image.src || '', alt: image.alt || '' };
//   });

//   const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

//   for (let i = 1; i < usedImages.length; i++) {
//     if (usedImages[i].src === usedImages[i - 1].src) {
//       for (let j = i + 1; j < usedImages.length; j++) {
//         if (usedImages[j].src !== usedImages[i].src) {
//           const tmp = usedImages[i];
//           usedImages[i] = usedImages[j];
//           usedImages[j] = tmp;
//           break;
//         }
//       }
//     }
//   }

//   return coords.map((c, i) => ({
//     ...c,
//     src: usedImages[i].src,
//     alt: usedImages[i].alt
//   }));
// }

// function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
//   const unit = 360 / segments / 2;
//   const rotateY = unit * (offsetX + (sizeX - 1) / 2);
//   const rotateX = unit * (offsetY - (sizeY - 1) / 2);
//   return { rotateX, rotateY };
// }

// export default function DomeGallery({
//   images = [],
//   fit = 0.5,
//   fitBasis = 'auto',
//   minRadius = 600,
//   maxRadius = Infinity,
//   padFactor = 0.25,
//   overlayBlurColor = '#080202', // 🚀 Defaulted to your website's background
//   maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
//   dragSensitivity = DEFAULTS.dragSensitivity,
//   enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
//   segments = DEFAULTS.segments,
//   dragDampening = 2,
//   openedImageWidth = '400px',
//   openedImageHeight = '400px',
//   imageBorderRadius = '30px',
//   openedImageBorderRadius = '30px',
//   grayscale = false // 🚀 Defaulted to false for colorful festive images
// }: DomeGalleryProps) {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const mainRef = useRef<HTMLDivElement>(null);
//   const sphereRef = useRef<HTMLDivElement>(null);
//   const frameRef = useRef<HTMLDivElement>(null);
//   const viewerRef = useRef<HTMLDivElement>(null);
//   const scrimRef = useRef<HTMLDivElement>(null);
//   const focusedElRef = useRef<HTMLElement | null>(null);
//   const originalTilePositionRef = useRef<{ left: number; top: number; width: number; height: number; } | null>(null);

//   const rotationRef = useRef({ x: 0, y: 0 });
//   const startRotRef = useRef({ x: 0, y: 0 });
//   const startPosRef = useRef<{ x: number; y: number } | null>(null);
//   const draggingRef = useRef(false);
//   const cancelTapRef = useRef(false);
//   const movedRef = useRef(false);
//   const inertiaRAF = useRef<number | null>(null);
//   const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');
//   const tapTargetRef = useRef<HTMLElement | null>(null);
//   const openingRef = useRef(false);
//   const openStartedAtRef = useRef(0);
//   const lastDragEndAt = useRef(0);
//   const scrollLockedRef = useRef(false);

//   const lockScroll = useCallback(() => {
//     if (scrollLockedRef.current) return;
//     scrollLockedRef.current = true;
//     document.body.style.overflow = 'hidden';
//   }, []);
//   const unlockScroll = useCallback(() => {
//     if (!scrollLockedRef.current) return;
//     if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
//     scrollLockedRef.current = false;
//     document.body.style.overflow = '';
//   }, []);

//   const items = useMemo(() => buildItems(images, segments), [images, segments]);

//   const applyTransform = (xDeg: number, yDeg: number) => {
//     const el = sphereRef.current;
//     if (el) {
//       el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
//     }
//   };

//   const lockedRadiusRef = useRef<number | null>(null);

//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return;
//     const ro = new ResizeObserver(entries => {
//       const cr = entries[0].contentRect;
//       const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
//       const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
//       let basis: number;
//       switch (fitBasis) {
//         case 'min': basis = minDim; break;
//         case 'max': basis = maxDim; break;
//         case 'width': basis = w; break;
//         case 'height': basis = h; break;
//         default: basis = aspect >= 1.3 ? w : minDim;
//       }
//       let radius = basis * fit;
//       radius = Math.min(radius, h * 1.35);
//       radius = clamp(radius, minRadius, maxRadius);
//       lockedRadiusRef.current = Math.round(radius);

//       root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
//       root.style.setProperty('--viewer-pad', `${Math.max(8, Math.round(minDim * padFactor))}px`);
//       root.style.setProperty('--overlay-blur-color', overlayBlurColor);
//       root.style.setProperty('--tile-radius', imageBorderRadius);
//       root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
//       root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
//       applyTransform(rotationRef.current.x, rotationRef.current.y);
//     });
//     ro.observe(root);
//     return () => ro.disconnect();
//   }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius, openedImageWidth, openedImageHeight]);

//   useEffect(() => {
//     applyTransform(rotationRef.current.x, rotationRef.current.y);
//   }, []);

//   const stopInertia = useCallback(() => {
//     if (inertiaRAF.current) {
//       cancelAnimationFrame(inertiaRAF.current);
//       inertiaRAF.current = null;
//     }
//   }, []);

//   const startInertia = useCallback((vx: number, vy: number) => {
//       const MAX_V = 1.4;
//       let vX = clamp(vx, -MAX_V, MAX_V) * 80;
//       let vY = clamp(vy, -MAX_V, MAX_V) * 80;
//       let frames = 0;
//       const d = clamp(dragDampening ?? 0.6, 0, 1);
//       const frictionMul = 0.94 + 0.055 * d;
//       const stopThreshold = 0.015 - 0.01 * d;
//       const maxFrames = Math.round(90 + 270 * d);
//       const step = () => {
//         vX *= frictionMul;
//         vY *= frictionMul;
//         if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
//           inertiaRAF.current = null;
//           return;
//         }
//         if (++frames > maxFrames) {
//           inertiaRAF.current = null;
//           return;
//         }
//         const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
//         const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
//         rotationRef.current = { x: nextX, y: nextY };
//         applyTransform(nextX, nextY);
//         inertiaRAF.current = requestAnimationFrame(step);
//       };
//       stopInertia();
//       inertiaRAF.current = requestAnimationFrame(step);
//     },
//     [dragDampening, maxVerticalRotationDeg, stopInertia]
//   );

//   useGesture(
//     {
//       onDragStart: ({ event }) => {
//         if (focusedElRef.current) return;
//         stopInertia();
//         const evt = event as PointerEvent;
//         pointerTypeRef.current = (evt.pointerType as any) || 'mouse';
//         if (pointerTypeRef.current === 'touch') lockScroll();
//         draggingRef.current = true;
//         cancelTapRef.current = false;
//         movedRef.current = false;
//         startRotRef.current = { ...rotationRef.current };
//         startPosRef.current = { x: evt.clientX, y: evt.clientY };
//         const potential = (evt.target as Element).closest?.('.item__image') as HTMLElement | null;
//         tapTargetRef.current = potential || null;
//       },
//       onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
//         if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
//         const evt = event as PointerEvent;
//         const dxTotal = evt.clientX - startPosRef.current.x;
//         const dyTotal = evt.clientY - startPosRef.current.y;

//         if (!movedRef.current && (dxTotal * dxTotal + dyTotal * dyTotal > 16)) movedRef.current = true;

//         const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
//         const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

//         if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
//           rotationRef.current = { x: nextX, y: nextY };
//           applyTransform(nextX, nextY);
//         }

//         if (last) {
//           draggingRef.current = false;
//           let isTap = false;
//           if (startPosRef.current) {
//             const dx = evt.clientX - startPosRef.current.x;
//             const dy = evt.clientY - startPosRef.current.y;
//             if (dx * dx + dy * dy <= (pointerTypeRef.current === 'touch' ? 100 : 36)) isTap = true;
//           }

//           let [vMagX, vMagY] = velArr;
//           const [dirX, dirY] = dirArr;
//           let vx = vMagX * dirX;
//           let vy = vMagY * dirY;

//           if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
//             vx = (movement[0] / dragSensitivity) * 0.02;
//             vy = (movement[1] / dragSensitivity) * 0.02;
//           }

//           if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) startInertia(vx, vy);

//           startPosRef.current = null;
//           cancelTapRef.current = !isTap;

//           if (isTap && tapTargetRef.current && !focusedElRef.current) openItemFromElement(tapTargetRef.current);
//           tapTargetRef.current = null;

//           if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);
//           if (pointerTypeRef.current === 'touch') unlockScroll();
//           if (movedRef.current) lastDragEndAt.current = performance.now();
//           movedRef.current = false;
//         }
//       }
//     },
//     { target: mainRef, eventOptions: { passive: false } }
//   );

//   useEffect(() => {
//     const scrim = scrimRef.current;
//     if (!scrim) return;

//     const close = () => {
//       if (performance.now() - openStartedAtRef.current < 250) return;
//       const el = focusedElRef.current;
//       if (!el) return;
//       const parent = el.parentElement as HTMLElement;
//       const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;
//       if (!overlay) return;

//       const originalPos = originalTilePositionRef.current;
//       if (!originalPos) {
//         overlay.remove();
//         parent.style.setProperty('--rot-y-delta', `0deg`);
//         parent.style.setProperty('--rot-x-delta', `0deg`);
//         el.style.visibility = '';
//         focusedElRef.current = null;
//         rootRef.current?.removeAttribute('data-enlarging');
//         openingRef.current = false;
//         return;
//       }

//       overlay.style.opacity = '0';
//       overlay.style.transform = `scale(0.5)`;
      
//       setTimeout(() => {
//         overlay.remove();
//         originalTilePositionRef.current = null;
//         parent.style.setProperty('--rot-y-delta', `0deg`);
//         parent.style.setProperty('--rot-x-delta', `0deg`);
//         el.style.visibility = '';
//         focusedElRef.current = null;
//         rootRef.current?.removeAttribute('data-enlarging');
//         openingRef.current = false;
//       }, enlargeTransitionMs);
//     };

//     scrim.addEventListener('click', close);
//     const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
//     window.addEventListener('keydown', onKey);
//     return () => { scrim.removeEventListener('click', close); window.removeEventListener('keydown', onKey); };
//   }, [enlargeTransitionMs]);

//   const openItemFromElement = (el: HTMLElement) => {
//     if (openingRef.current) return;
//     openingRef.current = true;
//     openStartedAtRef.current = performance.now();
//     lockScroll();
//     const parent = el.parentElement as HTMLElement;
//     focusedElRef.current = el;
    
//     const offsetX = getDataNumber(parent, 'offsetX', 0);
//     const offsetY = getDataNumber(parent, 'offsetY', 0);
//     const sizeX = getDataNumber(parent, 'sizeX', 2);
//     const sizeY = getDataNumber(parent, 'sizeY', 2);
//     const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
    
//     let rotY = -(normalizeAngle(parentRot.rotateY) + normalizeAngle(rotationRef.current.y)) % 360;
//     if (rotY < -180) rotY += 360;
    
//     parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
//     parent.style.setProperty('--rot-x-delta', `${-parentRot.rotateX - rotationRef.current.x}deg`);

//     const frameR = frameRef.current?.getBoundingClientRect();
//     const mainR = mainRef.current?.getBoundingClientRect();
//     if (!frameR || !mainR) return;

//     originalTilePositionRef.current = { left: 0, top: 0, width: 0, height: 0 };
//     el.style.visibility = 'hidden';

//     const overlay = document.createElement('div');
//     overlay.className = 'enlarge';
//     overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; transform:scale(0.5); transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.5); border: 1px solid rgba(212,175,55,0.4);`;
    
//     const rawSrc = parent.dataset.src || '';
//     const rawAlt = parent.dataset.alt || '';
    
//     const img = document.createElement('img');
//     img.src = rawSrc;
//     img.alt = rawAlt;
//     img.style.cssText = `width:100%; height:100%; object-fit:cover;`;
    
//     overlay.appendChild(img);
//     viewerRef.current!.appendChild(overlay);

//     setTimeout(() => {
//       overlay.style.opacity = '1';
//       overlay.style.transform = 'scale(1)';
//       rootRef.current?.setAttribute('data-enlarging', 'true');
//     }, 16);
//   };

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: `
//         .sphere-root {
//           --radius: 520px;
//           --viewer-pad: 72px;
//           --circ: calc(var(--radius) * 3.14);
//           --rot-y: calc((360deg / var(--segments-x)) / 2);
//           --rot-x: calc((360deg / var(--segments-y)) / 2);
//           --item-width: calc(var(--circ) / var(--segments-x));
//           --item-height: calc(var(--circ) / var(--segments-y));
//         }
//         .sphere-root * { box-sizing: border-box; }
//         .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
//         .stage {
//           width: 100%; height: 100%; display: grid; place-items: center; position: absolute; inset: 0; margin: auto;
//           perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%;
//         }
//         .sphere { transform: translateZ(calc(var(--radius) * -1)); will-change: transform; position: absolute; }
//         .sphere-item {
//           width: calc(var(--item-width) * var(--item-size-x)); height: calc(var(--item-height) * var(--item-size-y));
//           position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto;
//           transform-origin: 50% 50%; backface-visibility: hidden; transition: transform 300ms;
//           transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
//                      rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
//                      translateZ(var(--radius));
//         }
//         .sphere-root[data-enlarging="true"] .scrim { opacity: 1 !important; pointer-events: all !important; }
//         @media (max-aspect-ratio: 1/1) { .viewer-frame { height: auto !important; width: 100% !important; } }
//         .item__image {
//           position: absolute; inset: 10px; border-radius: var(--tile-radius, 12px); overflow: hidden; cursor: pointer;
//           backface-visibility: hidden; -webkit-backface-visibility: hidden; transition: transform 300ms, box-shadow 300ms;
//           pointer-events: auto; transform: translateZ(0); border: 1px solid rgba(212,175,55,0.2);
//         }
//         .item__image:hover {
//             box-shadow: 0 0 20px rgba(212,175,55,0.4);
//             border-color: rgba(212,175,55,0.8);
//         }
//       `}} />
//       <div ref={rootRef} className="sphere-root relative w-full h-full" style={{ ['--segments-x' as any]: segments, ['--segments-y' as any]: segments } as any}>
//         <main ref={mainRef} className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent" style={{ touchAction: 'none', WebkitUserSelect: 'none' }}>
//           <div className="stage">
//             <div ref={sphereRef} className="sphere">
//               {items.map((it, i) => (
//                 <div key={`${it.x},${it.y},${i}`} className="sphere-item absolute m-auto" data-src={it.src} data-alt={it.alt} data-offset-x={it.x} data-offset-y={it.y} data-size-x={it.sizeX} data-size-y={it.sizeY}
//                   style={{ ['--offset-x' as any]: it.x, ['--offset-y' as any]: it.y, ['--item-size-x' as any]: it.sizeX, ['--item-size-y' as any]: it.sizeY, top: '-999px', bottom: '-999px', left: '-999px', right: '-999px' } as any}>
//                   <div className="item__image absolute block overflow-hidden cursor-pointer transition-transform duration-300"
//                     role="button" tabIndex={0}
//                     onClick={e => { if (!draggingRef.current && !movedRef.current && !openingRef.current) openItemFromElement(e.currentTarget as HTMLElement); }}
//                     style={{ inset: '10px', borderRadius: `var(--tile-radius, ${imageBorderRadius})`, backfaceVisibility: 'hidden' }}>
//                     {/* 🚀 FIX: Optimized Next.js Image Component */}
//                     <Image src={it.src} alt={it.alt || "Gallery Image"} fill sizes="(max-width: 768px) 150px, 250px" className="object-cover pointer-events-none" style={{ backfaceVisibility: 'hidden' }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)` }} />
//           <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{ WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`, maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`, backdropFilter: 'blur(3px)' }} />
//           <div className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180" style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }} />
//           <div className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }} />
//           <div ref={viewerRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" style={{ padding: 'var(--viewer-pad)' }}>
//             <div ref={scrimRef} className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(5px)' }} />
//             <div ref={frameRef} className="viewer-frame h-full aspect-square flex" style={{ borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})` }} />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }



















// 'use client';

// import { useEffect, useMemo, useRef, useCallback } from 'react';
// import { useGesture } from '@use-gesture/react';
// import Image from 'next/image';

// type ImageItem = string | { src: string; alt?: string };

// type DomeGalleryProps = {
//   images?: ImageItem[];
//   fit?: number;
//   fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
//   minRadius?: number;
//   maxRadius?: number;
//   padFactor?: number;
//   overlayBlurColor?: string;
//   maxVerticalRotationDeg?: number;
//   dragSensitivity?: number;
//   enlargeTransitionMs?: number;
//   segments?: number;
//   dragDampening?: number;
//   openedImageWidth?: string;
//   openedImageHeight?: string;
//   imageBorderRadius?: string;
//   openedImageBorderRadius?: string;
//   grayscale?: boolean;
//   autoRotateSpeed?: number; // 🚀 Naya Prop: Auto rotation speed
// };

// type ItemDef = { src: string; alt: string; x: number; y: number; sizeX: number; sizeY: number; };

// const DEFAULTS = { maxVerticalRotationDeg: 5, dragSensitivity: 20, enlargeTransitionMs: 300, segments: 35 };

// const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
// const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
// const wrapAngleSigned = (deg: number) => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180; };
// const getDataNumber = (el: HTMLElement, name: string, fallback: number) => { const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`); const n = attr == null ? NaN : parseFloat(attr); return Number.isFinite(n) ? n : fallback; };

// function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
//   const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
//   const evenYs = [-4, -2, 0, 2, 4];
//   const oddYs = [-3, -1, 1, 3, 5];
//   const coords = xCols.flatMap((x, c) => {
//     const ys = c % 2 === 0 ? evenYs : oddYs;
//     return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
//   });
//   if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '' }));
//   const normalizedImages = pool.map(img => (typeof img === 'string' ? { src: img, alt: '' } : { src: img.src || '', alt: img.alt || '' }));
//   const usedImages = Array.from({ length: coords.length }, (_, i) => normalizedImages[i % normalizedImages.length]);
  
//   for (let i = 1; i < usedImages.length; i++) {
//     if (usedImages[i].src === usedImages[i - 1].src) {
//       for (let j = i + 1; j < usedImages.length; j++) {
//         if (usedImages[j].src !== usedImages[i].src) {
//           const tmp = usedImages[i]; usedImages[i] = usedImages[j]; usedImages[j] = tmp; break;
//         }
//       }
//     }
//   }
//   return coords.map((c, i) => ({ ...c, src: usedImages[i].src, alt: usedImages[i].alt }));
// }

// function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
//   const unit = 360 / segments / 2;
//   const rotateY = unit * (offsetX + (sizeX - 1) / 2);
//   const rotateX = unit * (offsetY - (sizeY - 1) / 2);
//   return { rotateX, rotateY };
// }

// export default function DomeGallery({
//   images = [], fit = 0.5, fitBasis = 'auto', minRadius = 600, maxRadius = Infinity, padFactor = 0.25,
//   overlayBlurColor = '#080202', maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
//   dragSensitivity = DEFAULTS.dragSensitivity, enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
//   segments = DEFAULTS.segments, dragDampening = 2, openedImageWidth = '400px', openedImageHeight = '400px',
//   imageBorderRadius = '30px', openedImageBorderRadius = '30px', grayscale = false,
//   autoRotateSpeed = 0.05 // 🚀 Default rotation speed
// }: DomeGalleryProps) {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const mainRef = useRef<HTMLDivElement>(null);
//   const sphereRef = useRef<HTMLDivElement>(null);
//   const frameRef = useRef<HTMLDivElement>(null);
//   const viewerRef = useRef<HTMLDivElement>(null);
//   const scrimRef = useRef<HTMLDivElement>(null);
//   const focusedElRef = useRef<HTMLElement | null>(null);
//   const originalTilePositionRef = useRef<{ left: number; top: number; width: number; height: number; } | null>(null);

//   const rotationRef = useRef({ x: 0, y: 0 });
//   const startRotRef = useRef({ x: 0, y: 0 });
//   const startPosRef = useRef<{ x: number; y: number } | null>(null);
//   const draggingRef = useRef(false);
//   const movedRef = useRef(false);
//   const inertiaRAF = useRef<number | null>(null);
//   const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');
//   const openingRef = useRef(false);
//   const isHoveredRef = useRef(false); // 🚀 Track hover state

//   const lockScroll = useCallback(() => { document.body.style.overflow = 'hidden'; }, []);
//   const unlockScroll = useCallback(() => { if (rootRef.current?.getAttribute('data-enlarging') !== 'true') document.body.style.overflow = ''; }, []);

//   const items = useMemo(() => buildItems(images, segments), [images, segments]);

//   const applyTransform = useCallback((xDeg: number, yDeg: number) => {
//     if (sphereRef.current) sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
//   }, []);

//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return;
//     const ro = new ResizeObserver(entries => {
//       const cr = entries[0].contentRect;
//       const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
//       let basis = w / h >= 1.3 ? w : Math.min(w, h);
//       let radius = clamp(Math.min(basis * fit, h * 1.35), minRadius, maxRadius);
      
//       root.style.setProperty('--radius', `${Math.round(radius)}px`);
//       root.style.setProperty('--viewer-pad', `${Math.max(8, Math.round(Math.min(w, h) * padFactor))}px`);
//       root.style.setProperty('--overlay-blur-color', overlayBlurColor);
//       root.style.setProperty('--tile-radius', imageBorderRadius);
//       root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
//       applyTransform(rotationRef.current.x, rotationRef.current.y);
//     });
//     ro.observe(root);
//     return () => ro.disconnect();
//   }, [fit, minRadius, maxRadius, padFactor, overlayBlurColor, imageBorderRadius, openedImageBorderRadius, applyTransform]);

//   /* 🚀 AUTO ROTATION LOGIC (Marquee Effect) */
//   useEffect(() => {
//     let rafId: number;
//     const loop = () => {
//       // 🚀 Move sphere ONLY if not interacting and not hovered
//       if (!draggingRef.current && !inertiaRAF.current && !openingRef.current && !isHoveredRef.current) {
//         const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
//         rotationRef.current.y = nextY;
//         applyTransform(rotationRef.current.x, nextY);
//       }
//       rafId = requestAnimationFrame(loop);
//     };
//     rafId = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(rafId);
//   }, [autoRotateSpeed, applyTransform]);

//   useGesture({
//     onDragStart: ({ event }) => {
//       if (focusedElRef.current) return;
//       if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null; }
//       pointerTypeRef.current = ((event as PointerEvent).pointerType as any) || 'mouse';
//       if (pointerTypeRef.current === 'touch') lockScroll();
//       draggingRef.current = true;
//       movedRef.current = false;
//       startRotRef.current = { ...rotationRef.current };
//       startPosRef.current = { x: (event as PointerEvent).clientX, y: (event as PointerEvent).clientY };
//     },
//     onDrag: ({ event, last }) => {
//       if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
//       const evt = event as PointerEvent;
//       const dxTotal = evt.clientX - startPosRef.current.x;
//       const dyTotal = evt.clientY - startPosRef.current.y;
//       if (!movedRef.current && (dxTotal * dxTotal + dyTotal * dyTotal > 16)) movedRef.current = true;

//       const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
//       const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
//       rotationRef.current = { x: nextX, y: nextY };
//       applyTransform(nextX, nextY);

//       if (last) {
//         draggingRef.current = false;
//         startPosRef.current = null;
//         if (pointerTypeRef.current === 'touch') unlockScroll();
//       }
//     }
//   }, { target: mainRef, eventOptions: { passive: false } });

//   const openItemFromElement = (el: HTMLElement) => {
//     if (openingRef.current) return;
//     openingRef.current = true;
//     lockScroll();
//     focusedElRef.current = el;
//     const parent = el.parentElement as HTMLElement;
    
//     const parentRot = computeItemBaseRotation(getDataNumber(parent, 'offsetX', 0), getDataNumber(parent, 'offsetY', 0), getDataNumber(parent, 'sizeX', 2), getDataNumber(parent, 'sizeY', 2), segments);
    
//     let rotY = -(normalizeAngle(parentRot.rotateY) + normalizeAngle(rotationRef.current.y)) % 360;
//     if (rotY < -180) rotY += 360;
//     parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
//     parent.style.setProperty('--rot-x-delta', `${-parentRot.rotateX - rotationRef.current.x}deg`);

//     const frameR = frameRef.current?.getBoundingClientRect();
//     const mainR = mainRef.current?.getBoundingClientRect();
//     if (!frameR || !mainR) return;

//     originalTilePositionRef.current = { left: 0, top: 0, width: 0, height: 0 };
//     el.style.visibility = 'hidden';

//     const overlay = document.createElement('div');
//     overlay.className = 'enlarge';
//     overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; transform:scale(0.5); transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.5); border: 1px solid rgba(212,175,55,0.4);`;
    
//     const img = document.createElement('img');
//     img.src = parent.dataset.src || '';
//     img.alt = parent.dataset.alt || '';
//     img.style.cssText = `width:100%; height:100%; object-fit:cover;`;
//     overlay.appendChild(img);
//     viewerRef.current!.appendChild(overlay);

//     setTimeout(() => {
//       overlay.style.opacity = '1';
//       overlay.style.transform = 'scale(1)';
//       rootRef.current?.setAttribute('data-enlarging', 'true');
//     }, 16);
//   };

//   useEffect(() => {
//     const close = () => {
//       if (!focusedElRef.current || !viewerRef.current?.querySelector('.enlarge')) return;
//       const overlay = viewerRef.current.querySelector('.enlarge') as HTMLElement;
//       overlay.style.opacity = '0';
//       overlay.style.transform = `scale(0.5)`;
      
//       setTimeout(() => {
//         overlay.remove();
//         if (focusedElRef.current) {
//            const parent = focusedElRef.current.parentElement;
//            if (parent) { parent.style.setProperty('--rot-y-delta', `0deg`); parent.style.setProperty('--rot-x-delta', `0deg`); }
//            focusedElRef.current.style.visibility = '';
//         }
//         focusedElRef.current = null;
//         rootRef.current?.removeAttribute('data-enlarging');
//         openingRef.current = false;
//         unlockScroll();
//       }, enlargeTransitionMs);
//     };

//     scrimRef.current?.addEventListener('click', close);
//     return () => scrimRef.current?.removeEventListener('click', close);
//   }, [enlargeTransitionMs, unlockScroll]);

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: `
//         .sphere-root { --circ: calc(var(--radius) * 3.14); --rot-y: calc((360deg / var(--segments-x)) / 2); --rot-x: calc((360deg / var(--segments-y)) / 2); --item-width: calc(var(--circ) / var(--segments-x)); --item-height: calc(var(--circ) / var(--segments-y)); }
//         .sphere-root * { box-sizing: border-box; }
//         .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
//         .stage { width: 100%; height: 100%; display: grid; place-items: center; position: absolute; inset: 0; margin: auto; perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%; }
//         .sphere { transform: translateZ(calc(var(--radius) * -1)); will-change: transform; position: absolute; }
//         .sphere-item { width: calc(var(--item-width) * var(--item-size-x)); height: calc(var(--item-height) * var(--item-size-y)); position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto; transform-origin: 50% 50%; backface-visibility: hidden; transition: transform 300ms; transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius)); }
//         .sphere-root[data-enlarging="true"] .scrim { opacity: 1 !important; pointer-events: all !important; }
//         .item__image { position: absolute; inset: 10px; border-radius: var(--tile-radius, 12px); overflow: hidden; cursor: pointer; backface-visibility: hidden; -webkit-backface-visibility: hidden; transition: transform 300ms, box-shadow 300ms; pointer-events: auto; transform: translateZ(0); border: 1px solid rgba(212,175,55,0.2); }
//         .item__image:hover { box-shadow: 0 0 20px rgba(212,175,55,0.4); border-color: rgba(212,175,55,0.8); }
//       `}} />
//       <div ref={rootRef} className="sphere-root relative w-full h-full" style={{ ['--segments-x' as any]: segments, ['--segments-y' as any]: segments } as any}>
//         <main ref={mainRef} 
//               onMouseEnter={() => (isHoveredRef.current = true)} 
//               onMouseLeave={() => (isHoveredRef.current = false)}
//               className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent" style={{ touchAction: 'none', WebkitUserSelect: 'none' }}>
//           <div className="stage">
//             <div ref={sphereRef} className="sphere">
//               {items.map((it, i) => (
//                 <div key={`${it.x},${it.y},${i}`} className="sphere-item absolute m-auto" data-src={it.src} data-alt={it.alt} data-offset-x={it.x} data-offset-y={it.y} data-size-x={it.sizeX} data-size-y={it.sizeY}
//                   style={{ ['--offset-x' as any]: it.x, ['--offset-y' as any]: it.y, ['--item-size-x' as any]: it.sizeX, ['--item-size-y' as any]: it.sizeY, top: '-999px', bottom: '-999px', left: '-999px', right: '-999px' } as any}>
//                   <div className="item__image absolute block overflow-hidden cursor-pointer transition-transform duration-300"
//                     onClick={e => { if (!draggingRef.current && !movedRef.current && !openingRef.current) openItemFromElement(e.currentTarget as HTMLElement); }}
//                     style={{ inset: '5px', borderRadius: `var(--tile-radius, ${imageBorderRadius})`, backfaceVisibility: 'hidden' }}>
//                     <Image src={it.src} alt={it.alt || "Gallery Image"} fill sizes="(max-width: 768px) 150px, 250px" className="object-cover pointer-events-none" style={{ backfaceVisibility: 'hidden' }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)` }} />
//           <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{ WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`, maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`, backdropFilter: 'blur(3px)' }} />
//           <div className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180" style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }} />
//           <div className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }} />
//           <div ref={viewerRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" style={{ padding: 'var(--viewer-pad)' }}>
//             <div ref={scrimRef} className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(5px)', pointerEvents: 'auto' }} />
//             <div ref={frameRef} className="viewer-frame h-full aspect-square flex" style={{ borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})` }} />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// } 






















'use client';

import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateSpeed?: number;
};

type ItemDef = { src: string; alt: string; x: number; y: number; sizeX: number; sizeY: number; };

const DEFAULTS = { maxVerticalRotationDeg: 5, dragSensitivity: 20, enlargeTransitionMs: 300, segments: 18 }; // 🚀 FIX: Reduced segments for BIGGER rectangular tiles

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180; };
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => { const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`); const n = attr == null ? NaN : parseFloat(attr); return Number.isFinite(n) ? n : fallback; };

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  // 🚀 FIX: Dynamic Math so it wraps perfectly regardless of segments count
  const startX = -(seg - 1);
  const xCols = Array.from({ length: seg }, (_, i) => startX + i * 2);
  
  // 🚀 FIX: Reduced rows and adjusted sizing (sizeX: 2.2, sizeY: 1.5) to make beautiful Landscape Rectangles
  const evenYs = [-3, -1, 1, 3]; 
  const oddYs = [-2, 0, 2];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2.2, sizeY: 1.5 })); 
  });

  if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '' }));
  const normalizedImages = pool.map(img => (typeof img === 'string' ? { src: img, alt: '' } : { src: img.src || '', alt: img.alt || '' }));
  const usedImages = Array.from({ length: coords.length }, (_, i) => normalizedImages[i % normalizedImages.length]);
  
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i]; usedImages[i] = usedImages[j]; usedImages[j] = tmp; break;
        }
      }
    }
  }
  return coords.map((c, i) => ({ ...c, src: usedImages[i].src, alt: usedImages[i].alt }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = [], fit = 0.5, fitBasis = 'auto', minRadius = 600, maxRadius = Infinity, padFactor = 0.25,
  overlayBlurColor = '#080202', maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity, enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments, dragDampening = 2,
  imageBorderRadius = '12px', openedImageBorderRadius = '24px', grayscale = false,
  autoRotateSpeed = 0.05
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');
  const openingRef = useRef(false);
  const isHoveredRef = useRef(false);

  const lockScroll = useCallback(() => { document.body.style.overflow = 'hidden'; }, []);
  const unlockScroll = useCallback(() => { if (rootRef.current?.getAttribute('data-enlarging') !== 'true') document.body.style.overflow = ''; }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    if (sphereRef.current) sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
      let basis = w / h >= 1.3 ? w : Math.min(w, h);
      let radius = clamp(Math.min(basis * fit, h * 1.35), minRadius, maxRadius);
      
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, minRadius, maxRadius, overlayBlurColor, imageBorderRadius, openedImageBorderRadius, applyTransform]);

  /* ── AUTO ROTATION (Marquee Effect) ── */
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      if (!draggingRef.current && !inertiaRAF.current && !openingRef.current && !isHoveredRef.current) {
        const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
        rotationRef.current.y = nextY;
        applyTransform(rotationRef.current.x, nextY);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [autoRotateSpeed, applyTransform]);

  /* ── SWIPE & CLICK HANDLING ── */
  useGesture({
    onDragStart: ({ event }) => {
      if (focusedElRef.current) return;
      if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null; }
      pointerTypeRef.current = ((event as PointerEvent).pointerType as any) || 'mouse';
      if (pointerTypeRef.current === 'touch') lockScroll();
      draggingRef.current = true;
      movedRef.current = false;
      startRotRef.current = { ...rotationRef.current };
      startPosRef.current = { x: (event as PointerEvent).clientX, y: (event as PointerEvent).clientY };
    },
    onDrag: ({ event, last }) => {
      if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
      const evt = event as PointerEvent;
      const dxTotal = evt.clientX - startPosRef.current.x;
      const dyTotal = evt.clientY - startPosRef.current.y;
      
      if (!movedRef.current && (dxTotal * dxTotal + dyTotal * dyTotal > 20)) movedRef.current = true;

      const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);

      if (last) {
        draggingRef.current = false;
        startPosRef.current = null;
        if (pointerTypeRef.current === 'touch') unlockScroll();
      }
    }
  }, { target: mainRef, eventOptions: { passive: false } });

  /* ── OPEN IMAGE FULLSCREEN ── */
  const openItemFromElement = (el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    lockScroll();
    focusedElRef.current = el;
    const parent = el.parentElement as HTMLElement;
    
    // Rotate sphere to focus on the clicked item
    const parentRot = computeItemBaseRotation(getDataNumber(parent, 'offsetX', 0), getDataNumber(parent, 'offsetY', 0), getDataNumber(parent, 'sizeX', 2), getDataNumber(parent, 'sizeY', 2), segments);
    let rotY = -(normalizeAngle(parentRot.rotateY) + normalizeAngle(rotationRef.current.y)) % 360;
    if (rotY < -180) rotY += 360;
    parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
    parent.style.setProperty('--rot-x-delta', `${-parentRot.rotateX - rotationRef.current.x}deg`);

    const frameR = frameRef.current?.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    if (!frameR || !mainR || frameR.width === 0) {
      openingRef.current = false; unlockScroll(); return; 
    }

    el.style.visibility = 'hidden';

    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; transform:scale(0.8); transition:transform ${enlargeTransitionMs}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,.8); border: 2px solid rgba(212,175,55,0.6);`;
    
    const img = document.createElement('img');
    img.src = parent.dataset.src || '';
    img.alt = parent.dataset.alt || '';
    img.style.cssText = `width:100%; height:100%; object-fit:cover;`;
    overlay.appendChild(img);
    viewerRef.current!.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.transform = 'scale(1)';
      rootRef.current?.setAttribute('data-enlarging', 'true');
    });
  };

  /* ── CLOSE IMAGE ── */
  useEffect(() => {
    const close = () => {
      if (!focusedElRef.current || !viewerRef.current?.querySelector('.enlarge')) return;
      const overlay = viewerRef.current.querySelector('.enlarge') as HTMLElement;
      overlay.style.opacity = '0';
      overlay.style.transform = `scale(0.8)`;
      
      setTimeout(() => {
        overlay.remove();
        if (focusedElRef.current) {
           const parent = focusedElRef.current.parentElement;
           if (parent) { parent.style.setProperty('--rot-y-delta', `0deg`); parent.style.setProperty('--rot-x-delta', `0deg`); }
           focusedElRef.current.style.visibility = '';
        }
        focusedElRef.current = null;
        rootRef.current?.removeAttribute('data-enlarging');
        openingRef.current = false;
        unlockScroll();
      }, enlargeTransitionMs);
    };

    scrimRef.current?.addEventListener('click', close);
    return () => scrimRef.current?.removeEventListener('click', close);
  }, [enlargeTransitionMs, unlockScroll]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .sphere-root { --circ: calc(var(--radius) * 3.14); --rot-y: calc((360deg / var(--segments-x)) / 2); --rot-x: calc((360deg / var(--segments-y)) / 2); --item-width: calc(var(--circ) / var(--segments-x)); --item-height: calc(var(--circ) / var(--segments-y)); }
        .sphere-root * { box-sizing: border-box; }
        .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
        .stage { width: 100%; height: 100%; display: grid; place-items: center; position: absolute; inset: 0; margin: auto; perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%; }
        .sphere { transform: translateZ(calc(var(--radius) * -1)); will-change: transform; position: absolute; }
        .sphere-item { width: calc(var(--item-width) * var(--item-size-x)); height: calc(var(--item-height) * var(--item-size-y)); position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto; transform-origin: 50% 50%; backface-visibility: hidden; transition: transform 300ms; transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius)); }
        
        .item__image { position: absolute; inset: 6px; border-radius: var(--tile-radius, 8px); overflow: hidden; cursor: pointer; backface-visibility: hidden; transition: transform 300ms, box-shadow 300ms; pointer-events: auto; transform: translateZ(0); border: 1px solid rgba(212,175,55,0.3); background: #110505; }
        .item__image:hover { box-shadow: 0 0 25px rgba(212,175,55,0.5); border-color: rgba(212,175,55,0.9); }
        
        /* 🚀 FIX: Viewer Frame CSS to guarantee size for Fullscreen Popup */
        .viewer-frame {
          width: 90vw;
          max-width: 600px;
          aspect-ratio: 4 / 3;
          margin: auto;
          background: transparent;
        }

        .sphere-root[data-enlarging="true"] .scrim { opacity: 1 !important; pointer-events: auto !important; }
      `}} />
      <div ref={rootRef} className="sphere-root relative w-full h-full" style={{ ['--segments-x' as any]: segments, ['--segments-y' as any]: segments } as any}>
        <main ref={mainRef} 
              onMouseEnter={() => (isHoveredRef.current = true)} 
              onMouseLeave={() => (isHoveredRef.current = false)}
              className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent" style={{ touchAction: 'none', WebkitUserSelect: 'none' }}>
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div key={`${it.x},${it.y},${i}`} className="sphere-item absolute m-auto" data-src={it.src} data-alt={it.alt} data-offset-x={it.x} data-offset-y={it.y} data-size-x={it.sizeX} data-size-y={it.sizeY}
                  style={{ ['--offset-x' as any]: it.x, ['--offset-y' as any]: it.y, ['--item-size-x' as any]: it.sizeX, ['--item-size-y' as any]: it.sizeY, top: '-999px', bottom: '-999px', left: '-999px', right: '-999px' } as any}>
                  
                  {/* 🚀 FIX: Robust onClick handler */}
                  {/* <div className="item__image absolute block overflow-hidden cursor-pointer transition-transform duration-300"
                    onClick={e => { 
                      if (!draggingRef.current && !movedRef.current && !openingRef.current) openItemFromElement(e.currentTarget as HTMLElement); 
                    }}
                    style={{ inset: '5px', borderRadius: `var(--tile-radius)`, backfaceVisibility: 'hidden' }}>
                    <Image src={it.src} alt={it.alt || "Gallery Image"} fill sizes="(max-width: 768px) 150px, 300px" className="object-cover pointer-events-none" style={{ backfaceVisibility: 'hidden' }} />
                  </div> */}

                  <div className="item__image absolute block overflow-hidden cursor-pointer transition-transform duration-300"
                    onClick={e => { 
                      if (!draggingRef.current && !movedRef.current && !openingRef.current) openItemFromElement(e.currentTarget as HTMLElement); 
                    }}
                    style={{ inset: '5px', borderRadius: `var(--tile-radius)`, backfaceVisibility: 'hidden' }}>
                    
                    {/* 🚀 PERFORMANCE FIX: Added 'unoptimized' & 'draggable="false"' */}
                    <Image 
                      src={it.src} 
                      alt={it.alt || "Gallery Image"} 
                      fill 
                      sizes="(max-width: 768px) 150px, 300px" 
                      className="object-cover pointer-events-none" 
                      style={{ backfaceVisibility: 'hidden' }}
                      unoptimized={true} /* 🚀 सर्वर प्रोसेसिंग को बायपास करता है, जिससे 150kb की फाइल तुरंत लोड होगी */
                      draggable={false}  /* 🚀 स्वाइप करते समय इमेज को 'Ghost Drag' होने से रोकता है */
                      loading="lazy"
                    />
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)` }} />
          <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{ WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`, maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`, backdropFilter: 'blur(3px)' }} />
          <div className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180" style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }} />
          <div className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))` }} />
          
          {/* 🚀 FIX: Fullscreen Image Viewer Container */}
          <div ref={viewerRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <div ref={scrimRef} className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500" style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)' }} />
            <div ref={frameRef} className="viewer-frame flex relative z-20" style={{ borderRadius: `var(--enlarge-radius)` }} />
          </div>
        </main>
      </div>
    </>
  );
}