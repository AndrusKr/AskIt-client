import React from "react";
import Spinner from "../../layout/Spinner";
import QuestionItem from "./QuestionItem";
import { prepareQuestionOrder, questionFilter } from "../../../utils/helpers";

const ActiveQuestionsLists = ({ activeQuestions, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  if (!activeQuestions.size) {
    return (
      <h4>
        There is NO active questions yet 🤷🏻‍♂️ <br />
        -> Hey;) Be the first one to add!
      </h4>
    );
  }

  // return [...activeQuestions]
  //   .sort((q1, q2) => {
  //     return questionFilter(q1, q2);
  //   })
  return prepareQuestionOrder(activeQuestions).map((q) => (
    <QuestionItem question={q} key={q.id} />
  ));
};

export default ActiveQuestionsLists;
