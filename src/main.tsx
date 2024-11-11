import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import CityPage from "./routes/city-page";
import WeatherDashboard from "./routes/weather-dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: WeatherDashboard,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />;
    </ThemeProvider>
  </React.StrictMode>
);
