import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  getQuestionLoading,
} from "../../../redux/selectors/questions";
import {
  putQuestions,
  setQuestionLoading,
} from "../../../redux/actions/questions";
import { getErrorShowed } from "../../../redux/selectors/alert";

const useStyles = makeStyles(() => ({
  listSubheader: {
    backgroundColor: "white",
  },
}));

const QuestionsPane = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeQuestions = useSelector(
    /*getFilteredAnsweredQuestions*/ getActiveQuestions
  );
  const answeredQuestions = useSelector(getAnsweredQuestions);
  const loading = useSelector(getQuestionLoading);
  const isErrorShowed = useSelector(getErrorShowed);

  const sendQuestion = (question) =>
    socketClient.sendMsg("process-question", question);

  // const onReceivedQuestion = (receivedQuestion) => {
  //   dispatch(setQuestionLoading(true));
  //   dispatch(putQuestions(JSON.parse(receivedQuestion.body)));
  // };

  // const isLoading = useAsyncCall(
  //   () => socketClient.subscribeTopic("questions", onReceivedQuestion),
  //   // {
  //   //   action: "questions",
  //   //   handler: onReceivedQuestion,
  //   // }
  // );

  useEffect(() => {
    const onReceivedQuestion = (receivedQuestion) => {
      dispatch(setQuestionLoading(true));
      dispatch(putQuestions(JSON.parse(receivedQuestion.body)));
    };

    (async () => {
      if (socketClient.isConnected) {
        await socketClient.subscribeTopic("questions", onReceivedQuestion);
        dispatch(setQuestionLoading(false));
      }
    })();
  }, []);

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
        <ActiveQuestionsList
          activeQuestions={activeQuestions}
          loading={loading}
        />
        <ListSubheader className={`${classes.listSubheader} questions-titles`}>
          {t("answeredQuestions")}
        </ListSubheader>
        <AnsweredQuestionsList
          answeredQuestions={answeredQuestions}
          loading={loading}
        />
      </List>
      <BottomInput sendQuestion={sendQuestion} loading={loading} />
    </Fragment>
  );
};

export default QuestionsPane;
