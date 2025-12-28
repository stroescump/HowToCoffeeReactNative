import { SliderOption } from "../types";

export function resolveIndex<T extends string>(
  options: SliderOption<T>[],
  value: T | null | undefined,
  fallback: number
) {
  if (!value) return fallback;
  const idx = options.findIndex((option) => option.value === value);
  return idx === -1 ? fallback : idx;
}
