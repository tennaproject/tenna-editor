export interface BaseProperties {
  displayName: string;
  description?: string;
  unused?: boolean;
}

export interface WithOverrides<T, A = unknown> {
  getOverrides?: (args: A) => Partial<T>;
}
