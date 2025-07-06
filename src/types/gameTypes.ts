import type { DeltaruneSave } from './saveFile';

export interface BaseProperties {
  displayName: string;
  description?: string;
  unused?: boolean;
}

export interface WithOverrides<T> {
  getOverrides?: (save: DeltaruneSave) => Partial<T>;
}

export type ValueType = 'boolean' | 'number' | 'mapped';

export interface FlagProperties extends BaseProperties {
  valueType: ValueType;
  valueMap?: Record<number, string>;

  constraints?: {
    min?: number;
    max?: number;
    allowedValues?: number[];
  };
}
