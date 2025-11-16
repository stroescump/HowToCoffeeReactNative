export function assertNever(x: never): never {
  throw new Error(`Unexpected step: ${x}`);
}

export const toNumber = (value: string): number | null => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};