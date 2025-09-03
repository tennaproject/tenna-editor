import { mergeClass } from '@utils';

interface GlowBarProps {
  bg: string;
  shadow: string;
  hidden?: boolean;
}

export function GlowBar({
  bg = 'bg-red',
  shadow = 'shadow-red',
  hidden = false,
}: GlowBarProps) {
  return (
    <div
      className={mergeClass(
        'w-full relative',
        hidden ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div
        className={mergeClass(
          'w-full h-1 shadow-2xl relative z-10',
          bg,
          shadow,
        )}
      />
      <div
        className="absolute left-0 right-0 h-1 pointer-events-none"
        style={{ filter: 'blur(8px)', opacity: 0.6 }}
      >
        <div className={mergeClass('w-full h-1', bg)} />
      </div>
    </div>
  );
}
