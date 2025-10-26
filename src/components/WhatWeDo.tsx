"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import { ArrowRightCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ViewAllLink from "./ViewAllLink";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Dolby.io",
    description: "Streaming & media app development platform",
    tags: ["Music & Video", "Mobile"],
    colorClass: "card-purple",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=500&fit=crop",
  },
  {
    title: "Nextbank Credit Scoring",
    description: "AI-powered credit scoring & loan origination",
    tags: ["Fintech", "Mobile", "Web"],
    colorClass: "card-dark",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=500&fit=crop",
  },
  {
    title: "Orlen mFlota",
    description: "Fleet management mobile app",
    tags: ["Logistics", "Mobile"],
    colorClass: "card-red",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=500&fit=crop",
  },
  {
    title: "TUI",
    description: "Travel management app for globetrotters",
    tags: ["Travel & Leisure", "Mobile", "Design"],
    colorClass: "card-teal",
    imageUrl:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop",
  },
  {
    title: "Warner Recorded Music",
    description: "Internal conference mobile application",
    tags: ["Music & Video", "Mobile"],
    colorClass: "card-dark",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=500&fit=crop",
  },
];

export const WhatWeDoPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "-100px",
  });

  const viewAllRef = useRef<HTMLDivElement>(null);
  const isViewAllInView = useInView(viewAllRef, { amount: 1, once: true });

  useEffect(() => {
    if (!projectsRef.current || !containerRef.current) return;

    const totalWidth = projectsRef.current.scrollWidth;
    const visibleWidth = projectsRef.current.offsetWidth;

    // Start partially visible from the right
    const initialX = visibleWidth / 4;
    gsap.set(projectsRef.current, { x: initialX });

    // Smooth horizontal scroll on vertical scroll
    gsap.to(projectsRef.current, {
      x: -(totalWidth - visibleWidth /2),
      ease: "power1.out", // smoother easing
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: () => `+=${totalWidth}`,
        scrub: 3, // smooth scrubbing
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true, // recalculates on resize
      },
    });
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;

    const headingAnim = gsap.fromTo(
      headingRef.current,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -100,
        ease: "power1.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top top", // when heading top reaches top of viewport
          end: "bottom  top", // 40% scroll past heading
          scrub: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      if (headingAnim.scrollTrigger) headingAnim.scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white  overflow-hidden font-primary"
    >
      {/* Content above cards */}
      <div className="container mx-auto px-4 py-18">
        <motion.div
          ref={headingRef}
          initial={{ y: -100, opacity: 0 }}
          animate={isHeadingInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
            Our clients
            <br />
            lead the way
          </h2>
          <p className="text-xl max-w-md md:max-w-xl leading-relaxed">
            We blend innovative technologies with cutting-edge design to create
            digital products that excel in both function and form. Discover how
            our expertise brings ideas to life.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroller Wrapper — full width, no container padding */}
      <div className="relative w-full overflow-hidden pt-8 pb-8">
        <div
          ref={projectsRef}
          className="flex gap-6 px-4" // px-4 for side breathing room
          style={{
            minWidth: "max-content", // ensures it doesn't shrink
            alignItems: "flex-start",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
          <div className="flex items-center ml-4">
            <ViewAllLink href="#" variant="outline" text="See More" />
          </div>
        </div>
      </div>
    </section>
  );
};
