import { useEffect, useState } from "react";

import { Coordinates } from "@/api/type";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeolcation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData({
          coordinates: { lat: latitude, lon: longitude },
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        setLocationData({
          coordinates: null,
          error: errorMessage,
          loading: false,
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };

  // return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //                 resolve(position.coords);
  //             },
  //             (error) => {
  //                 reject(error);
  //             }
  //         );
  //     } else {
  //         reject(new Error("Geolocation is not supported by this browser."));
  //     }
  // }
}

export function getGeolocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          let errorMessage: string;

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          reject(new Error(errorMessage));
        },
      );
    } else {
      reject(
        new Error("Geolocation is not supported by this browser"),
      );
    }
  });
}
