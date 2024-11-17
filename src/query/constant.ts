import { Coordinates } from "@/api/type";

export const WEATHER_KEYS = {
    weather:(coords:Coordinates) => ["weather", coords] as const,
    forecast:(coords:Coordinates) => ["forecast", coords] as const,
    location:(coords:Coordinates) => ["location", coords] as const,
    coordinates:["coordinates"] as const,
    search:(query:string) => ["location-search", query] as const,
}