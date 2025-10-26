import React from "react";

const ViewAllLink = ({
  href,
  text = "View All",
  variant = "default",
  className = "",
  onClick,
}: {
  href: string;
  text?: string;
  variant?: "default" | "primary" | "outline" | "gradient";
  className?: string;
  onClick?: () => void;
}) => {
  const AnimatedArrowIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const variants: Record<string, string> = {
    default:
      "bg-black text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-full inline-flex items-center  whitespace-nowrap",
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-full inline-flex items-center  whitespace-nowrap",
    outline:
      "border border-gray-500 text-gray-700 hover:bg-gray-100 transition-colors px-4 py-2 rounded-full inline-flex items-center  whitespace-nowrap",
    gradient:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity px-4 py-2 rounded-full inline-flex items-center  whitespace-nowrap",
  };

  return (
    <a
      href={href}
      className={`group ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span>{text}</span>
      <AnimatedArrowIcon />
    </a>
  );
};

export default ViewAllLink;
