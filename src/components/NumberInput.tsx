import ArrowUpIcon from '@assets/icons/chevron-up.svg?react';
import ArrowDownIcon from '@assets/icons/chevron-down.svg?react';
import { mergeClass } from '@utils/merge-class';
import { useMemo } from 'react';

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

  const isOutOfRange = useMemo(() => {
    if (typeof min === 'number' && value < min) return true;
    if (typeof max === 'number' && value > max) return true;
    return false;
  }, [value, min, max]);

  const rangeHint = useMemo(() => {
    if (!isOutOfRange) return null;
    if (typeof min === 'number' && typeof max === 'number')
      return `${min}–${max}`;
    if (typeof min === 'number') return `≥ ${min}`;
    if (typeof max === 'number') return `≤ ${max}`;
    return null;
  }, [isOutOfRange, min, max]);

  const widthClass = fullWidth ? 'w-full' : 'w-50';

  return (
    <div className={mergeClass('relative group', widthClass, className)}>
      <input
        type="search"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange?.(clamp(parseInt(e.target.value || '0', 10)))}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        className={mergeClass(
          'ui-field',
          'appearance-none',
          isOutOfRange && 'border-danger text-danger',
        )}
        style={{ MozAppearance: 'textfield' }}
        aria-label={placeholder || 'Number input'}
        aria-invalid={isOutOfRange || undefined}
        aria-describedby={
          isOutOfRange ? `${placeholder || 'number'}-range-hint` : undefined
        }
        data-lpignore="true"
        autoComplete="off"
      />

      {isOutOfRange && rangeHint && (
        <div
          id={`${placeholder || 'number'}-range-hint`}
          className="absolute -bottom-5 left-0 text-xs text-danger"
          role="alert"
        >
          Range: {rangeHint}
        </div>
      )}

      {suffix && (
        <div className="absolute inset-y-0 right-1 flex items-center pr-3 pointer-events-none group-focus-within:opacity-0 motion-reduce:transition-none transition-all duration-200">
          <span className="text-xs text-text-3">{suffix}</span>
        </div>
      )}

      <div
        className={`
          absolute right-1 top-1 bottom-1 flex flex-col justify-between 
          opacity-0 pointer-events-none transform
          motion-reduce:transition-none transition-all duration-200
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
          className={mergeClass(
            'w-8 h-4 flex items-center justify-center border border-border bg-surface-2 text-text-2 hover:bg-surface-2-hover hover:text-text-1 motion-reduce:transition-none transition-colors',
            (!canIncrement || disabled) && 'opacity-40',
          )}
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
          className={mergeClass(
            'w-8 h-4 flex items-center justify-center border border-border bg-surface-2 text-text-2 hover:bg-surface-2-hover hover:text-text-1 motion-reduce:transition-none transition-colors',
            (!canDecrement || disabled) && 'opacity-40',
          )}
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
