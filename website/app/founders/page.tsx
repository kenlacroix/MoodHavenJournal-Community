// app/founders/page.tsx
"use client";

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function FoundersPage() {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Parallax effect on overlay
  useEffect(() => {
    const handleScroll = () => {
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Meet the Founder – MoodHaven Journal</title>
        <meta
          name="description"
          content="Meet Ken LaCroix, creator of MoodHaven Journal—a safe, ad-free space to reflect. Learn why your thoughts should stay yours."
        />
        <meta property="og:title" content="Meet the Founder – MoodHaven Journal" />
        <meta
          property="og:description"
          content="Meet Ken LaCroix, creator of MoodHaven Journal—a safe, ad-free space to reflect. Learn why your thoughts should stay yours."
        />
        <meta property="og:image" content="/founder-headshot.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ken LaCroix",
              url: "https://moodhaven.app/founders",
              jobTitle: "Founder",
              sameAs: [
                "https://github.com/kenlacroix",
                "https://twitter.com/kenlacroix",
              ],
            }),
          }}
        />
      </Head>

      <main className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        {/* Hero */}
        <header
          className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden"
          aria-labelledby="founder-heading"
        >
          {/* Raindrop overlay with parallax */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-[url('/patterns/raindrops.svg')] bg-fixed opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 flex flex-col items-center space-y-6">
            {/* Portrait with neumorphic shadow */}
            <div className="animate-fadeUp delay-200 motion-safe:animate-fadeUp">
              <div className="w-40 h-40 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-neu">
                <Image
                  src="/founder-headshot.png"
                  alt="Portrait of Ken LaCroix, founder of MoodHaven Journal"
                  width={160}
                  height={160}
                  placeholder="blur"
                  blurDataURL="/images/founder-headshot-blur.jpg"
                  priority
                />
              </div>
            </div>

            <h1
              id="founder-heading"
              className="animate-fadeUp delay-300 motion-safe:animate-fadeUp text-5xl sm:text-4xl font-black tracking-tight text-blue-700 text-center"
            >
              Meet the Founder
            </h1>

            <p className="animate-fadeUp delay-400 motion-safe:animate-fadeUp text-lg leading-relaxed tracking-tight text-center max-w-prose">
              Hi, I’m Ken LaCroix — creator of MoodHaven Journal.
            </p>

            {/* Decorative divider */}
            <div
              className="animate-fadeUp delay-500 motion-safe:animate-fadeUp w-12 h-0.5 bg-blue-300 rounded-full mt-4 mb-8"
              aria-hidden="true"
            />
          </div>
        </header>

        {/* Bio with gradient tint & overlap */}
        <section
          className="max-w-2xl mx-auto px-8 sm:px-6 -mt-12 animate-fadeUp delay-600 motion-safe:animate-fadeUp"
          aria-labelledby="bio-heading"
        >
          <div className="bg-gradient-to-b from-orange-50 to-orange-100 ring-1 ring-orange-100 rounded-2xl shadow-neu px-8 sm:px-6 py-6">
            <h2 id="bio-heading" className="sr-only">
              Founder Bio
            </h2>
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

        {/* Primary CTA */}
        <nav
          className="max-w-2xl mx-auto px-4 mt-8 flex justify-center"
          aria-label="Primary action"
        >
          <a
            href="https://github.com/kenlacroix/MoodHavenJournal-Community"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-fadeUp delay-700 motion-safe:animate-fadeUp inline-block bg-blue-600 text-white font-medium text-center px-6 py-3 rounded-full transition-transform duration-200 transform hover:scale-105 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            Contribute on GitHub
          </a>
        </nav>
      </main>
    </>
  );
}
