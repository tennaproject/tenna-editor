import type { ReactNode } from 'react';
import { NumberInput } from './NumberInput';
import { FieldWrapper } from './FieldWrapper';
type InputInteger = number | bigint;

interface NumberFieldProps<T extends InputInteger> {
  id?: string;
  className?: string;
  title: string;
  titleIcon?: ReactNode;
  description?: string;
  flag?: number;
  value: T;
  placeholder?: string;
  min?: T;
  max?: T;
  fullWidth?: boolean;
  onChange: (value: T) => void;
}

export function NumberField<T extends InputInteger>({
  id,
  className,
  title,
  titleIcon,
  description,
  flag,
  value,
  placeholder,
  min,
  max,
  fullWidth,
  onChange,
}: NumberFieldProps<T>) {
  return (
    <FieldWrapper
      id={id}
      className={className}
      title={title}
      titleIcon={titleIcon}
      description={description}
      flag={flag}
      label
    >
      <NumberInput
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={onChange}
        fullWidth={fullWidth}
      />
    </FieldWrapper>
  );
}
