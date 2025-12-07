export type BrewRecipe = {
    id: string;
    name: string;
    coffeeProductId?: string | null;
    doseGrams: number;
    yieldGrams: number;
    brewTimeSeconds: number;
    temperatureCelsius?: number | null;
    grinderModel?: string | null;
    grindSetting?: string | null;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
}     