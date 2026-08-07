export interface BaseProperties {
  displayName: string;
  description?: string;
  unused?: boolean;
}

export interface EquipmentStats {
  attack: number;
  defence: number;
  magic: number;
}

// Fills {token} placeholders in a shared ability description
export type AbilityValues = Record<string, string | number>;

export interface WithOverrides<T, A = unknown> {
  getOverrides?: (args: A) => Partial<T>;
}
