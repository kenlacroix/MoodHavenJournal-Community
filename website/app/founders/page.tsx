// app/founders/page.tsx
"use client";

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Lock, Pencil, Users, Leaf } from 'lucide-react';

export default function FoundersPage() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Meet the Founder – MoodHaven Journal</title>
        {/* …meta tags… */}
      </Head>

      <main className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        {/* Hero */}
        <header className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden" aria-labelledby="founder-heading">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-[url('/patterns/raindrops.svg')] bg-fixed opacity-20 pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 flex flex-col items-center space-y-6">
            {/* Portrait */}
            <div className="animate-fadeUp delay-200">
              <div className="w-40 h-40 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-neu">
                <Image
                  src="/founder-headshot.png"
                  alt="Portrait of Ken LaCroix"
                  width={160}
                  height={160}
                  placeholder="blur"
                  blurDataURL="/images/founder-headshot-blur.png"
                  priority
                />
              </div>
            </div>
            {/* Title */}
            <h1 id="founder-heading" className="animate-fadeUp delay-300 text-5xl sm:text-4xl font-black tracking-tight text-blue-700 text-center">
              Meet the Founder
            </h1>
            {/* Intro */}
            <p className="animate-fadeUp delay-400 text-lg leading-relaxed tracking-tight text-center max-w-prose">
              Hi, I’m Ken LaCroix — creator of MoodHaven Journal.
            </p>
            {/* Divider */}
            <div className="animate-fadeUp delay-500 w-12 h-0.5 bg-blue-300 rounded-full mt-4 mb-8" aria-hidden="true" />
          </div>
        </header>

        {/* Why It Matters Icons */}
        <section className="bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeUp delay-600">
            <h2 id="values-heading" className="sr-only">Why It Matters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div>
                <Lock className="mx-auto h-8 w-8 text-blue-600" />
                <p className="mt-2 text-sm font-medium">Privacy</p>
              </div>
              <div>
                <Pencil className="mx-auto h-8 w-8 text-blue-600" />
                <p className="mt-2 text-sm font-medium">Mindful Design</p>
              </div>
              <div>
                <Users className="mx-auto h-8 w-8 text-blue-600" />
                <p className="mt-2 text-sm font-medium">Community</p>
              </div>
              <div>
                <Leaf className="mx-auto h-8 w-8 text-blue-600" />
                <p className="mt-2 text-sm font-medium">Growth</p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section
          className="max-w-3xl mx-auto px-4 mt-12 animate-fadeUp delay-700"
          aria-labelledby="bio-heading"
        >
          <div className="bg-gradient-to-b from-orange-50 to-orange-100 ring-1 ring-orange-100 rounded-2xl shadow-neu p-8">
            <h2 id="bio-heading" className="sr-only">Founder Bio</h2>
            <div className="space-y-6 max-w-prose mx-auto">
              <p>
                I started this project because I couldn’t find a journaling space
                that felt safe, calm, and respectful of personal growth. Most
                platforms either felt too clinical, too public, or too commercial.
              </p>
              <p>
                MoodHaven is my response: a labor of love rooted in one belief —
                <strong> your thoughts should stay yours</strong>. No ads. No
                tracking. No pressure. Just a space to write, reflect, and grow.
              </p>
              <p>
                This project is still early — we’re in an alpha community phase,
                and we’re building it together. If you believe in mindful design,
                privacy, and personal growth, I’d love for you to join the
                journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contribute Button */}
        <nav
          className="max-w-3xl mx-auto px-4 mt-6 mb-0 flex justify-center animate-fadeUp delay-800"
          aria-label="Primary action"
        >
          <a
            href="https://github.com/kenlacroix/MoodHavenJournal-Community"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-full transition-transform duration-200 transform hover:scale-105 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            Contribute on GitHub
          </a>
        </nav>
      </main>
    </>
  );
}
