export function createEntityHelpers<
  TIndex extends number,
  TName extends string,
  TProperties,
>(registry: Record<TName, TIndex>, definitions: Record<TIndex, TProperties>) {
  return {
    getIndex: (name: TName): TIndex => registry[name],
    getById: (id: TIndex): TProperties => definitions[id],
    getByName: (name: TName): TProperties => definitions[registry[name]],
    getName: (id: TIndex): TName | undefined => {
      return Object.entries(registry).find(
        ([_, value]) => value === id,
      )?.[0] as TName | undefined;
    },
    getAllNames: (): TName[] => Object.keys(registry) as TName[],
    getAll: (): Array<TProperties & { id: TIndex }> => {
      return Object.entries(registry).map(([_, id]) => ({
        id: id as TIndex,
        ...definitions[id as TIndex],
      }));
    },
  };
}
