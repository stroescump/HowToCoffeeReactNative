export const CoffeeRoast = {
  Light: "LIGHT",
  Medium: "MEDIUM",
  Dark: "DARK",
} as const;

export type CoffeeRoast = (typeof CoffeeRoast)[keyof typeof CoffeeRoast];
