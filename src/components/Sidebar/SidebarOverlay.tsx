import { useUi } from '@store';
import { motion } from 'framer-motion';

export function SidebarOverlay() {
  const isSidebarOpen = useUi((s) => s.isSidebarOpen);
  const setSidebarOpen = useUi((s) => s.setSidebarOpen);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="lg:hidden fixed inset-0 top-14 bg-overlay backdrop-blur-[1px] z-30"
        style={{ pointerEvents: isSidebarOpen ? 'auto' : 'none' }}
        onClick={() => {
          setSidebarOpen(false);
        }}
      />
    </>
  );
}
