import { useParams, useSearchParams } from "react-router-dom";

import CurrentWeather from "@/components/current-weather";
import { FavoriteButton } from "@/components/favoriite-button";
import { HourlyTemperature } from "@/components/hourly-temerature";
import { WeatherDetails } from "@/components/weather-details";
import { WeatherForecast } from "@/components/weather-forecasr";
import { useWeather } from "@/query/weather";

import { getSearchParams } from "./loader";

function PageComponent() {
  const params = useParams();
  const [search] = useSearchParams();
  const coordinates = getSearchParams(search);

  const { weather } = useWeather(coordinates);

  if (!weather) return null;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weather.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton
          />
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather />
        <HourlyTemperature />
        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetails />
          <WeatherForecast />
        </div>
      </div>
    </div>
  );
}

export default PageComponent;
