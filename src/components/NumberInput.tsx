import ArrowUpIcon from '@assets/icons/chevron-up.svg?react';
import ArrowDownIcon from '@assets/icons/chevron-down.svg?react';
import { mergeClass } from '@utils/merge-class';
import { useMemo } from 'react';
import { useTranslation } from '../i18n';
type InputInteger = number | bigint;

interface NumberInputProps<T extends InputInteger> {
  value: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  min?: T;
  max?: T;
  className?: string;
  fullWidth?: boolean;
}

export function NumberInput<T extends InputInteger>({
  value,
  onChange,
  placeholder,
  disabled = false,
  suffix,
  min,
  max,
  className,
  fullWidth = false,
}: NumberInputProps<T>) {
  const { t } = useTranslation();
  const clamp = (v: T) => {
    let next = v;
    if (min !== undefined && next < min) next = min;
    if (max !== undefined && next > max) next = max;
    return next;
  };

  const changeBy = (delta: -1 | 1) => {
    if (disabled) return;
    const next = clamp(
      (typeof value === 'bigint'
        ? value + BigInt(delta)
        : Number(value || 0) + delta) as T,
    );
    onChange?.(next);
  };

  const canDecrement = min === undefined ? true : value > min;
  const canIncrement = max === undefined ? true : value < max;

  const isOutOfRange = useMemo(() => {
    if (min !== undefined && value < min) return true;
    if (max !== undefined && value > max) return true;
    return false;
  }, [value, min, max]);

  const rangeHint = useMemo(() => {
    if (!isOutOfRange) return null;
    if (min !== undefined && max !== undefined) return `${min}–${max}`;
    if (min !== undefined) return `≥ ${min}`;
    if (max !== undefined) return `≤ ${max}`;
    return null;
  }, [isOutOfRange, min, max]);

  const widthClass = fullWidth ? 'w-full' : 'w-50';

  return (
    <div className={mergeClass('relative group', widthClass, className)}>
      <input
        type="search"
        inputMode="numeric"
        value={value.toString()}
        onChange={(e) => {
          const input = e.target.value || '0';
          if (!/^-?\d+$/.test(input)) return;
          const next =
            typeof value === 'bigint' ? BigInt(input) : parseInt(input, 10);
          onChange?.(clamp(next as T));
        }}
        disabled={disabled}
        placeholder={placeholder}
        min={min?.toString()}
        max={max?.toString()}
        className={mergeClass(
          'ui-field',
          'appearance-none',
          isOutOfRange && 'border-danger text-danger',
        )}
        style={{ MozAppearance: 'textfield' }}
        aria-label={placeholder || t('ui.common.numberInput', 'Number input')}
        aria-invalid={isOutOfRange || undefined}
        aria-describedby={
          isOutOfRange ? `${placeholder || 'number'}-range-hint` : undefined
        }
        data-lpignore="true"
        autoComplete="off"
        spellCheck={false}
      />

      {isOutOfRange && rangeHint && (
        <div
          id={`${placeholder || 'number'}-range-hint`}
          className="absolute -bottom-5 left-0 text-xs text-danger"
          role="alert"
        >
          {t('ui.common.range', 'Range:')} {rangeHint}
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
          aria-label={t('ui.common.increaseValue', 'Increase value')}
          onClick={() => {
            changeBy(1);
          }}
          disabled={!canIncrement || disabled}
          className={mergeClass(
            'w-8 h-4 flex items-center justify-center border border-border bg-surface-2 text-text-2 hover:bg-surface-2-hover hover:text-text-1 motion-reduce:transition-none transition-colors',
            (!canIncrement || disabled) && 'opacity-40',
          )}
          title={t('ui.common.increase', 'Increase')}
        >
          <span className="w-3 h-3">
            <ArrowUpIcon />
          </span>
        </button>

        <button
          type="button"
          aria-label={t('ui.common.decreaseValue', 'Decrease value')}
          onClick={() => {
            changeBy(-1);
          }}
          disabled={!canDecrement || disabled}
          className={mergeClass(
            'w-8 h-4 flex items-center justify-center border border-border bg-surface-2 text-text-2 hover:bg-surface-2-hover hover:text-text-1 motion-reduce:transition-none transition-colors',
            (!canDecrement || disabled) && 'opacity-40',
          )}
          title={t('ui.common.decrease', 'Decrease')}
        >
          <span className="w-3 h-3">
            <ArrowDownIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
