"use client";

import { motion } from "framer-motion";

type AnimatedRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedReveal({
  children,
  className = "",
  delay = 0,
}: AnimatedRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
