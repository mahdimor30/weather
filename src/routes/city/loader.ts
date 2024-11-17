import { defer, LoaderFunctionArgs } from "react-router-dom";

import { Coordinates } from "@/api/type";
import { getForecastQuery, getWeaderQuery } from "@/query/weather";

export const getSearchParams = (url: URLSearchParams) => {
  const lat = parseFloat(url.get("lat") || "0");
  const lon = parseFloat(url.get("lon") || "0");

  if(lat === 0 || lon === 0) return undefined

  return {
    lat,
    lon,
  } as Coordinates;
};

export function loader({ request }: LoaderFunctionArgs) {
  //   const cityName = params.cityName;

  const url = new URLSearchParams(request.url);

  const coordinates = getSearchParams(url);

  return defer({
    weatherDefer: getWeaderQuery(coordinates),
    forecastDefer: getForecastQuery(coordinates),
  });
}

export type LoaderData = {
  weatherDefer: Awaited<ReturnType<typeof getWeaderQuery>>;
  forecastDefer: Awaited<ReturnType<typeof getForecastQuery>>;
};
