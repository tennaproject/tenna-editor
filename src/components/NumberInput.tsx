interface NumberInputProps {
  value: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  min?: number;
  max?: number;
  className?: string;
}

export function NumberInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  suffix,
  min,
  max,
  className = '',
}: NumberInputProps) {
  const clamp = (v: number) => {
    let next = v;
    if (typeof min === 'number') next = Math.max(next, min);
    if (typeof max === 'number') next = Math.min(next, max);
    return next;
  };

  const changeBy = (delta: number) => {
    if (disabled) return;
    const next = clamp(Number(value || 0) + delta);
    onChange?.(next);
  };

  const canDecrement = typeof min !== 'number' ? true : value > min;
  const canIncrement = typeof max !== 'number' ? true : value < max;

  return (
    <div className={`relative group ${className}`}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange?.(clamp(parseInt(e.target.value || '0', 10)))}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`
          w-full px-3 py-2 pr-14 ${disabled ? 'bg-surface-2 border border-border text-text-2 opacity-40 cursor-not-allowed select-none' : 'bg-surface-3 border border-border text-text-1'}
          ${disabled ? '' : 'focus:outline-none focus:ring-1 transition-colors focus:ring-text-3'}
          appearance-none
        `}
        style={{ MozAppearance: 'textfield', WebkitAppearance: 'none' }}
        aria-label={placeholder || 'Number input'}
      />

      {suffix && (
        <div className="absolute inset-y-0 right-10 flex items-center pr-3 pointer-events-none">
          <span className="text-xs text-text-3">{suffix}</span>
        </div>
      )}

      <div
        className={`
          absolute right-1 top-1 bottom-1 flex flex-col items-center justify-center gap-1
          opacity-0 pointer-events-none transform translate-y-0 scale-95
          transition-all duration-150
          group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100
        `}
      >
        <button
          type="button"
          aria-label="Increase value"
          onClick={() => changeBy(1)}
          disabled={!canIncrement || disabled}
          className={`
            w-8 h-6 flex items-center justify-center border border-border
            bg-surface-2 text-text-2 hover:bg-surface-2-hover transition-colors
            ${!canIncrement || disabled ? 'opacity-40 cursor-not-allowed' : ''}
          `}
          title="Increase"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 15l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Decrease value"
          onClick={() => changeBy(-1)}
          disabled={!canDecrement || disabled}
          className={`
            w-8 h-6 flex items-center justify-center border border-border
            bg-surface-2 text-text-2 hover:bg-surface-2-hover transition-colors
            ${!canDecrement || disabled ? 'opacity-40 cursor-not-allowed' : ''}
          `}
          title="Decrease"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
