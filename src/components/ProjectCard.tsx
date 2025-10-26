"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  colorClass: string;
  imageUrl?: string;
  index: number;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  colorClass,
  imageUrl,
  index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: false, margin: "-100px" }}
      className="flex-shrink-0 w-[25vw] h-[90vh] rounded-md overflow-hidden relative group cursor-pointer font-primary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div
        className={`w-full h-full ${colorClass} p-8 flex flex-col justify-between relative`}
      >
        {/* Tags */}
        <div className="flex gap-2 flex-wrap z-10 relative">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="bg-black/30 border-white/20 text-white backdrop-blur-m text-sm "
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Project Image */}
        {imageUrl && (
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </div>
      {/* Glassmorphism Overlay */}
      <motion.div
        initial={{ height: "10%" }}
        animate={{ height: isHovered ? "30%" : "10%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 w-full glass-effect flex flex-col items-center justify-start p-6"
      >
        {/* Title - always visible */}
        <h4 className="text-2xl font-semibold text-white mb-2">{title}</h4>

        {/* Description & Badges - slide up from bottom */}
        <motion.div
          initial={{ y: 0, opacity: 0 }} // start lower and invisible
          animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }} // slide up
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4"
        >
          <p className="text-white/90 text-base max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex gap-3 flex-wrap justify-center pt-2">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                className="bg-white/20 border-white/30 text-white text-sm px-4 py-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
