import { useApp } from '@contexts';
import React, { type FC, useEffect, useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

export interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { isSidebarOpen, isSidebarRetracted } = useApp();

  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    // Set correct initial state to prevent animation on load
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1024px)').matches;
    }
    return false;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsTransitioning(true);
      setIsLargeScreen(e.matches);

      // Reset transition state after a brief delay
      setTimeout(() => setIsTransitioning(false), 100);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as const;

  const instantTransition = {
    duration: 0,
  } as const;

  const sidebarVariants: Variants = {
    closed: {
      x: '-100%',
      transition: isTransitioning ? instantTransition : springTransition,
    },
    expanded: {
      x: 0,
      width: 200,
      transition: isTransitioning ? instantTransition : springTransition,
    },
    retracted: {
      x: 0,
      width: 60,
      transition: isTransitioning ? instantTransition : springTransition,
    },
  };

  const baseClass =
    'bg-surface-1 flex flex-col select-none overflow-y-auto scrollbar-none pb-2';

  const animationState = useMemo(() => {
    if (isLargeScreen) {
      return isSidebarRetracted ? 'retracted' : 'expanded';
    }
    return isSidebarOpen ? 'expanded' : 'closed';
  }, [isLargeScreen, isSidebarOpen, isSidebarRetracted]);

  return (
    <motion.aside
      initial={animationState}
      animate={animationState}
      variants={sidebarVariants}
      className={`${baseClass} fixed top-14 left-0 bottom-0 z-40 lg:static lg:top-auto lg:left-auto lg:bottom-auto`}
    >
      <motion.nav
        animate={{ opacity: isLargeScreen || isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 p-2 flex flex-col justify-between"
      >
        {children}
      </motion.nav>
    </motion.aside>
  );
};
