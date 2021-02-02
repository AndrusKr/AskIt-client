import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCounter,
  setErrorMessage,
  setErrorShowed,
  setSeverityStatus,
} from "../../actions/alert";
import { getErrorCounter } from "../../selectors/alert";

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
