export type CreateEspressoRecipeRequest = {
    coffeeProductId?: string;     // Known coffee id (marketplace or user-added)
    coffeeDisplayName?: string;   // Free text if no product id available
    shopName?: string;            // Optional when marketplace is running

    doseGrams: number;
    yieldGrams: number;
    brewTimeSeconds: number;

    temperatureCelsius?: number;
    grinderModel?: string;
    grindSetting?: string;
    notes?: string;               // Optional notes screen later
};