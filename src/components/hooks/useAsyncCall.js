import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ERROR } from "../../constants/alerts";
import { useAlert } from "./useAlert";

export const useAsyncCall = (initialAction, initialData = null, initCall) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await initialAction(initialData);
        // const eusers = dispatch(initCall());
        // const [a, eusers] = await Promise.all([initialAction(initialData), dispatch(initCall)]);
        // console.log('eusers', eusers)
        // throw new Error('Hi, ALes!!!')
      } catch (error) {
        console.log('error', error)
        showAlert(ERROR, error.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading;
};
