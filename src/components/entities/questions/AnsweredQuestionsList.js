import React from "react";
import QuestionItem from "./QuestionItem";

const AnsweredQuestionsLists = ({ answeredQuestions }) => {
  if (!answeredQuestions.size) {
    return (
      <h4>
        <span>
          There is NO answered questions yet🙃 <br />
          -> How about rushing the speaker?😜
        </span>
      </h4>
    );
  }

  return [...answeredQuestions]
    .sort((q1, q2) => Date.parse(q1.answered) - Date.parse(q2.answered))
    .map((q) => <QuestionItem question={q} key={q.id} />);
};

export default AnsweredQuestionsLists;
