// components/HomeClient.tsx
"use client";

import { useEffect, useState, KeyboardEvent, useRef } from "react";
import dynamic from "next/dynamic";
import AnimatedReveal from "./AnimatedReveal";
import { Heart, Lock, Feather } from "lucide-react";
import WaitlistModal from "./WaitlistModal";

const HeroParticles = dynamic(() => import("./HeroParticles"), {
  ssr: false,
});

type Post = {
  link: string;
  title: string;
  date: string;
  snippet: string;
};

type Props = {
  posts: Post[];
};

export default function HomeClient({ posts }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const onCarouselKey = (e: KeyboardEvent) => {
    if (!carouselRef.current) return;
    if (e.key === "ArrowRight") {
      carouselRef.current.scrollBy({ left: 280, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      carouselRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Waitlist Modal Integration */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-28 overflow-hidden md:mask-fade-edges">
        <img
          src="/hero-rain.jpg"
          alt="Rainy background"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-blue-100/10 to-transparent z-0 pointer-events-none" />
        {!isMobile && <HeroParticles />}

        <AnimatedReveal className="relative z-10 max-w-4xl mx-auto text-center px-4 py-8 md:py-10 backdrop-blur-md bg-white/5 rounded-2xl shadow-xl shadow-blue-900/10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Your Private, Calm Space to Reflect
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mt-2">
            MoodHaven Journal gives you a warm, secure corner of the web — where
            your thoughts stay yours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto text-center rounded-full bg-white text-[#3A6EA5] px-6 py-4 text-sm font-semibold shadow transition-all duration-200 ease-out hover:bg-blue-100 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6EA5]/60"
            >
              Join the Waitlist
            </button>
            <a
              href="https://github.com/kenlacroix/MoodHavenJournal-Community"
              target="_blank"
              className="w-full sm:w-auto text-center rounded-full bg-[#F28C38] text-white px-6 py-4 text-sm font-semibold shadow transition-all duration-200 ease-out hover:bg-orange-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              Contribute on GitHub
            </a>
          </div>
        </AnimatedReveal>
      </section>

      {/* Value Props Section */}
      <section className="pt-14 pb-14 bg-[var(--background)] -mt-2">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {["Privacy", "Calm Interface", "Community"].map((label, i) => (
            <AnimatedReveal
              key={label}
              delay={i * 0.2}
              className="space-y-4 p-4 transition-transform duration-300 ease-in-out hover:scale-[1.015] hover:shadow-md hover:shadow-neutral-200/50 rounded-xl"
            >
              <div className="h-20 flex items-end justify-center">
                {label === "Privacy" && (
                  <Lock className="w-16 h-16 text-[#3A6EA5]" />
                )}
                {label === "Calm Interface" && (
                  <Feather className="w-16 h-16 text-[#4A90E2]" />
                )}
                {label === "Community" && (
                  <Heart className="w-16 h-16 text-[#F28C38]" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 tracking-tight">
                {label}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {label === "Privacy" &&
                  "Your entries stay with you. Encrypted and local-first — no cloud, no leaks."}
                {label === "Calm Interface" &&
                  "A soothing, distraction-free design that helps you breathe and reflect."}
                {label === "Community" &&
                  "Connect with others on a similar path."}
              </p>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      {/* Newsletter + Founder Section */}
      <section className="bg-[var(--background)] pt-8 pb-16">
        <div className="mx-auto max-w-[860px] flex flex-col md:flex-row md:justify-between gap-10">
          {/* Newsletter Scroller */}
          <AnimatedReveal className="px-6 py-4 w-full max-w-lg flex flex-col justify-between">
            <h2 className="text-sm font-medium text-neutral-700 mb-2">
              Latest from the Newsletter
            </h2>

            {!isMobile ? (
              <div className="relative overflow-hidden group">
                <div className="flex w-max animate-scroll-slow group-hover:[animation-play-state:paused]">
                  {[...posts, ...posts].map((post, idx) => (
                    <div
                      key={`${post.link}-${idx}`}
                      className="min-w-[260px] flex-shrink-0 bg-white/90 rounded-xl p-4 mr-4"
                    >
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-neutral-900 hover:underline"
                      >
                        {post.title}
                      </a>
                      <p className="text-xs text-neutral-400 mt-1">
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-neutral-600 mt-2">
                        {post.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                ref={carouselRef}
                role="region"
                aria-label="Newsletter carousel"
                tabIndex={0}
                onKeyDown={onCarouselKey}
                className="relative overflow-x-auto whitespace-nowrap snap-x snap-mandatory scrollbar-hide py-2 px-4 cursor-grab hover:cursor-grabbing"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {posts.map((post, idx) => (
                  <div
                    key={`${post.link}-${idx}`}
                    className="inline-block snap-start min-w-[260px] bg-white/90 rounded-xl p-4 mr-4 last:mr-0"
                  >
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-neutral-900 hover:underline"
                    >
                      {post.title}
                    </a>
                    <p className="text-xs text-neutral-400 mt-1">
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-neutral-600 mt-2">
                      {post.snippet}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <a
                href="https://moodhaven.substack.com"
                target="_blank"
                className="block w-full text-center bg-[#F28C38] text-white px-6 py-4 text-sm font-semibold rounded-full hover:bg-orange-500 transition duration-200"
              >
                View All on Substack
              </a>
            </div>
          </AnimatedReveal>

          {/* Founder Card */}
          <AnimatedReveal
            delay={0.2}
            className="px-6 py-4 w-full max-w-lg flex flex-col justify-between items-center md:items-start text-center md:text-left gap-y-6"
          >
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm text-neutral-700 font-semibold">Built by</p>
              <h3 className="text-lg font-bold text-neutral-900">
                Ken LaCroix
              </h3>
              <div className="relative mt-6">
                <div className="absolute inset-0 rounded-full bg-[#F28C38]/10 blur-sm scale-110" />
                <img
                  src="/founder-headshot.png"
                  alt="Ken LaCroix headshot"
                  className="relative w-28 h-28 rounded-full object-cover shadow-md border border-neutral-200"
                />
              </div>
            </div>
            <a
              href="/founders"
              className="block w-full text-center bg-white text-[#F28C38] px-6 py-4 text-sm font-semibold rounded-full border border-[#F28C38]/30 hover:bg-orange-50 transition duration-200"
            >
              Read My Story
            </a>
          </AnimatedReveal>
        </div>
      </section>
    </div>
  );
}
