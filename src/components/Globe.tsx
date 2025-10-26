"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

// ✅ Deterministic pseudo-random generator
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// ✅ Helper: round consistently to 4 decimal places
const round = (num: number, digits = 4) => parseFloat(num.toFixed(digits));

export const Globe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ✅ Generate deterministic + rounded dots
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 20;
        const top = 50 + 40 * Math.cos(angle);
        const left = 50 + 40 * Math.sin(angle);
        const op = pseudoRandom(i) * 0.5 + 0.2;
        return {
          top: `${round(top)}%`,
          left: `${round(left)}%`,
          opacity: round(op),
        };
      }),
    []
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="relative w-[600px] h-[600px]"
      >
        <div className="absolute inset-0 rounded-full border border-white/5" />
        <div className="absolute inset-8 rounded-full border border-white/10" />
        <div className="absolute inset-16 rounded-full border border-white/5" />

        {/* Inner rotating dots */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={dot}
            />
          ))}
        </motion.div>

        {/* Rotating gradient lines */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-full origin-center"
              style={{
                rotate: `${(i * 180) / 12}deg`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)",
              }}
            />
          ))}
        </motion.div>

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20" />
        </div>
      </motion.div>
    </motion.div>
  );
};
