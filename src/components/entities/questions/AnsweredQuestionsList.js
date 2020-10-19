import React from "react";
import Spinner from "../../layout/Spinner";
import QuestionItem from "./QuestionItem";

const AnsweredQuestionsLists = ({ answeredQuestions, loading }) => {
  if (answeredQuestions && answeredQuestions.length === 0) {
    return (
      <h4>
        There is NO answered questions yet((( - How about rushing the speaker?:)
      </h4>
    );
  }
  return answeredQuestions && !loading ? (
    answeredQuestions
      .sort((q1, q2) => Date.parse(q1.answered) - Date.parse(q2.answered))
      .map((q) => <QuestionItem question={q} key={q.id}/>)
  ) : (
    <Spinner />
  );
};

export default AnsweredQuestionsLists;
