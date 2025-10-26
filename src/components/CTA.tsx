"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";

const CtaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Free high-quality placeholder images (replace with your own later)
  const mockups = [
    { id: 1, src: "https://picsum.photos/id/1015/600/800", alt: "App mockup 1" },
    { id: 2, src: "https://picsum.photos/id/1019/600/800", alt: "App mockup 2" },
    { id: 3, src: "https://picsum.photos/id/1022/600/800", alt: "App mockup 3" },
    { id: 4, src: "https://picsum.photos/id/1023/600/800", alt: "App mockup 4" },
    { id: 5, src: "https://picsum.photos/id/1024/600/800", alt: "App mockup 5" },
    { id: 6, src: "https://picsum.photos/id/1025/600/800", alt: "App mockup 6" },
  ];

  // Position & scale config (for desktop only)
  const positions = [
    { className: "left-0 top-20", scale: 0.9 },
    { className: "left-50 -top-30", scale: 0.8 },
    { className: "right-0 top-20", scale: 0.9 },
    { className: "right-50 -top-20", scale: 0.85 },
    { className: "right-20 bottom-20", scale: 0.85 },
    { className: "left-40 bottom-10", scale: 0.8 },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial state
    mockupRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: positions[i].scale,
          opacity: 1,
        });
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / 50; // sensitivity
      const moveY = (e.clientY - centerY) / 50;

      mockupRefs.current.forEach((el, i) => {
        if (el) {
          const scale = positions[i].scale;
          gsap.to(el, {
            x: moveX * scale,
            y: moveY * scale,
            rotationX: -moveY * 0.1,
            rotationY: moveX * 0.1,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      mockupRefs.current.forEach((el) => {
        if (el) {
          gsap.to(el, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 1,
            ease: "elastic.out(0.8, 0.5)",
          });
        }
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  bg-blue-500 py-20   overflow-hidden"
    >
      {/* Decorative mockups with GSAP parallax (desktop only) */}
      <div className="absolute inset-0 pointer-events-none">
        {mockups.map((mockup, index) => (
  <div
    key={mockup.id}
    ref={(el) => {
      mockupRefs.current[index] = el;
    }}
    className={`absolute hidden lg:block ${positions[index].className}`}
    style={{ transformStyle: "preserve-3d" }}
  >
    <Image
      src={mockup.src}
      alt={mockup.alt}
      width={256}
      height={340}
      className="rounded-2xl shadow-2xl"
      priority={index < 2}
    />
  </div>
))}

      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto text-center container">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-white">Available for projects</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
          Let&apos;s build your
          <br />
          product together
        </h2>

        <p className="text-xl md:text-2xl text-white mb-12  mx-auto">
          Partner with us for a digital journey that transforms your business
          ideas into successful, cutting-edge solutions.
        </p>

        <Button
          size="lg"
          className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl"
        >
          Contact us
        </Button>
      </div>

      {/* Mobile mockups (static, no parallax) */}
      <div className="lg:hidden mt-20 grid grid-cols-2 gap-4  mx-auto">
        <Image
          src="https://picsum.photos/id/1015/400/600"
          alt="Mobile mockup 1"
          width={200}
          height={300}
          className="rounded-xl shadow-xl w-full h-auto"
        />
        <Image
          src="https://picsum.photos/id/1022/400/600"
          alt="Mobile mockup 2"
          width={200}
          height={300}
          className="rounded-xl shadow-xl w-full h-auto mt-8"
        />
      </div>
    </section>
  );
};

export default CtaSection;