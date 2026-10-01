import { mergeClass } from '@utils/merge-class';
import type { ReactNode } from 'react';
import { useId, useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  variant?: 'blue' | 'red' | 'green' | 'pink' | 'yellow';
  className?: string;
  fixedHeight?: boolean;
  id?: string;
  ariaLabel?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  label,
  className,
  fixedHeight = false,
  id,
  ariaLabel,
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  const [prevChecked, setPrevChecked] = useState(checked);

  if (checked !== prevChecked) {
    setPrevChecked(checked);
    setInternalChecked(checked ?? false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const currentChecked = isControlled ? checked : internalChecked;

  return (
    <div
      className={mergeClass(
        'flex items-center gap-3 select-none shrink',
        disabled ? 'opacity-50' : '',
        fixedHeight ? 'h-19' : '',
        className,
      )}
    >
      <span className="relative inline-flex items-center justify-center group shrink">
        <input
          id={inputId}
          type="checkbox"
          className={`absolute inset-0 m-0 w-5 h-5 opacity-0 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} peer z-10`}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-checked={currentChecked}
          aria-label={ariaLabel}
        />
        <span
          className={`w-5 h-5 border border-border motion-reduce:transition-none transition-all duration-200 ease-in-out
            shadow-sm hover:shadow-md pointer-events-none z-0
            flex items-center justify-center
            ${
              currentChecked
                ? 'bg-accent border-accent shadow-accent/20 hover:bg-accent/90 hover:shadow-accent/30'
                : 'bg-surface-3 hover:bg-surface-2 hover:border-border/60'
            }
            ${
              disabled
                ? 'shadow-none'
                : 'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent/30 peer-focus-visible:ring-offset-1'
            }
          `}
          aria-hidden
        >
          {currentChecked ? (
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 stroke-current opacity-100 motion-reduce:transition-none transition-all duration-200 ease-in-out text-on-accent drop-shadow-sm"
              fill="none"
              strokeWidth={3.5}
              strokeLinecap="square"
            >
              <path d="M5 13l4 4 10-10" />
            </svg>
          ) : null}
        </span>
      </span>

      <span className="leading-none wrap-anywhere">
        {label && (
          <label
            htmlFor={inputId}
            className={`text-sm text-text-2 leading-none transition-colors duration-150 group-hover:text-text-1 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {label}
          </label>
        )}
      </span>
    </div>
  );
}
