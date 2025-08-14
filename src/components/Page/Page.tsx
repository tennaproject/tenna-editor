import { motion } from 'framer-motion';
import type { FC, ReactNode } from 'react';

interface PageProps {
  children?: ReactNode;
}
export const Page: FC<PageProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className="bg-surface-2 h-full flex flex-col min-w-0 min-h-0"
    >
      {children}
    </motion.div>
  );
};
