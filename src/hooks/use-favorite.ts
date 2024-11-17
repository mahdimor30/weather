// src/hooks/use-favorites.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useLocalStorage } from "./use-local-storage";

export interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

const FAVORITES_KEY = "favorites";
const FAVORITES_QUERY_KEY = ["favorites"];

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    FAVORITES_KEY,
    [],
  );
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity, // Since we're managing the data in localStorage
  });

  const generateCityId = (lat: number, lon: number) => `${lat}-${lon}`;

  const invalidateFavorites = () => {
    queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
  };

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,

        id: generateCityId(city.lat, city.lon),
        addedAt: Date.now(),
      };

      // Prevent duplicates
      const exists = favorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorites;

      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },

    onSuccess: invalidateFavorites,
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },

    onSuccess: invalidateFavorites,
  });

  const isFavorite = (lat: number, lon: number) =>
    favorites.some((city) => city.lat === lat && city.lon === lon);

  return {
    favorites: favoritesQuery.data,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
