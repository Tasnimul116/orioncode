"use client";

import CtaSection from "@/components/CTA";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeList } from "@/components/Marquee";
import ProjectOverview from "@/components/ProjectOverview";
import ServicesSection from "@/components/Services";
import { WhatWeDoPage } from "@/components/WhatWeDo";
import Link from "next/link";

export default function Home() {

    const inspiringWords = [
    "Innovation",
    "Excellence",
    "Creativity",
    "Precision",
    "Excellence",
    "Innovation",
    "Creativity",
    "Precision",
    "Excellence",
    "Innovation",
    "Creativity",
    "Precision"
  ]
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <WhatWeDoPage />
       <div className="bg-white py-24 border-b border-gray-800 text-8xl">
        <MarqueeList 
          items={inspiringWords}
          speed={50}
          // gradientColor="#000000"
          // className="py-2"
        />
      </div>
      <ServicesSection/>
      <ProjectOverview/>
      <CtaSection/>
    </div>
  );
}
