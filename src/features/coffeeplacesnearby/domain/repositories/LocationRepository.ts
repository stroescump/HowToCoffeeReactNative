import { Coordinates, LocationPermissionStatus } from "../models/Location";

export interface LocationRepository {
  getForegroundPermissionStatus(): Promise<LocationPermissionStatus>;
  requestForegroundPermission(): Promise<LocationPermissionStatus>;
  areLocationServicesEnabled(): Promise<boolean>;
  getCurrentLocation(): Promise<Coordinates>;
}
