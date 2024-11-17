import { RefreshCcw } from "lucide-react";
import { useNavigation, useRevalidator } from "react-router-dom";

import { cn } from "@/lib/utils";

import CurrentWeather from "./current-weather";
import { HourlyTemperature } from "./hourly-temerature";
import { Button } from "./ui/button";
import { WeatherDetails } from "./weather-details";
import { WeatherForecast } from "./weather-forecasr";

function Weader() {
  const revalidator = useRevalidator();
  const navigation = useNavigation();

  const handleRefresh = () => {
    // router(0)
    revalidator.revalidate();
  };

  const isLoding =
    revalidator.state === "loading" || navigation.state === "loading";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight"> My Location</h1>
        <Button
          disabled={isLoding}
          onClick={handleRefresh}
          variant={"outline"}
          size={"icon"}
        >
          <RefreshCcw
            className={cn("size-4", isLoding ? "animate-spin" : "")}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather />
          <HourlyTemperature />
        </div>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetails />
          <WeatherForecast />
        </div>
      </div>
      {/* <br />
      {JSON.stringify(weather)}
      <br />
      <br/>
      {JSON.stringify(forecast, null, 2)}
      <br />
      <br />
      {JSON.stringify(location, null, 2)} */}
    </div>
  );
}

export default Weader;
