type FuncType = (arr: string[]) => string[];

export const removeDuplicateItems: FuncType = (arr) =>
  arr.reduce((acc, value) => {
    if (!acc.includes(value)) acc.push(value);
    return acc;
  }, [] as string[]);
