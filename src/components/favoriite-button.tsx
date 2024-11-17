// src/components/weather/favorite-button.tsx
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "@/hooks/use-toast";
import { useWeather } from "@/query/weather";
import { getSearchParams } from "@/routes/city/loader";

export function FavoriteButton() {
  const [search] = useSearchParams();
  const coordinates = getSearchParams(search);
  const { weather } = useWeather(coordinates);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  if (!weather) return null;

  const isCurrentlyFavorite = isFavorite(weather.coord.lat, weather.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${weather.coord.lat}-${weather.coord.lon}`);
      toast({
        description: `Removed ${weather.name} from Favorites`,
        variant: "destructive",
      });
    } else {
      addFavorite.mutate({
        name: weather.name,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
        country: weather.sys.country,
      });
      toast({
        description: `Added ${weather.name} to Favorites`,
        variant: "default",
      });
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}
