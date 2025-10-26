import Marquee from "react-fast-marquee";

interface MarqueeListProps {
  items: string[];
  speed?: number;
  gradient?: boolean;
  gradientColor?: string;
  pauseOnHover?: boolean;
  className?: string;
}

export const MarqueeList = ({
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
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-gray-800 hover:underline transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {item}
          </span>
        ))}
      </div>
    </Marquee>
  );
};
