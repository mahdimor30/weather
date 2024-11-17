import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ErrorLodingLocation } from "@/components/error-copmonents";
import LoadingSkeleton from "@/components/loading-skeleton";

import PageComponent from "./component";
import { LoaderData } from "./loader";

const CityPage = () => {
  const dataPromis = useLoaderData() as LoaderData;
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await
        resolve={Promise.all([
          dataPromis.weatherDefer,
          dataPromis.forecastDefer,
        ])}
        errorElement={<ErrorLodingLocation />}
      >
        <PageComponent />
      </Await>
    </Suspense>
  );
};

export default CityPage;
