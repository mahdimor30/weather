import { AlertTriangle, MapPin } from "lucide-react";
import { useAsyncError, useRevalidator, useRouteError } from "react-router-dom";

import LoadingSkeleton from "./loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

function ErrorLodingLocation({
  description,
  title = "Location Error",
}: {
  description?: string;
  title?: string;
}) {
  const error = useAsyncError() as Error;
  const revalidator = useRevalidator();

  const handleRefresh = () => {
    // router(0)
    revalidator.revalidate();
  };

  if (revalidator.state === "loading") return <LoadingSkeleton />;

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />

      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{description ?? error.message}</p>
        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  );

  return null;
}

const ErrorComponent = () => {
  const error = useRouteError();
  console.log(error);

  return <p className="bg-red-950">Error</p>;
};



export { ErrorComponent, ErrorLodingLocation };
