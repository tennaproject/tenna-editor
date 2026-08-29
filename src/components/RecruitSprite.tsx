import { useEffect, useRef, useState } from 'react';
import { mergeClass } from '@utils/merge-class';

interface RecruitImageProps {
  src: string;
  recruited: boolean;
  fit?: boolean;
}

export function RecruitImage({ src, recruited, fit }: RecruitImageProps) {
  const [scaledWidth, setScaledWidth] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* Freeze regardless of the format. Small assets are inlined as data URIs in
     production builds, so the file extension is not reliable here. */
  const freezeFrame = !recruited;

  useEffect(() => {
    if (!freezeFrame) return;

    const image = new Image();
    image.onload = () => {
      setScaledWidth(image.naturalWidth);
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d')?.drawImage(image, 0, 0);
    };
    image.src = src;
  }, [src, freezeFrame]);

  const sharedProps = {
    style: fit ? undefined : scaledWidth ? { width: scaledWidth } : undefined,
    className: mergeClass(
      '[image-rendering:pixelated]',
      fit ? 'max-h-full w-auto max-w-full' : 'max-w-none',
      !recruited && 'grayscale opacity-50',
    ),
  };

  return (
    <div
      className={mergeClass(
        'flex min-w-0 flex-1 items-end justify-center',
        fit && 'h-full',
      )}
    >
      {freezeFrame ? (
        <canvas ref={canvasRef} aria-hidden {...sharedProps} />
      ) : (
        <img
          src={src}
          alt=""
          aria-hidden
          onLoad={(event) => {
            setScaledWidth(event.currentTarget.naturalWidth);
          }}
          {...sharedProps}
        />
      )}
    </div>
  );
}
