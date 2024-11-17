import { createBrowserRouter } from "react-router-dom";

import { ErrorComponent } from "@/components/error-copmonents";
import Layout from "@/components/layout";

import { CityPage } from "./city";
import { loader as loaderWeather, WeatherDashboard } from "./weather";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: WeatherDashboard,
        loader: loaderWeather,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/city",
        children: [
          {
            path: ":cityName",
            Component: CityPage,
          },
        ],
      },
    ],
  },
]);

export default router;
