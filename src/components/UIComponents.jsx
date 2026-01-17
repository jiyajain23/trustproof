import React, { useRef, useEffect, useId } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Bot, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn, mapRange } from '../utils';

export const Spotlight = ({ className, fill }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

export const SplineScene = ({ className }) => {
  return (
    <div className={cn("w-full h-full flex items-center justify-center relative perspective-1000", className)}>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse pointer-events-none" />
        
        <div className="relative w-64 h-64 flex items-center justify-center">
            <motion.div 
                className="absolute inset-0 border-2 border-blue-500/50 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-4 border-2 border-purple-500/50 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                animate={{ rotateX: [360, 0], rotateZ: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-8 border border-white/40 rounded-full border-dashed"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-white rounded-full shadow-[0_0_60px_rgba(255,255,255,0.8)] flex items-center justify-center backdrop-blur-xl relative z-10 border-2 border-white/50"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <Bot className="w-14 h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>

            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ 
                        x: Math.cos(i) * 120, 
                        y: Math.sin(i) * 120, 
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.5,
                        ease: "easeInOut" 
                    }}
                />
            ))}
        </div>
        
        <motion.div 
            className="absolute bottom-10 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-blue-300 flex items-center gap-2 shadow-lg shadow-blue-900/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <Sparkles className="w-3 h-3" /> System Operational
        </motion.div>
    </div>
  )
}

export const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = 'blue', 
  size = 'md', 
  width, 
  height, 
  customSize = false,
  onClick
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty('--x', (x - rect.left).toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', (y - rect.top).toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const glowColorMap = {
    blue: { base: 220, spread: 200 },
    purple: { base: 280, spread: 300 },
    green: { base: 120, spread: 200 },
    red: { base: 0, spread: 200 },
    orange: { base: 30, spread: 200 }
  };

  const sizeMap = {
    sm: 'w-48 h-64',
    md: 'w-64 h-80',
    lg: 'w-80 h-96'
  };

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.blue;

  const getInlineStyles = () => {
    const baseStyles = {
      '--base': base,
      '--spread': spread,
      '--radius': '16',
      '--border': '2',
      '--backdrop': 'rgba(20, 20, 20, 0.6)',
      '--backup-border': 'rgba(255, 255, 255, 0.1)',
      '--size': '300',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.15)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'local',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    };

    if (width !== undefined) baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;

    return baseStyles;
  };

  return (
    <div 
        ref={cardRef}
        onClick={onClick}
        style={getInlineStyles()}
        className={cn(
          "group relative rounded-2xl overflow-hidden backdrop-blur-md transition-transform hover:scale-[1.02] duration-300 border border-white/10",
          !customSize && sizeMap[size],
          !customSize && 'aspect-[3/4]',
          className
        )}
    >
        <div 
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
                background: `radial-gradient(
                    var(--spotlight-size) circle at var(--x) var(--y),
                    rgba(255, 255, 255, 0.3),
                    transparent 40%
                )`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '1px'
            }}
        />
        <div className="relative z-10 h-full p-6">{children}</div>
    </div>
  );
};

export const RetroGrid = ({ angle = 65, cellSize = 60, opacity = 0.5, lightLineColor = "gray", darkLineColor = "gray" }) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  };

  return (
    <div className={cn("pointer-events-none absolute size-full overflow-hidden [perspective:200px]", `opacity-[var(--opacity)]`)} style={gridStyles}>
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  );
};

export const HeroSection = ({ className, title, subtitle, description, gridOptions, children }) => {
  return (
    <div className={cn("relative min-h-full w-full overflow-visible flex flex-col", className)}>
      <div className="absolute top-0 z-[0] min-h-full w-full bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <section className="relative max-w-full mx-auto z-1 flex-grow flex flex-col w-full min-h-full">
        <RetroGrid {...gridOptions} />
        <div className="max-w-screen-xl w-full z-10 mx-auto px-4 py-8 gap-12 md:px-8 flex flex-col items-center flex-grow justify-center min-h-full">
          <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
            <h1 className="text-sm text-gray-400 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 border-[2px] border-white/5 rounded-3xl w-fit flex items-center">
              {title} <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
            <h2 className="text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
              {subtitle?.regular || ''}
              {subtitle?.gradient && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">
                  {subtitle.gradient}
                </span>
              )}
            </h2>
            {description && <p className="max-w-2xl mx-auto text-gray-300">{description}</p>}
          </div>
          <div className="mt-8 w-full flex justify-center pb-8">{children}</div>
        </div>
      </section>
    </div>
  )
}

