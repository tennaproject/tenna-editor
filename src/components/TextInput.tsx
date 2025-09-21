import { mergeClass } from '@utils';

interface TextInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  className?: string;
  fullWidth?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  suffix,
  className,
  fullWidth = false,
}: TextInputProps) {
  const widthClass = fullWidth ? 'w-full' : 'w-50';
  return (
    <div className={mergeClass('relative', widthClass, className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full h-11 px-3 py-2 leading-none ${disabled ? 'bg-surface-2 border border-border text-text-2 opacity-40 cursor-not-allowed select-none' : 'bg-surface-3 border border-border text-text-1'}
          ${disabled ? '' : 'focus:outline-none focus:ring-1 motion-reduce:transition-none transition-colors focus:ring-text-3'}
        `}
      />
      {suffix && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-xs text-text-3">{suffix}</span>
        </div>
      )}
    </div>
  );
}
