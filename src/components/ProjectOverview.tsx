import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: string;
  suffix: string;
  label: string;
}

const StatCard = ({ value, suffix, label }: StatProps) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    const card = cardRef.current;
    if (!element || !card) return;

    const numericValue = parseInt(value);
    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: numericValue,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = Math.floor(obj.value).toString();
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return (
    <div
      ref={cardRef}
      className="relative p-8 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300"
    >
      <div className="text-6xl font-bold mb-4">
        <span ref={numberRef}>0</span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-muted-foreground text-lg">{label}</p>
    </div>
  );
};

const ProjectOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector("h1"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  const stats = [
    { value: "13", suffix: "+", label: "years in the game" },
    { value: "250", suffix: "+", label: "digital solutions delivered" },
    { value: "200", suffix: "+", label: "experts on board" },
    { value: "9", suffix: "/10", label: "projects from referrals" },
  ];

  return (
    <section ref={sectionRef} className="bg-background py-32 ">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-start ">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-4xl leading-tight">
            Tangible results,
            <br />
            right on schedule
          </h1>
          <Button
            variant="outline"
            size="lg"
            className="hidden md:flex items-center gap-2 rounded-full"
          >
            Contact Us <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
