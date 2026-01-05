export type RoastLevel =
  | "LIGHT"
  | "MEDIUM"
  | "DARK"
  | "OMNI"
  | "FILTER"
  | "ESPRESSO"
  | "UNKNOWN";

export type Processing =
  | "NATURAL"
  | "WASHED"
  | "HONEY"
  | "ANAEROBIC"
  | "COFERMENTED";

export type CoffeeProduct = {
  id: string;
  shopName?: string;
  name: string;
  roastLevel: RoastLevel;
  originCountry?: string;
  originRegion?: string;
  processing?: Processing;
  variety?: string;
  altitudeMeters?: number;
  tasteNotes?: string[];
  imageUrl?: string;
  curationScore?: number | null;
};
