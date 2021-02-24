import {
  ERROR,
  INFO,
  severityStatuses,
  SUCCESS,
  WARNING,
} from "../constants/alerts";
import { PASSWORD_ERROR, REPEAT_PASSWORD_ERROR } from "../constants/errors";
import {TABLET_WIDTH} from "../constants/dom";

// Description of password checking
// String is > 9 chars
const moreThanRegExp = /(?=^.{9,}$)/;
// Contains a digit
const containsDigitRegExp = /(?=.*[0-9])/;
// Contains an uppercase letter
const uppercaseLetterRegExp = /(?=.*[A-Z])/;
// Contains a lowercase letter
const lowercaseLetterRegExp = /(?=.*[a-z])/;
// A character not being alphanumeric
const notAlphanumeric = /(?=.*[^A-Za-z0-9])/;

export function validatePassword(password) {
  return {
    isMoreThanError: moreThanRegExp.test(password),
    isContainsDigitError: containsDigitRegExp.test(password),
    isUppercaseLetterError: uppercaseLetterRegExp.test(password),
    isLowercaseLetterError: lowercaseLetterRegExp.test(password),
    isNoAlphanumericError: notAlphanumeric.test(password),
  };
}

export function setObjErrors(obj, type) {
  if (type === PASSWORD_ERROR) {
    return {
      isMoreThanError: !obj.isMoreThanError ? "String is > 9 chars" : false,
      isContainsDigitError: !obj.isContainsDigitError
        ? "Contains a digit"
        : false,
      isUppercaseLetterError: !obj.isUppercaseLetterError
        ? "Contains an uppercase letter"
        : false,
      isLowercaseLetterError: !obj.isLowercaseLetterError
        ? "Contains a lowercase letter"
        : false,
      isNoAlphanumericError: !obj.isNoAlphanumericError
        ? "A character not being alphanumeric"
        : false,
    };
  }

  if (type === REPEAT_PASSWORD_ERROR) {
    return { error: "Passwords are not equal!" };
  }

  return {};
}

export const checkObjValues = (obj) => Object.values(obj).every((val) => val);

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

export const isTablet = () => window.innerWidth < TABLET_WIDTH
