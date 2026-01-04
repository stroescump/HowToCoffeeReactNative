import * as Location from "expo-location";
import { Coordinates, LocationPermissionStatus } from "../../domain/models/Location";
import { LocationRepository } from "../../domain/repositories/LocationRepository";

export class LocationRepositoryImpl implements LocationRepository {
  async getForegroundPermissionStatus(): Promise<LocationPermissionStatus> {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status;
  }

  async requestForegroundPermission(): Promise<LocationPermissionStatus> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status;
  }

  async areLocationServicesEnabled(): Promise<boolean> {
    return Location.hasServicesEnabledAsync();
  }

  async getCurrentLocation(): Promise<Coordinates> {
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracyMeters: position.coords.accuracy ?? undefined,
    };
  }
}
