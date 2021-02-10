import React, { useEffect } from "react";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getDurationContinuing,
  getErrorCounter,
  getErrorDurationTimer,
  getErrorMessage,
  getErrorShowed,
  getErrorTimer,
  getSeverityStatus,
} from "../../redux/selectors/alert";
import {
  setDurationContinuing,
  setErrorDurationTimer,
  setErrorShowed,
  setErrorTimer,
} from "../../redux/actions/alert";
import { setSeverity } from "../../utils/helpers";

const AlertMessage = () => {
  const dispatch = useDispatch();
  const isDurationContinuing = useSelector(getDurationContinuing);
  const isErrorShowed = useSelector(getErrorShowed);
  const errorTimer = useSelector(getErrorTimer);
  const timerErrorDuration = useSelector(getErrorDurationTimer);
  const errorMessage = useSelector(getErrorMessage);
  const severityStatus = useSelector(getSeverityStatus);
  const errorCounter = useSelector(getErrorCounter);

  const clearTimers = () => {
    clearTimeout(errorTimer);
    clearTimeout(timerErrorDuration);
  };

  const closeErrorsAndDurations = () => {
    dispatch(setErrorShowed(false));
    dispatch(setDurationContinuing(false));
  };

  useEffect(() => {
    clearTimers();

    if (isErrorShowed && isDurationContinuing) {
      dispatch(setDurationContinuing(false));
    }

    if (isErrorShowed) {
      dispatch(
        setErrorTimer(
          setTimeout(() => {
            closeErrorsAndDurations();
          }, 2000)
        )
      );
      dispatch(
        setErrorDurationTimer(
          setTimeout(() => {
            dispatch(setDurationContinuing(true));
          }, 1000)
        )
      );
    }

    return () => {
      clearTimers();
    };
  }, [isErrorShowed, errorCounter]);

  const onMouseLeave = () => {
    dispatch(setDurationContinuing(false));
    dispatch(
      setErrorDurationTimer(
        setTimeout(() => {
          dispatch(setDurationContinuing(true));
        }, 1000)
      )
    );

    clearTimeout(errorTimer);
    dispatch(
      setErrorTimer(
        setTimeout(() => {
          closeErrorsAndDurations();
        }, 2000)
      )
    );
  };

  const onMouseOver = () => {
    clearTimers();
    dispatch(setDurationContinuing(true));
  };

  if (isErrorShowed) {
    return (
      <Alert
        severity={setSeverity(severityStatus)}
        onClose={closeErrorsAndDurations}
        className={
          isDurationContinuing
            ? "error-message error-disappearing"
            : "error-message error-active"
        }
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
      >
        <AlertTitle>{errorMessage}</AlertTitle>
      </Alert>
    );
  }

  return "";
};

export default AlertMessage;
