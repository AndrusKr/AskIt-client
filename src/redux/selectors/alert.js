export const getErrorShowed = (state) => state.get("alert").isErrorShowed;
export const getDurationContinuing = (state) =>
  state.get("alert").isDurationContinuing;
export const getErrorTimer = (state) => state.get("alert").errorTimer;
export const getErrorDurationTimer = (state) =>
  state.get("alert").errorDurationTimer;
export const getErrorMessage = (state) => state.get("alert").errorMessage;
export const getErrorCounter = (state) => state.get("alert").errorCounter;
export const getSeverityStatus = (state) => state.get("alert").severityStatus;
