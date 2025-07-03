interface BaseProperties {
  displayName: string;
  description?: string;
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
