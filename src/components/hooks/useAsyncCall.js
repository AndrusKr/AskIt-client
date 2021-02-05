import { useEffect, useState } from "react";
import { ERROR } from "../../constants/alerts";
import { useAlert } from "./useAlert";

export const useAsyncCall = (initialAction, initialData = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await initialAction(initialData);
        // throw new Error('Hi, ALes!!!')
      } catch (error) {
        showAlert(ERROR, error.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading;
};
