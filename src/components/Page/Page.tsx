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
    const syncSectionLinks = (event: KeyboardEvent) => {
      setSectionLinksVisible(event.ctrlKey);
    };
    const hideSectionLinks = () => setSectionLinksVisible(false);

    window.addEventListener('keydown', syncSectionLinks, true);
    window.addEventListener('keyup', syncSectionLinks, true);
    window.addEventListener('blur', hideSectionLinks);
    return () => {
      window.removeEventListener('keydown', syncSectionLinks, true);
      window.removeEventListener('keyup', syncSectionLinks, true);
      window.removeEventListener('blur', hideSectionLinks);
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    let highlightTimerId: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver | null = null;

    const id = location.hash.slice(1);
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

    return () => {
      observer?.disconnect();
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
