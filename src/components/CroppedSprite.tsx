interface CroppedSpriteProps {
  src: string;
  canvasWidth: number;
  crop: readonly [number, number, number, number];
  scale: number;
}

export function CroppedSprite({
  src,
  canvasWidth,
  crop,
  scale,
}: CroppedSpriteProps) {
  const [left, top, right, bottom] = crop;

  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{
        width: (right - left) * scale,
        height: (bottom - top) * scale,
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute max-w-none"
        style={{
          width: canvasWidth * scale,
          left: -left * scale,
          top: -top * scale,
        }}
      />
    </div>
  );
}
