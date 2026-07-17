import { useState } from 'react';
import { mergeClass } from '@utils/merge-class';

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
  variant?: 'field' | 'inline';
  autoComplete?: string;
  name?: string;
  id?: string;
  type?: 'text' | 'password' | 'email' | 'search';
  'aria-label'?: string;
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
  variant = 'field',
  autoComplete = 'off',
  name,
  id,
  type = 'text',
  'aria-label': ariaLabel,
}: TextInputProps) {
  const isUncontrolled = controlledValue === undefined;
  const [localValue, setLocalValue] = useState(defaultValue ?? '');

  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);

  if (isUncontrolled && defaultValue !== prevDefaultValue) {
    setPrevDefaultValue(defaultValue);
    if (defaultValue !== undefined) {
      setLocalValue(defaultValue);
    }
  }

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
  const inputClass =
    variant === 'inline'
      ? mergeClass(
          'border border-transparent bg-transparent leading-none text-text-1 motion-reduce:transition-none transition-colors',
          'hover:border-border hover:bg-surface-3/60',
          'focus:border-border focus:bg-surface-3 focus:outline-none focus:ring-1 focus:ring-text-3',
          size === 'small' ? 'h-8 px-2 py-1 text-sm' : 'h-10 px-3 py-2',
        )
      : size === 'small'
        ? 'ui-field h-8 px-2 py-1 text-sm'
        : 'ui-field';
  return (
    <div className={mergeClass('relative', widthClass, className)}>
      <input
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        className={mergeClass(inputClass, 'w-full appearance-none')}
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
