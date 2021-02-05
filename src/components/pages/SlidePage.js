import React from "react";
import { useSelector } from "react-redux";
import { getActiveQuestions } from "../../redux/selectors/questions";
import { getMockActiveQuestions } from "../../mock/common";
import LastQuestion from "../layout/slides/LastQuestion";
import SlideList from "../layout/slides/SlideList";

const SlidePage = (props) => {
  const activeQuestions = useSelector(getActiveQuestions);
  // TODO: when we have the server - use data from the server instead of the mock
  const activeQuestionsPrepared = [...activeQuestions].length
    ? [...activeQuestions]
    : getMockActiveQuestions();
  const lastQuestion =
    activeQuestionsPrepared.length > 3
      ? activeQuestionsPrepared[activeQuestionsPrepared.length - 1]
      : "";

  return (
    <>
      <SlideList activeQuestionsPrepared={activeQuestionsPrepared} />
      <LastQuestion lastQuestion={lastQuestion} />
    </>
  );
};

export default SlidePage;
