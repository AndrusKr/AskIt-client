import {ERROR, INFO, severityStatuses, SUCCESS, WARNING} from "../constants/alerts";

// TODO: it seems, that we can remove this function
// export function showErrorMessage(alertData, severityStatus, message) {
//   const { dispatch, setErrorMessage, setErrorShowed, setSeverityStatus, setErrorCounter, errorCounter } = alertData;
//   dispatch(setErrorMessage(message))
//   dispatch(setErrorShowed(true))
//   dispatch(setSeverityStatus(severityStatus))
//   dispatch(setErrorCounter(errorCounter + 1))
// }

export const setSeverity = (severity) => {
  switch (severity) {
    case ERROR:
      return severityStatuses[ERROR];

    case WARNING:
      return severityStatuses[WARNING];

    case INFO:
      return severityStatuses[INFO];

    case SUCCESS:
      return severityStatuses[SUCCESS];

    default:
      return severityStatuses[ERROR];
  }
}