'use client';
import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <motion.img
      src="/images/tea-window.jpg"
      alt="Journal and tea in sunlight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="rounded-xl shadow-sm my-6 mx-auto"
    />
  );
}
