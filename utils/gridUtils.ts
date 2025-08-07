
export const createEmptyGrid = (value: string, size: number): string[][] => {
    return Array.from({ length: size }, () => Array.from({ length: size }, () => value));
};
