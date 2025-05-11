// components/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaRss,
  FaChevronUp,
} from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedReveal from "./AnimatedReveal";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentYear = new Date().getFullYear();
  const copyright =
    currentYear === 2023
      ? `© 2023 MoodHaven Journal. Built with care by `
      : `© 2023–${currentYear} MoodHaven Journal. Built with care by `;

  return (
    <motion.footer
      role="contentinfo"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full bg-[var(--background)] border-t border-neutral-200 pt-10 pb-14 text-[var(--foreground)]"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Social Icons */}
        <nav
          role="navigation"
          aria-label="Social media links"
          className="flex justify-center items-center flex-wrap gap-6 mb-10"
        >
          {[
            {
              href: "https://moodhaven.substack.com",
              icon: <FaRss />,
              title: "Substack",
            },
            {
              href: "https://github.com/kenlacroix/MoodHavenJournal-Community",
              icon: <FaGithub />,
              title: "GitHub",
            },
            {
              href: "https://x.com/moodhavenapp",
              icon: <FaTwitter />,
              title: "X (Twitter)",
            },
            {
              href: "https://bsky.app/profile/moodhavenapp.bsky.social",
              icon: <SiBluesky />,
              title: "Bluesky",
            },
            {
              href: "https://www.linkedin.com/company/moodhavenapp/",
              icon: <FaLinkedin />,
              title: "LinkedIn",
            },
          ].map((item, index) => (
            <AnimatedReveal key={item.title} delay={index * 0.1}>
              <SocialIcon href={item.href} title={item.title}>
                {item.icon}
              </SocialIcon>
            </AnimatedReveal>
          ))}
        </nav>

        <hr className="border-neutral-200 w-3/4 mx-auto my-6 sm:hidden" />

        {/* Legal Links */}
        <AnimatedReveal delay={0.5}>
          <div className="mb-4 text-sm text-neutral-500 flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </AnimatedReveal>

        {/* Copyright with external link */}
        <AnimatedReveal delay={0.6}>
          <small className="block text-xs sm:text-sm text-neutral-500 tracking-wide">
            {copyright}
            <Link
              href="https://www.kennethlacroix.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#3A6EA5]"
            >
              Ken LaCroix
            </Link>
            .
          </small>
        </AnimatedReveal>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            title="Back to top"
            className="fixed bottom-[5.5rem] sm:bottom-6 right-4 sm:right-6 w-11 h-11 rounded-full bg-white border border-neutral-300 text-[#3A6EA5] shadow-md hover:bg-blue-50 transition-transform hover:scale-105 z-50 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <FaChevronUp size={16} aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}

function SocialIcon({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-neutral-200 shadow-sm text-[var(--foreground)] hover:text-[#3A6EA5] hover:bg-blue-50 transition-transform transform hover:scale-110 duration-200"
    >
      <span className="sr-only">{title}</span>
      {children}
    </Link>
  );
}
