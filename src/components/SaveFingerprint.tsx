import type { Save } from '@types';
import {
  generateFingerprint,
  getFingerprintInput,
  type FingerprintColor,
} from '@utils/save-fingerprint';

const FILL_CLASS: Record<FingerprintColor, string> = {
  blue: 'fill-blue',
  pink: 'fill-pink',
  green: 'fill-green',
  yellow: 'fill-yellow',
  red: 'fill-red',
};

interface SaveFingerprintProps {
  save: Save;
}

export function SaveFingerprint({ save }: SaveFingerprintProps) {
  const fingerprint = generateFingerprint(getFingerprintInput(save));

  return (
    <svg
      viewBox={`0 0 ${fingerprint.width} ${fingerprint.height}`}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="crispEdges"
      className="block h-full w-full"
    >
      {fingerprint.layers.map((layer) => (
        <path
          key={layer.ink}
          d={layer.path}
          className={FILL_CLASS[layer.fill]}
        />
      ))}
    </svg>
  );
}
