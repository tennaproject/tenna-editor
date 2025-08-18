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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const tweenTransition = {
    type: 'tween',
    duration: 0.2,
    ease: 'easeInOut',
  } as const;

  const sidebarVariants: Variants = {
    closed: {
      x: '-100%',
      transition: tweenTransition,
    },
    expanded: {
      x: 0,
      width: 200,
      transition: tweenTransition,
    },
    retracted: {
      x: 0,
      width: 70,
      transition: tweenTransition,
    },
  };

  const baseClass =
    'bg-surface-1 flex flex-col select-none overflow-y-auto scrollbar-none p-2';

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
        className="flex-1 py-2 flex flex-col justify-between"
      >
        {children}
      </motion.nav>
    </motion.aside>
  );
};
