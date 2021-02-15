import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BottomInput from "../../layout/BottomInput";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { ListSubheader } from "@material-ui/core";
import AnsweredQuestionsList from "./AnsweredQuestionsList";
import ActiveQuestionsList from "./ActiveQuestionsList";
import socketClient from "../../../utils/socketClient";
import {
  getActiveQuestions,
  getAnsweredQuestions,
} from "../../../redux/selectors/questions";
import { getErrorShowed } from "../../../redux/selectors/alert";

const useStyles = makeStyles(() => ({
  listSubheader: {
    backgroundColor: "white",
  },
}));

const QuestionsPane = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const activeQuestions = useSelector(
    /*getFilteredAnsweredQuestions*/ getActiveQuestions
  );
  const answeredQuestions = useSelector(getAnsweredQuestions);
  const isErrorShowed = useSelector(getErrorShowed);

  const sendQuestion = (question) =>
    socketClient.sendMsg("process-question", question);

  return (
    <Fragment>
      <List>
        <ListSubheader
          className={
            isErrorShowed
              ? `${classes.listSubheader} questions-pane questions-pane-trans questions-titles`
              : `${classes.listSubheader} questions-pane-trans questions-titles`
          }
        >
          {t("activeQuestions")}
        </ListSubheader>
        <ActiveQuestionsList activeQuestions={activeQuestions} />
        <ListSubheader className={`${classes.listSubheader} questions-titles`}>
          {t("answeredQuestions")}
        </ListSubheader>
        <AnsweredQuestionsList answeredQuestions={answeredQuestions} />
      </List>
      <BottomInput sendQuestion={sendQuestion} />
    </Fragment>
  );
};

export default QuestionsPane;
