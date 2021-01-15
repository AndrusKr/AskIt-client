import React, {Fragment, useContext} from "react"
import {useTranslation} from 'react-i18next';
import QuestionContext from "../../../context/questions/questionsContext"
import BottomInput from "../../layout/BottomInput"
import {makeStyles} from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import {ListSubheader} from "@material-ui/core"
import AnsweredQuestionsList from "./AnsweredQuestionsList"
import ActiveQuestionsList from "./ActiveQuestionsList"

const useStyles = makeStyles(() => ({
  listSubheader: {
    backgroundColor: "white",
  },
}))

const QuestionsPane = () => {
  const {t} = useTranslation();
  const classes = useStyles()
  const questionsContext = useContext(QuestionContext)
  const {
    questions,
    activeQuestions,
    answeredQuestions,
    // getLatestQuestions,
    sendQuestion,
    loading,
  } = questionsContext

  return (
    <Fragment>
      <List>
        <ListSubheader className={classes.listSubheader}>
          {t('activeQuestions')}
        </ListSubheader>
        <ActiveQuestionsList
          activeQuestions={activeQuestions}
          loading={loading}
        />
        <ListSubheader className={classes.listSubheader}>
          {t('answeredQuestions')}
        </ListSubheader>
        <AnsweredQuestionsList
          answeredQuestions={answeredQuestions}
          loading={loading}
        />
      </List>
      <BottomInput
        sendQuestion={sendQuestion}
        loading={loading}/>
    </Fragment>
  )
}

export default QuestionsPane
