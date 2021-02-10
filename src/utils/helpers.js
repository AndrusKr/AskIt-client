import {
  ERROR,
  INFO,
  severityStatuses,
  SUCCESS,
  WARNING,
} from "../constants/alerts";

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
};

const checkQuestionTime = (q1Time, q2Time, displayedOption) => {
  if (displayedOption === "Recent") {
    if (q1Time < q2Time) {
      return -1;
    } else if (q1Time > q2Time) {
      return 1;
    }
  }

  if (displayedOption === "Oldest") {
    if (q1Time > q2Time) {
      return -1;
    } else if (q1Time < q2Time) {
      return 1;
    }
  }

  return 0;
};

export function questionFilter(q1, q2, displayedOption) {
  const q1Time = Date.parse(q1.asked);
  const q2Time = Date.parse(q2.asked);

  if (["Oldest", "Recent"].includes(displayedOption)) {
    return checkQuestionTime(q1Time, q2Time, displayedOption);
  }

  if (q1.likes.length < q2.likes.length) {
    return 1;
  } else if (q1.likes.length > q2.likes.length) {
    return -1;
  }
  return checkQuestionTime(q1Time, q2Time);
}

export function prepareQuestionOrder(questions, displayedOption) {
  const pinnedItem = [...questions].find((i) => i.isPinned === true);
  const preparedArr = [...questions].sort((q1, q2) => {
    return questionFilter(q1, q2, displayedOption);
  });

  if (pinnedItem) {
    return [pinnedItem, ...preparedArr.filter((i) => i.isPinned === false)];
  }

  return preparedArr;
}
