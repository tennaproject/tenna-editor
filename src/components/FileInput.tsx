import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from 'react';

export const FileInput = ({
  onFileSelect,
}: {
  onFileSelect?: (file: File) => void;
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect?.(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      tabIndex={0}
      role="button"
      aria-label="Upload file"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`w-full mx-auto h-40 sm:h-44 flex flex-col items-center justify-center border-2 transition-all duration-200 select-none cursor-pointer outline-none focus:ring-2 focus:ring-surface-3-active text-text-1 px-6 py-4 ${
        isDragActive
          ? 'border-border bg-surface-3'
          : 'border-dashed border-border bg-surface-3 hover:bg-surface-3-hover'
      }`}
      onFocus={() => {
        setIsDragActive(true);
      }}
      onBlur={() => {
        setIsDragActive(false);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleInputChange}
        tabIndex={-1}
      />
      <div className="font-bold mb-2 text-text-1 sm:text-lg lg:text-xl text-center">
        {isDragActive ? 'Drop your file here!' : 'Drag & drop a file here'}
      </div>
      <div className="text-sm sm:text-base text-text-2 text-center">
        or click to select a file
      </div>
    </div>
  );
};
