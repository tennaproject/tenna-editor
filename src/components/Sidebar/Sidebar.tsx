import { useUi } from '@store';
import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useMediaQuery } from '@hooks';
import { mergeClass } from '@utils';

const tweenTransition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut',
} as const;

const sidebarVariants: Variants = {
  closed: {
    x: '-100%',
    width: 0,
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
export interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const isSidebarOpen = useUi((s) => s.ui.sidebar.open);
  const isSidebarRetracted = useUi((s) => s.ui.sidebar.retracted);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const baseClass =
    'bg-surface-1 flex flex-col select-none overflow-y-auto scrollbar-none p-2';

  const animationState = isLargeScreen
    ? isSidebarRetracted
      ? 'retracted'
      : 'expanded'
    : isSidebarOpen
      ? 'expanded'
      : 'closed';

  return (
    <motion.aside
      initial={animationState}
      animate={animationState}
      variants={sidebarVariants}
      className={mergeClass(
        baseClass,
        'fixed top-14 left-0 bottom-0 z-40 lg:static lg:top-auto lg:left-auto lg:bottom-auto',
      )}
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
}
