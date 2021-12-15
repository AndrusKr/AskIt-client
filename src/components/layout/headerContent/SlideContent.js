import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import HelpIcon from "@material-ui/icons/Help";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { getActiveQuestions } from "../../../redux/selectors/questions";
import { getMockActiveQuestions } from "../../../mock/common";
import {
  setQuestionArrow,
  setQuestionArrowTimer,
} from "../../../redux/actions/common";
import {
  getQuestionArrow,
  getQuestionArrowTimer,
} from "../../../redux/selectors/common";
import { setIsDisplayOptionsOpened } from "../../../redux/actions/slide";
import { getIsDisplayOptionsOpened } from "../../../redux/selectors/slide";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import SlideQuestionsDisplayOptions from "../slides/SlideQuestionsDisplayOptions";

function SlideHeader({ classes }) {
  const dispatch = useDispatch();
  const activeQuestions = useSelector(getActiveQuestions);
  const isQuestionArrowShowed = useSelector(getQuestionArrow);
  const questionArrowTimer = useSelector(getQuestionArrowTimer);
  const isDisplayOptionsOpened = useSelector(getIsDisplayOptionsOpened);
  const displaysOptions = useRef(null);
  useOutsideClick(displaysOptions);

  // TODO: when we have the server - use data from the server instead of the mock
  const activeQuestionsPrepared = [...activeQuestions].length
    ? [...activeQuestions]
    : getMockActiveQuestions();

  const onMouseOver = () => {
    clearTimeout(questionArrowTimer);
    dispatch(setQuestionArrow(true));
  };
  const onMouseLeave = () => {
    clearTimeout(questionArrowTimer);
    dispatch(
      setQuestionArrowTimer(
        setTimeout(() => dispatch(setQuestionArrow(false)), 2000)
      )
    );
  };

  const handleQuestionsClick = () => {
    dispatch(setIsDisplayOptionsOpened(!isDisplayOptionsOpened));
  };

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        <HelpIcon className={classes.icon} />
        AskIt!
      </Typography>
      <Typography variant="h4" className={classes.slideHeader}>
        HTTP://321.123.123.534
      </Typography>
      <Typography
        ref={displaysOptions}
        variant="h5"
        className={classes.slideHeader}
        onClick={handleQuestionsClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <QuestionAnswerIcon />
        Recent questions ({activeQuestionsPrepared.length})
        <ArrowDropDownIcon
          className={
            isQuestionArrowShowed ? "slide-arrow" : "slide-arrow-disappearing"
          }
        />
      </Typography>
      <SlideQuestionsDisplayOptions
        handleMouseOver={onMouseOver}
        handleMouseLeave={onMouseLeave}
      />
    </>
  );
}

export default SlideHeader;
