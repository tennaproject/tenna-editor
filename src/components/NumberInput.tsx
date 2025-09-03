import ArrowUpIcon from '@assets/icons/chevron-up.svg';
import ArrowDownIcon from '@assets/icons/chevron-down.svg';
import { mergeClass } from '@utils';

interface NumberInputProps {
  value: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  min?: number;
  max?: number;
  className?: string;
  fullWidth?: boolean;
}

export function NumberInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  suffix,
  min,
  max,
  className,
  fullWidth = false,
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

  const widthClass = fullWidth ? 'w-full' : 'w-50';

  return (
    <div className={mergeClass('relative group', widthClass, className)}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange?.(clamp(parseInt(e.target.value || '0', 10)))}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`
          w-full h-11 px-3 py-2 leading-none ${disabled ? 'bg-surface-2 border border-border text-text-2 opacity-40 cursor-not-allowed select-none' : 'bg-surface-3 border border-border text-text-1'}
          ${disabled ? '' : 'focus:outline-none focus:ring-1 transition-colors focus:ring-text-3'}
          appearance-none
        `}
        style={{ MozAppearance: 'textfield' }}
        aria-label={placeholder || 'Number input'}
      />

      {suffix && (
        <div className="absolute inset-y-0 right-1 flex items-center pr-3 pointer-events-none group-focus-within:opacity-0 transition-all duration-200">
          <span className="text-xs text-text-3">{suffix}</span>
        </div>
      )}

      <div
        className={`
          absolute right-1 top-1 bottom-1 flex flex-col justify-between 
          opacity-0 pointer-events-none transform
          transition-all duration-200
          group-focus-within:opacity-100 group-focus-within:pointer-events-auto 
        `}
      >
        <button
          type="button"
          aria-label="Increase value"
          onClick={() => {
            changeBy(1);
          }}
          disabled={!canIncrement || disabled}
          className={`
            w-8 h-4 flex items-center justify-center border border-border
            bg-surface-2 text-text-2 hover:bg-surface-2-hover hover:text-text-1 transition-colors
            ${!canIncrement || disabled ? 'opacity-40 cursor-not-allowed' : ''}
          `}
          title="Increase"
        >
          <span className="w-3 h-3">
            <ArrowUpIcon />
          </span>
        </button>

        <button
          type="button"
          aria-label="Decrease value"
          onClick={() => {
            changeBy(-1);
          }}
          disabled={!canDecrement || disabled}
          className={`
            w-8 h-4 flex items-center justify-center border border-border
            bg-surface-2 text-text-2 hover:bg-surface-2-hover hover:text-text-1 transition-colors
            ${!canDecrement || disabled ? 'opacity-40 cursor-not-allowed' : ''}
          `}
          title="Decrease"
        >
          <span className="w-3 h-3">
            <ArrowDownIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
