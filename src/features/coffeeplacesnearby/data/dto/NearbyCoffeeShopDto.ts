export type CoffeeShopDto = {
  id: string;
  name: string;
  address?: string | null;
  tags?: string[] | null;
  isFeatured?: boolean | null;
  curationScore?: number | null;
};

export type NearbyCoffeeShopDto = {
  shop?: CoffeeShopDto | null;
  distanceMeters?: number | null;
  tasteMatchScore?: number | null;
} & CoffeeShopDto;
