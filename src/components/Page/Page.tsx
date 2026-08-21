import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageProps {
  children?: ReactNode;
}
export function Page({ children }: PageProps) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [sectionLinksVisible, setSectionLinksVisible] = useState(false);

  useEffect(() => {
    let revealTimerId: ReturnType<typeof setTimeout> | null = null;

    const cancelReveal = () => {
      if (revealTimerId) {
        clearTimeout(revealTimerId);
        revealTimerId = null;
      }
    };

    const hideSectionLinks = () => {
      cancelReveal();
      setSectionLinksVisible(false);
    };

    // Don't show section links unless ctrl is held down for bit longer
    // Not triggered by accidental ctrl presses or shortcuts like ctrl+c, ctrl+v, etc.
    const syncSectionLinks = (event: KeyboardEvent) => {
      if (!event.ctrlKey || event.key !== 'Control') {
        hideSectionLinks();
        return;
      }

      if (event.type === 'keydown' && revealTimerId === null) {
        revealTimerId = setTimeout(() => {
          revealTimerId = null;
          setSectionLinksVisible(true);
        }, 250);
      }
    };

    window.addEventListener('keydown', syncSectionLinks, true);
    window.addEventListener('keyup', syncSectionLinks, true);
    window.addEventListener('blur', hideSectionLinks);
    return () => {
      cancelReveal();
      window.removeEventListener('keydown', syncSectionLinks, true);
      window.removeEventListener('keyup', syncSectionLinks, true);
      window.removeEventListener('blur', hideSectionLinks);
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    // Skip /share links, which aren't deep-link targets
    let fragment = location.hash.startsWith('#')
      ? location.hash.slice(1)
      : location.hash;
    try {
      fragment = decodeURIComponent(fragment);
    } catch {
      return;
    }
    if (!fragment || fragment.includes('=')) return;

    let highlightTimerId: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver | null = null;

    const id = fragment;
    const scrollToHash = () => {
      const element = document.getElementById(id);
      if (!element) return false;

      element.scrollIntoView({ behavior: 'smooth' });

      if (!reducedMotion) {
        element.animate(
          [
            { boxShadow: '0 0 0 4px var(--color-blue)', offset: 0 },
            { boxShadow: '0 0 0 4px var(--color-blue)', offset: 0.5 },
            { boxShadow: '0 0 0 0 var(--color-blue)' },
          ],
          { duration: 3000, easing: 'ease-out' },
        );
      } else {
        element.style.boxShadow = '0 0 0 8px var(--color-blue)';
        highlightTimerId = setTimeout(() => {
          element.style.boxShadow = '';
        }, 3000);
      }

      return true;
    };

    if (!scrollToHash()) {
      observer = new MutationObserver(() => {
        if (scrollToHash()) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    const giveUpTimerId = window.setTimeout(() => observer?.disconnect(), 2500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(giveUpTimerId);
      if (highlightTimerId) {
        clearTimeout(highlightTimerId);
      }
    };
  }, [location, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeIn' }}
      data-section-links-container=""
      data-section-links-visible={sectionLinksVisible || undefined}
      className="bg-surface-2 h-full flex flex-col min-w-0 min-h-0"
    >
      {children}
    </motion.div>
  );
}
