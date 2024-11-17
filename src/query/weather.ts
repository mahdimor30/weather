import { queryOptions, useQuery } from "@tanstack/react-query";

import { Coordinates } from "@/api/type";
import { weatherApi } from "@/api/weather";
import { getGeolocation } from "@/hooks/use-geolocation";
import { client } from "@/main";

import { WEATHER_KEYS } from "./constant";

export function getSearchOption(query: string) {
  return queryOptions({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherApi.searchLocation(query),
    enabled: query.length >= 3,
  });
}

export function getGeolocationOptions() {
  return queryOptions({
    queryKey: WEATHER_KEYS.coordinates,
    queryFn: () => getGeolocation(),
  });
}

export function getWeather(coordinates: Coordinates | null) {
  return queryOptions({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherApi.getCurrentWeather(coordinates)
        : Promise.resolve(null),
    enabled: !!coordinates,
  });
}

export function getForecast(coordinates: Coordinates | null) {
  return queryOptions({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getForecast(coordinates) : Promise.resolve(null),
    enabled: !!coordinates,
  });
}

export function getReverseGeocode(coordinates: Coordinates | null) {
  return queryOptions({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherApi.reverseGeocoding(coordinates)
        : Promise.resolve(null),
    enabled: !!coordinates,
  });
}

//hooks

export function useSearchLocation(query: string) {
  const search = useQuery(getSearchOption(query));
  return {
    search: search.data,
    searchLoading: search.isLoading,
    searchError: search.error,
  };
}

export const useGeolocation = () => {
  const coordinates = useQuery(getGeolocationOptions());
  return {
    coordinates: coordinates.data,
    coordinatesLoading: coordinates.isLoading,
    coordinatesError: coordinates.error,
  };
};

export const useWeather = (searchCoordinates?: Coordinates
) => {
  const { coordinates } = useGeolocation();
  const weather = useQuery(
    getWeather(searchCoordinates ?? coordinates ?? { lat: 0, lon: 0 }),
  );

  return {
    weather: weather.data,
    weatherLoading: weather.isLoading,
    weatherError: weather.error,
  };
};

export const useForecast = (searchCoordinates?: Coordinates
) => {
  const { coordinates } = useGeolocation();
  const forecast = useQuery(
    getForecast(searchCoordinates ?? coordinates ?? { lat: 0, lon: 0 }),
  );

  return {
    forecast: forecast.data,
    forecastLoading: forecast.isLoading,
    forecastrError: forecast.error,
  };
};

export const useLocation = (searchCoordinates?: Coordinates
) => {
  const { coordinates } = useGeolocation();
  const location = useQuery(
    getReverseGeocode(searchCoordinates ?? coordinates ?? { lat: 0, lon: 0 }),
  );

  return {
    location: location.data,
    locationLoading: location.isLoading,
    locationError: location.error,
  };
};

// fetch Query

export async function getSearchLocationQuery(query: string) {
  return client.fetchQuery(getSearchOption(query));
}

export async function getGeolocationQuery() {
  return await client.fetchQuery(getGeolocationOptions());
}

export async function getWeaderQuery(searchCoordinates?: Coordinates) {
  const coordinates: Coordinates = await getGeolocationQuery();
  return await client.fetchQuery(getWeather(searchCoordinates ?? coordinates));
}

export async function getForecastQuery(searchCoordinates?: Coordinates) {
  const coordinates: Coordinates = await getGeolocationQuery();
  return await client.fetchQuery(getForecast(searchCoordinates ?? coordinates));
}

export async function getReverseGeocodeQuery(searchCoordinates?: Coordinates) {
  const coordinates: Coordinates = await getGeolocationQuery();
  return await client.fetchQuery(
    getReverseGeocode(searchCoordinates ?? coordinates),
  );
}
