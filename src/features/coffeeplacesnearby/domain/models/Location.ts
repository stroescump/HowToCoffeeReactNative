export type LocationPermissionStatus = "granted" | "denied" | "undetermined";

export type Coordinates = {
  lat: number;
  lng: number;
  accuracyMeters?: number;
};
