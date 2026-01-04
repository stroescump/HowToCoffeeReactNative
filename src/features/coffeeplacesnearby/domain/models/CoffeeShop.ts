export type CoffeeShop = {
  id: string;
  name: string;
  address?: string;
  distanceMeters: number;
  tags: string[];
  isFeatured: boolean;
  curationScore: number;
  tasteMatchScore?: number;
};
