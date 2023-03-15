import { useState, useContext } from "react";

import { StoreContext } from "@/context/store-contex";

const useTrackLocation = () => {
  const { setLatLong } = useContext(StoreContext);
  const [locErrMessage, setLocErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const success = (pos) => {
    const { latitude, longitude } = pos.coords;
    setLatLong(`${latitude},${longitude}`);
    setLocErrMessage("");
    setIsLoading(false);
  };
  const error = () => {
    setLocErrMessage("Unable to retrieve your location");
    setIsLoading(false);
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation)
      setLocErrMessage("Geolocation is not supported by your browser");
    else {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { handleTrackLocation, locErrMessage, isLoading };
};

export default useTrackLocation;
