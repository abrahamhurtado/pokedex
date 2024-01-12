export const getArrayDepth = (value: Array<unknown> | unknown): number => Array.isArray(value) ?
    1 + Math.max(0, ...value.map(getArrayDepth)) :
    0;
