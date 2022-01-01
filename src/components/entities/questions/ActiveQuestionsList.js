import React from "react";
import { useTranslation } from "react-i18next";
import QuestionItem from "./QuestionItem";
import { prepareQuestionOrder } from "../../../utils/helpers";

const ActiveQuestionsLists = ({ activeQuestions }) => {
  const { t } = useTranslation();

  if (!activeQuestions.size) {
    return <h4>{t("noActiveQuestions")}</h4>;
  }

  return prepareQuestionOrder(activeQuestions).map((q) => (
    <QuestionItem question={q} key={q.id} />
  ));
};

export default ActiveQuestionsLists;
