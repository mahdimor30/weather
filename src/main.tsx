import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorComponent } from "./components/error-copmonents";
import Layout from "./components/layout";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/theme-provider";
import { CityPage, loader as loaderCity } from "./routes/city";
import { loader as loaderWeather, WeatherDashboard } from "./routes/weather";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 100,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
            loader: loaderCity,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />;
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
