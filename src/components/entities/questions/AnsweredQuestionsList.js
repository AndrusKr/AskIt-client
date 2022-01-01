import React from "react";
import QuestionItem from "./QuestionItem";
import { useTranslation } from "react-i18next";

const AnsweredQuestionsLists = ({ answeredQuestions }) => {
  const { t } = useTranslation();
  if (!answeredQuestions.size) {
    return <h4>{t("noAnsweredQuestions")}</h4>;
  }

  return [...answeredQuestions]
    .sort((q1, q2) => Date.parse(q1.answered) - Date.parse(q2.answered))
    .map((q) => <QuestionItem question={q} key={q.id} />);
};

export default AnsweredQuestionsLists;
