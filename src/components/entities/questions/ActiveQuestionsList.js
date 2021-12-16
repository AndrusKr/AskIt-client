import React from "react";
import QuestionItem from "./QuestionItem";
import { prepareQuestionOrder } from "../../../utils/helpers";

const ActiveQuestionsLists = ({ activeQuestions }) => {
  if (!activeQuestions.size) {
    return (
      <h4>
        There is NO active questions yet 🤷🏻‍♂️ <br />
        -> Hey;) Be the first one to add!
      </h4>
    );
  }

  return prepareQuestionOrder(activeQuestions).map((q) => (
    <QuestionItem question={q} key={q.id} />
  ));
};

export default ActiveQuestionsLists;
