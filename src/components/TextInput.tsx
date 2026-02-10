import { useState, useEffect } from 'react';
import { mergeClass } from '@utils';

interface TextInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onCommit?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  className?: string;
  fullWidth?: boolean;
  size?: 'default' | 'small';
  autoComplete?: string;
}

export function TextInput({
  value: controlledValue,
  defaultValue,
  onChange,
  onCommit,
  onBlur,
  placeholder,
  disabled = false,
  suffix,
  className,
  fullWidth = false,
  size = 'default',
  autoComplete = 'off',
}: TextInputProps) {
  const isUncontrolled = controlledValue === undefined;
  const [localValue, setLocalValue] = useState(defaultValue ?? '');

  // Sync local value when defaultValue changes (for uncontrolled mode)
  useEffect(() => {
    if (isUncontrolled && defaultValue !== undefined) {
      setLocalValue(defaultValue);
    }
  }, [defaultValue, isUncontrolled]);

  const value = isUncontrolled ? localValue : controlledValue;

  const handleChange = (newValue: string) => {
    if (isUncontrolled) {
      setLocalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleBlur = () => {
    if (isUncontrolled) {
      onCommit?.(localValue);
    }
    onBlur?.();
  };

  const widthClass = fullWidth ? 'w-full' : 'w-50';
  const heightClass = size === 'small' ? 'h-8 text-sm' : 'h-11';
  return (
    <div className={mergeClass('relative', widthClass, className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`
          w-full ${heightClass} px-3 py-2 leading-none ${disabled ? 'bg-surface-2 border border-border text-text-2 opacity-40 cursor-not-allowed select-none' : 'bg-surface-3 border border-border text-text-1'}
          ${disabled ? '' : 'focus:outline-none focus:ring-1 motion-reduce:transition-none transition-colors focus:ring-text-3'}
        `}
        data-lpignore="true"
      />
      {suffix && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-xs text-text-3">{suffix}</span>
        </div>
      )}
    </div>
  );
}
