import qrcode from 'qrcode-generator';
import { mergeClass } from '@utils/merge-class';

const ERROR_CORRECTION = 'M';
const QUIET_ZONE = 4;

interface QrCodeProps {
  value: string;
  className?: string;
  moduleColor?: string;
  backgroundColor?: string;
}

export function QrCode({
  value,
  className,
  moduleColor = 'var(--color-text-1)',
  backgroundColor = 'var(--color-surface-1)',
}: QrCodeProps) {
  const code = ((): { path: string; size: number } | null => {
    if (!value) return null;

    try {
      const qr = qrcode(0, ERROR_CORRECTION);
      qr.addData(value);
      qr.make();

      const count = qr.getModuleCount();

      let path = '';
      for (let row = 0; row < count; row += 1) {
        for (let column = 0; column < count; column += 1) {
          if (qr.isDark(row, column)) {
            path += `M${column + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`;
          }
        }
      }

      return { path, size: count + QUIET_ZONE * 2 };
    } catch {
      return null;
    }
  })();

  if (!code) return null;

  return (
    <svg
      viewBox={`0 0 ${code.size} ${code.size}`}
      shapeRendering="crispEdges"
      className={mergeClass('block h-auto w-full', className)}
      aria-hidden="true"
    >
      <rect width={code.size} height={code.size} fill={backgroundColor} />
      <path d={code.path} fill={moduleColor} />
    </svg>
  );
}
