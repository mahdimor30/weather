import { defer } from "react-router-dom";

import {
    getForecastQuery,
    getGeolocationQuery,
    getReverseGeocodeQuery,
    getWeaderQuery,
  } from "@/query/weather";

async  function loader() {
  return defer({
    coordinatesDefer: getGeolocationQuery(),
    weatherDefer: getWeaderQuery(),
    forecastDefer: getForecastQuery(),
    locationDefer: getReverseGeocodeQuery(),
  });
}

type LoaderData = {
  coordinatesDefer: Awaited<ReturnType<typeof getGeolocationQuery>>;
  weatherDefer: Awaited<ReturnType<typeof getWeaderQuery>>;
  forecastDefer: Awaited<ReturnType<typeof getForecastQuery>>;
  locationDefer: Awaited<ReturnType<typeof getReverseGeocodeQuery>>;
};

export default loader
export { type LoaderData };
