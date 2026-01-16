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

export type CoffeeOrigin = {
  country: string | null;
  region: string | null;
};

export type CoffeeShop = {
  id: string | null;
  name: string | null;
};

export type TasteAxes = string[];

export type CoffeeProduct = {
  id: string;
  name: string;
  imageUrls: string[] | null;
  roasterId: string | null;
  roasterName: string | null;
  shop: CoffeeShop | null;
  origin: CoffeeOrigin | null;
  roastLevel: RoastLevel | null;
  processing: Processing | null;
  variety: string | null;
  altitudeMeters: number | null;
  roastDate: string | null;
  tastingNotes: string[] | null;
  tasteAxes: TasteAxes | null;
  fullLabelText: string | null;
  marketplaceProductId: string | null;
  curationScore?: number | null;
};

export type CoffeeProductMarketplace = {
  id: string;
  coffeeProduct: CoffeeProduct;
  priceMinor: number | null;
  currency: string | null;
  isAvailable: boolean;
};
