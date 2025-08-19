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
  id?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  label,
  className = '',
}: CheckboxProps) {
  // Support controlled & uncontrolled usage
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  useEffect(() => {
    if (isControlled) setInternalChecked(checked!);
  }, [checked, isControlled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const currentChecked = isControlled ? checked! : internalChecked;

  return (
    <div
      className={`flex items-center gap-2 select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      <span className="relative inline-flex items-center justify-center">
        <input
          type="checkbox"
          className="absolute inset-0 m-0 w-5 h-5 opacity-0 cursor-pointer"
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-checked={currentChecked}
        />
        <span
          className={`w-5 h-5  borderborder-border flex items-center justify-center transition-colors duration-150
            ${currentChecked ? ' bg-red ' : 'bg-surface-3'}
            ${disabled ? 'pointer-events-none' : 'peer-focus-visible:outline-none peer-focus-visible:ring-1 '}
          `}
          aria-hidden
        >
          {currentChecked ? (
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-current opacity-100 transition-opacity duration-150 text-text-1"
              fill="none"
              strokeWidth={3}
            >
              <path d="M5 13l4 4 10-10" />
            </svg>
          ) : null}
        </span>
      </span>

      <span className="leading-none">
        {label && (
          <span className="text-sm text-text-2 leading-none">{label}</span>
        )}
      </span>
    </div>
  );
}
