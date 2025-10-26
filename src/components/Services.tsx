"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Define service type for TypeScript (optional but recommended)
interface Service {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

export default function ServicesSection() {
  const servicesRef = useRef<HTMLDivElement>(null);

  // 👇 Your dynamic data — easily editable or fetched from API
  const services: Service[] = [
    {
      id: 1,
      title: "Ideate",
      description:
        "Verify the product-market fit, capture new business opportunities, and make your bold visions take shape.",
      tags: ["Product Strategy", "Workshops", "Research"],
    },
    {
      id: 2,
      title: "Design",
      description:
        "Create designs that are not just seen but felt. Build an immersive experience that drives user loyalty.",
      tags: ["UX", "UI", "UX Audits"],
    },
    {
      id: 3,
      title: "Develop",
      description:
        "Turn concepts into scalable, performant digital products using modern tech stacks and clean architecture.",
      tags: ["Frontend", "Backend", "DevOps"],
    },
    {
      id: 4,
      title: "Launch & Grow",
      description:
        "Deploy with confidence and optimize continuously. We help you measure, iterate, and scale with real user data.",
      tags: ["Analytics", "A/B Testing", "Growth"],
    },
  ];

  useEffect(() => {
    if (!servicesRef.current) return;

    const serviceItems = servicesRef.current.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
      // Initial state: compact padding
      gsap.set(item, { paddingTop: "2rem", paddingBottom: "2rem" });

      // Hover in: expand padding
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          paddingTop: "3rem",
          paddingBottom: "3rem",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Hover out: shrink back
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          paddingTop: "2rem",
          paddingBottom: "2rem",
          duration: 0.4,
          ease: "power2.in",
        });
      });
    });
  }, []);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-4">Services</h2>
            <p className="text-gray-400 max-w-lg">
              Push boundaries with our tech.
              <br />
              Turn your bold business ideas into outstanding digital products.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium border border-gray-600 px-4 py-2 rounded-full hover:border-white transition-colors">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-12" />

        {/* Services List */}
        <div ref={servicesRef} className="space-y-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item flex items-start justify-between gap-8 group cursor-pointer p-6 rounded-lg transition-colors hover:bg-foreground"
            >
              {/* Left side: number and title */}
              <div className="flex-shrink-0 text-gray-500">
                <span className="block text-xl font-mono">
                  {String(service.id).padStart(2, "0")}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2">
                  {service.title}
                </h3>
              </div>
              <div>
                <p className="text-gray-300  max-w-xl text-start">
                  {service.description}
                </p>
              </div>

              {/* Right side: description, tags, and button */}
              <div className="flex flex-col flex-grow items-end">
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border border-gray-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  <button className="p-1 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
