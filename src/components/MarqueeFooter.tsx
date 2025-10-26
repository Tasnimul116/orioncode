import Marquee from "react-fast-marquee";

interface MarqueeListProps {
  items: string[];
  speed?: number;
  gradient?: boolean;
  gradientColor?: string;
  pauseOnHover?: boolean;
  className?: string;
}

export const MarqueeListFooter = ({
  items,
  speed = 50,
  gradient = true,
  gradientColor = "",
  pauseOnHover = true,
  className = "",
}: MarqueeListProps) => {
  return (
    <Marquee
      speed={speed}
      gradient={gradient}
      gradientColor={gradientColor}
      pauseOnHover={pauseOnHover}
      className={className}
    >
      <div className="flex items-center space-x-16">
        {items.map((item, index) => (
          <span
            key={index}
            className="text-4xl sm:text-6xl md:text-7xl  font-medium text-white hover:underline transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {item}
          </span>
        ))}
      </div>
    </Marquee>
  );
};
