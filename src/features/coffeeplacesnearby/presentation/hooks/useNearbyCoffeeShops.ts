import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";
import { CoffeePlacesRepositoryImpl } from "../../data/repositories/CoffeePlacesRepositoryImpl";
import { LocationRepositoryImpl } from "../../data/repositories/LocationRepositoryImpl";
import { CoffeeShop } from "../../domain/models/CoffeeShop";
import { LocationPermissionStatus } from "../../domain/models/Location";
import {
  areLocationServicesEnabled,
  getCurrentLocation,
  getLocationPermissionStatus,
  requestLocationPermission,
} from "../../domain/usecases/locationUseCases";
import { getNearbyCoffeeShops } from "../../domain/usecases/nearbyCoffeeShopsUseCases";

const coffeePlacesRepository = new CoffeePlacesRepositoryImpl();
const locationRepository = new LocationRepositoryImpl();

const DEFAULT_RADIUS_METERS = 350;
const DEFAULT_LIMIT = 5;
const DEFAULT_ERROR = "Couldn't load nearby coffee places.";

export function useNearbyCoffeeShops() {
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("undetermined");
  const [servicesEnabled, setServicesEnabled] = useState<boolean | null>(null);
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingPermission, setCheckingPermission] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const coords = await getCurrentLocation(locationRepository);
      const page = await getNearbyCoffeeShops(coffeePlacesRepository, {
        location: coords,
        radiusMeters: DEFAULT_RADIUS_METERS,
        limit: DEFAULT_LIMIT,
        offset: 0,
      });
      setShops(page.items);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    setError(null);
    try {
      const status = await requestLocationPermission(locationRepository);
      setPermissionStatus(status);
      const enabled = await areLocationServicesEnabled(locationRepository);
      setServicesEnabled(enabled);
      if (status === "granted" && enabled) {
        await refresh();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, [refresh]);

  const openSettings = useCallback(() => {
    void Linking.openSettings();
  }, []);

  useEffect(() => {
    let active = true;
    const init = async () => {
      try {
        const [status, enabled] = await Promise.all([
          getLocationPermissionStatus(locationRepository),
          areLocationServicesEnabled(locationRepository),
        ]);
        if (!active) return;
        setPermissionStatus(status);
        setServicesEnabled(enabled);
        if (status === "granted" && enabled) {
          await refresh();
        }
      } catch (err) {
        if (active) setError(getErrorMessage(err));
      } finally {
        if (active) setCheckingPermission(false);
      }
    };
    void init();
    return () => {
      active = false;
    };
  }, [refresh]);

  return {
    permissionStatus,
    servicesEnabled,
    shops,
    loading,
    checkingPermission,
    error,
    requestPermission,
    openSettings,
    refresh,
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return DEFAULT_ERROR;
}
