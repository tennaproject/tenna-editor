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

export interface WithOverrides<T, A = unknown> {
  getOverrides?: (args: A) => Partial<T>;
}
