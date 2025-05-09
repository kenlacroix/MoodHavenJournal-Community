// app/founders/page.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import WaitlistModal from '../../components/WaitlistModal';

interface Milestone {
  date: string;
  title: string;
  description: string;
  projected?: boolean;
}

const milestones: Milestone[] = [
  { date: 'Mar 2025', title: 'Idea Born', description: 'Ken conceives MoodHaven after searching for a safe journaling space.' },
  { date: 'Aug 2025', title: 'Alpha Launch', description: 'Released first alpha to a small community for feedback.', projected: true },
  { date: 'Sep 2025', title: 'Community Growth', description: 'Grew to 100+ alpha users sharing insights and suggestions.', projected: true },
  { date: 'Oct 2025', title: 'Feature Refinement', description: 'Implemented privacy-first encryption and custom prompts.', projected: true },
  { date: 'Nov 2026', title: 'Public Beta', description: 'Preparing for a wider beta—invite your friends and colleagues!', projected: true },
];

export default function FoundersPage() {
  const entryRefs = useRef<Array<HTMLLIElement | null>>(Array(milestones.length).fill(null));
  const [visible, setVisible] = useState<boolean[]>(Array(milestones.length).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute('data-idx'));
            setVisible(v => {
              const copy = [...v]; copy[idx] = true; return copy;
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    entryRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const completed = milestones.filter(m => !m.projected);
  const projected = milestones.filter(m => m.projected);
  const percentComplete = Math.round((completed.length / milestones.length) * 100);

  return (
    <>
      <Head><title>Meet the Founder – MoodHaven Journal</title></Head>
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <main className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased px-4 pt-6 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sidebar: Bio + CTA */}
          <aside className="col-span-1">
            <div className="sticky top-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-auto">
              <div className="portrait-glow relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-neu mx-auto">
                <Image src="/founder-headshot.png" alt="Portrait of Ken LaCroix" width={128} height={128} priority />
              </div>
              <div className="bg-gradient-to-b from-orange-50 to-orange-100 ring-1 ring-orange-100 rounded-2xl p-4 flex flex-col space-y-3">
                <h2 className="text-lg font-bold text-center text-blue-700">Ken LaCroix</h2>
                <p className="text-sm leading-loose">
                  I started this project because I couldn’t find a journaling space that felt safe, calm, and respectful of personal growth. Most platforms either felt too clinical, too public, or too commercial.
                </p>
                <p className="text-sm leading-loose">
                  MoodHaven is my response: a labor of love rooted in one belief — <strong>your thoughts should stay yours</strong>. No ads. No tracking. No pressure. Just a space to write, reflect, and grow.
                </p>
                <p className="text-sm leading-loose">
                  This project is still early — we’re in an alpha community phase, and we’re building it together. If you believe in mindful design, privacy, and personal growth, I’d love for you to join the journey.
                </p>
                <button onClick={() => setIsModalOpen(true)} className="mt-2 bg-orange-500 text-white font-medium text-center px-4 py-2 rounded-full shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  Join the Waitlist
                </button>
                <a href="https://github.com/kenlacroix/MoodHavenJournal-Community" target="_blank" className="mt-2 border border-orange-500 text-orange-500 text-center px-4 py-2 rounded-full shadow hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </aside>

          {/* Timeline Section */}
          <section className="col-span-1 lg:col-span-2">
            <div className="grain bg-[url('/patterns/paper-grain.svg')] bg-cover p-4 lg:p-8 rounded-2xl">
              <h2 className="text-center text-blue-700 text-xl lg:text-2xl font-semibold mb-4">Project Journey Timeline</h2>

              {/* Progress Bar & FAQ link */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 bg-blue-100 rounded-full h-2 mr-4">
                  <div className="bg-blue-500 h-2 rounded-full transition-[width] duration-1000 ease-out" style={{ width: `${percentComplete}%` }} />
                </div>
                <span className="text-xs text-gray-500 mr-4">{percentComplete}% complete</span>
                <a href="/faq" className="text-sm text-blue-600 hover:underline">Read the FAQ</a>
              </div>

              <h3 className="text-lg font-medium text-gray-700 mb-2">Milestones</h3>
              <ol role="list" className="space-y-4 lg:space-y-6 mb-4 lg:mb-6">
                {completed.map((m, idx) => (
                  <motion.li
                    key={idx}
                    data-idx={idx}
                    ref={el => { entryRefs.current[idx] = el; }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={visible[idx] ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="group flex items-start space-x-3 sm:space-x-4 lg:space-x-6"
                  >
                    <div className="flex flex-col items-center mr-3">
                      <span className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white transition-colors group-hover:bg-orange-500" />
                      <span className="w-0.5 flex-1 bg-blue-200" />
                    </div>
                    <div>
                      <h4 className="text-blue-700 font-semibold group-hover:text-orange-600 transition-colors text-sm lg:text-base">{m.title}</h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-700">{m.date}</p>
                      <p className="mt-1 text-sm leading-loose hidden lg:block">{m.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
              <hr className="border-t border-gray-200 my-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Roadmap</h3>
              <ol role="list" className="space-y-4 lg:space-y-6">
                {projected.map((m, idx) => (
                  <li key={idx} className="group flex items-start space-x-3 sm:space-x-4 lg:space-x-6 opacity-60">
                    <div className="flex flex-col items-center mr-3">
                      <span className="w-3 h-3 bg-transparent ring-2 ring-blue-500 rounded-full transition-colors group-hover:bg-orange-500" />
                      {idx < projected.length - 1 && <span className="w-0.5 flex-1 bg-blue-200" />}
                    </div>
                    <div>
                      <h4 className="text-blue-700 font-semibold group-hover:text-orange-600 transition-colors text-sm lg:text-base">
                        {m.title}<span className="ml-2 text-xs bg-gray-200 text-gray-600 px-1 rounded">Projected</span>
                      </h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-700">{m.date}</p>
                      <p className="mt-1 text-sm leading-loose hidden lg:block">{m.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </main>
      {/* Glow animation CSS */}
      <style jsx global>{`
        @keyframes portraitGlow {
          0%   { opacity: 0.2; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(1.1); }
        }
        .portrait-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 9999px;
          background: radial-gradient(circle, #F28C38 0%, transparent 70%);
          animation: portraitGlow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
}
