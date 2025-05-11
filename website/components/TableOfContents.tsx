// File: /components/TableOfContents.tsx
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TocItem } from '@/lib/build-toc';
import { motion, AnimatePresence } from 'framer-motion';

interface TableOfContentsProps {
  headings: TocItem[];
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export default function TableOfContents({
  headings,
  isOpen,
  onClose,
  accentColor,
}: TableOfContentsProps) {
  // Build cleaned TOC
  const tocItems = useMemo(() => {
    const items = headings.map(h2 => ({
      ...h2,
      children: h2.children.filter(h3 => h3.text.toLowerCase() !== 'references'),
    }));
    let refItem: TocItem | null = null;
    headings.forEach(h2 =>
      h2.children.forEach(h3 => {
        if (h3.text.toLowerCase() === 'references') {
          refItem = { id: h3.id, text: h3.text, children: [] };
        }
      })
    );
    if (refItem) items.push(refItem);
    return [{ id: 'top', text: 'Introduction', children: [] }, ...items];
  }, [headings]);

  // State
  const [activeId, setActiveId]   = useState<string>('');
  const [expanded, setExpanded]   = useState<Record<string, boolean>>(
    () => Object.fromEntries(tocItems.map(item => [item.id, true]))
  );
  const [readIds, setReadIds]     = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navRef                    = useRef<HTMLDivElement>(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Persist scroll position
  useEffect(() => {
    const saved = localStorage.getItem('tocScroll');
    if (navRef.current && saved) {
      navRef.current.scrollTop = parseInt(saved, 10);
    }
  }, []);
  const onNavScroll = () => {
    if (!navRef.current) return;
    localStorage.setItem('tocScroll', String(navRef.current.scrollTop));
  };

  // ─── Scroll-spy & read markers (updated to center trigger) ────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) {
          const nearest = visible
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
            .target.id;
          setActiveId(nearest);
          setReadIds(prev => {
            const nxt = new Set(prev);
            visible.forEach(e => nxt.add(e.target.id));
            return nxt;
          });
        }
      },
      {
        // activate when 50% of the heading enters the center of the viewport
        rootMargin: '-50% 0px -50% 0px',
        threshold: [0.5],
      }
    );

    tocItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) obs.observe(el);
      item.children.forEach(c => {
        const cel = document.getElementById(c.id);
        if (cel) obs.observe(cel);
      });
    });

    return () => obs.disconnect();
  }, [tocItems]);
  // ────────────────────────────────────────────────────────────────────────────

  // Flash on click
  const highlight = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('animate-flash');
    setTimeout(() => el.classList.remove('animate-flash'), 800);
  };

  // Toggle sections
  const toggleSection = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // Precompute previews (browser only)
  const previews = useMemo<Record<string,string>>(() => {
    if (typeof window === 'undefined') return {};
    const map: Record<string,string> = {};
    tocItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        const p = el.nextElementSibling?.querySelector('p');
        if (p?.textContent) map[item.id] = p.textContent.split('. ')[0] + '.';
      }
      item.children.forEach(c => {
        const elc = document.getElementById(c.id);
        if (elc) {
          const p2 = elc.nextElementSibling?.querySelector('p');
          if (p2?.textContent) map[c.id] = p2.textContent.split('. ')[0] + '.';
        }
      });
    });
    return map;
  }, [tocItems]);

  // Counts
  const totalCount = tocItems.reduce((s, it) => s + 1 + it.children.length, 0);
  const readCount  = readIds.size;
  const expandedW  = 320, collapsedW = 32;

  return (
    <>
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          print:hidden
          ${isOpen ? 'fixed inset-0 sm:relative sm:block' : 'hidden sm:block'}
          sm:sticky sm:top-24 sm:bottom-4
          bg-white dark:bg-gray-800 rounded-lg shadow-xl
          flex flex-col overflow-hidden z-10
        `}
        style={{ width: collapsed ? collapsedW : expandedW }}
      >
        {/* Header + Counter */}
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h3 className="text-lg font-semibold text-[var(--toc-accent)]">
                Contents
              </h3>
            )}
            <button
              onClick={() => setCollapsed(c => !c)}
              aria-label={collapsed ? 'Expand TOC' : 'Collapse TOC'}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className={`w-5 h-5 text-[var(--toc-accent)] transform transition-transform ${
                  collapsed ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {!collapsed && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {readCount} / {totalCount} sections read
            </p>
          )}
        </div>

        {/* Close on mobile */}
        {!collapsed && isOpen && (
          <button
            onClick={onClose}
            className="sm:hidden absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            aria-label="Close contents"
          >
            ×
          </button>
        )}

        {/* TOC List */}
        <div
          ref={navRef}
          onScroll={onNavScroll}
          className="flex-1 overflow-y-auto px-2 py-4 toc-scrollbar relative"
        >
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {tocItems.map(item => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <div className="flex items-center justify-between">
                    <a
                      href={`#${item.id}`}
                      onClick={() => highlight(item.id)}
                      onMouseEnter={e => {
                        const tip = previews[item.id];
                        if (!tip) return;
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setTooltip({
                          text: tip,
                          x: rect.right + 8,
                          y: rect.top
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      className={`relative flex-1 pl-6 pr-2 py-1 transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--toc-accent)] font-semibold'
                          : 'hover:text-[var(--toc-accent)]'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--toc-accent)] animate-pulse-once" />
                      )}
                      {item.text}
                    </a>
                    {item.children.length > 0 && (
                      <button
                        onClick={() => toggleSection(item.id)}
                        aria-label={expanded[item.id] ? 'Collapse section' : 'Expand section'}
                        className={`p-1 transform transition-transform ${expanded[item.id] ? 'rotate-180' : ''}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor"
                          className="w-4 h-4 text-[var(--toc-accent)]"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {expanded[item.id] && item.children.length > 0 && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-1 ml-6 space-y-1 overflow-hidden"
                      >
                        {item.children.map(child => {
                          const subActive = activeId === child.id;
                          return (
                            <li key={child.id}>
                              <a
                                href={`#${child.id}`}
                                onClick={() => highlight(child.id)}
                                onMouseEnter={e => {
                                  const tip = previews[child.id];
                                  if (!tip) return;
                                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                                  setTooltip({
                                    text: tip,
                                    x: rect.right + 8,
                                    y: rect.top
                                  });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                className={`relative block pl-6 pr-2 py-1 transition-colors duration-200 ${
                                  subActive
                                    ? 'text-[var(--toc-accent)] font-semibold'
                                    : 'text-gray-500 hover:text-[var(--toc-accent)]'
                                }`}
                              >
                                {subActive && (
                                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--toc-accent)] animate-pulse-once" />
                                )}
                                {child.text}
                              </a>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Tooltip overlay */}
          {tooltip && (
            <div
              className="toc-tooltip"
              style={{ top: tooltip.y, left: tooltip.x }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
