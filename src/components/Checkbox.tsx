import { mergeClass } from '@utils';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';

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
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  label,
  className,
  fixedHeight = false,
}: CheckboxProps) {
  // Support controlled & uncontrolled usage
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  useEffect(() => {
    if (isControlled) setInternalChecked(checked);
  }, [checked, isControlled]);

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
          type="checkbox"
          className={`absolute inset-0 m-0 w-5 h-5 opacity-0 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} peer z-10`}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-checked={currentChecked}
        />
        <span
          className={`w-5 h-5 border border-border transition-all duration-200 ease-in-out
            shadow-sm hover:shadow-md pointer-events-none z-0
            flex items-center justify-center
            ${
              currentChecked
                ? 'bg-red border-red shadow-red/20 hover:bg-red/90 hover:shadow-red/30'
                : 'bg-surface-3 hover:bg-surface-2 hover:border-border/60'
            }
            ${
              disabled
                ? 'shadow-none'
                : 'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-red/30 peer-focus-visible:ring-offset-1'
            }
          `}
          aria-hidden
        >
          {currentChecked ? (
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 stroke-current opacity-100 transition-all duration-200 ease-in-out text-white drop-shadow-sm"
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
          <span className="text-sm text-text-2 leading-none transition-colors duration-150 group-hover:text-text-1">
            {label}
          </span>
        )}
      </span>
    </div>
  );
}
