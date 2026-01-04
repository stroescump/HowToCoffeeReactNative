import { Coordinates } from "./Location";

export type NearbyCoffeeShopsQuery = {
  location: Coordinates;
  radiusMeters: number;
  limit: number;
  offset?: number;
};
