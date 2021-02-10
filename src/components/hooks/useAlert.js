import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCounter,
  setErrorMessage,
  setErrorShowed,
  setSeverityStatus,
} from "../../redux/actions/alert";
import { getErrorCounter } from "../../redux/selectors/alert";

export const useAlert = () => {
  const dispatch = useDispatch();
  const errorCounter = useSelector(getErrorCounter);

  return (severityStatus, message) => {
    dispatch(setErrorMessage(message));
    dispatch(setErrorShowed(true));
    dispatch(setSeverityStatus(severityStatus));
    dispatch(setErrorCounter(errorCounter + 1));
  };
};
