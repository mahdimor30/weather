import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ErrorLodingLocation } from "@/components/error-copmonents";
import LoadingSkeleton from "@/components/loading-skeleton";
import Weader from "@/components/weader";

import { LoaderData } from "./loader";



const WeatherDashboard = () => {
  const data = useLoaderData() as LoaderData;

  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <Await
          resolve={Promise.all([
            data.coordinatesDefer,
            data.weatherDefer,
            data.forecastDefer,
            data.locationDefer,
          ])}
          errorElement={<ErrorLodingLocation />}
        >
          <Weader />
        </Await>
      </Suspense>
    </>
  );
};

export default WeatherDashboard;
