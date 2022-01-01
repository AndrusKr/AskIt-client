import React, { Fragment, useEffect } from "react";
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
import { SUCCESS } from "../../../constants/alerts";
import { useAlert } from "../../hooks/useAlert";
import { getIsNew, getNickname } from "../../../redux/selectors/auth";

const useStyles = makeStyles(() => ({
  listSubheader: {
    backgroundColor: "white",
  },
}));

const QuestionsPane = () => {
  const showAlert = useAlert();
  const { t } = useTranslation();
  const classes = useStyles();
  const isNew = useSelector(getIsNew);
  const nickname = useSelector(getNickname);
  const activeQuestions = useSelector(
    /*getFilteredAnsweredQuestions*/ getActiveQuestions
  );
  const answeredQuestions = useSelector(getAnsweredQuestions);
  const isErrorShowed = useSelector(getErrorShowed);

  const sendQuestion = (question) =>
    socketClient.sendMsg("/question/create", question);

  useEffect(() => {
    const greetings = isNew ? t("helloNewcomer") : t("welcomeBack");
    showAlert(SUCCESS, `${greetings}, ${nickname}!!!`);
  }, [isNew]);

  useEffect(() => {
    socketClient.isConnected && socketClient.sendMsg("/questions/get");
  }, [socketClient.isConnected]);

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
