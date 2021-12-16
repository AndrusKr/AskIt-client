import { useEffect, useState } from "react";

export function useWindowLocation() {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    if (window.location.pathname !== currentLocation) {
      setCurrentLocation(window.location.pathname);
    }
  }, [currentLocation]);

  return currentLocation;
}
