import { Coordinates, LocationPermissionStatus } from "../models/Location";
import { LocationRepository } from "../repositories/LocationRepository";

export async function getLocationPermissionStatus(
  repository: LocationRepository
): Promise<LocationPermissionStatus> {
  return repository.getForegroundPermissionStatus();
}

export async function requestLocationPermission(
  repository: LocationRepository
): Promise<LocationPermissionStatus> {
  return repository.requestForegroundPermission();
}

export async function areLocationServicesEnabled(
  repository: LocationRepository
): Promise<boolean> {
  return repository.areLocationServicesEnabled();
}

export async function getCurrentLocation(
  repository: LocationRepository
): Promise<Coordinates> {
  return repository.getCurrentLocation();
}
