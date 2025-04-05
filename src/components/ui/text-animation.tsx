import React from "react";
import { motion, Variants } from "motion/react";

interface TextAnimateProps {
  children: string;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const characterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  className = "",
}) => {
  const characters = children.split("");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {characters.map((char, index) => (
        <motion.span
          className={className}
          key={index}
          variants={characterVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};
