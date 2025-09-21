import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageProps {
  children?: ReactNode;
}
export function Page({ children }: PageProps) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        if (!reducedMotion) {
          element.animate(
            [
              { boxShadow: '0 0 0 4px var(--color-blue)' },
              { boxShadow: '0 0 0 0 var(--color-blue)' },
            ],
            { duration: 1500, easing: 'ease-out' },
          );
        } else {
          element.style.boxShadow = '0 0 0 8px var(--color-blue)';
          setTimeout(() => (element.style.boxShadow = ''), 2000);
        }
      }
    }
  }, [location, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeIn' }}
      className="bg-surface-2 h-full flex flex-col min-w-0 min-h-0"
    >
      {children}
    </motion.div>
  );
}
