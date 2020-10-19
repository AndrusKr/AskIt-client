import React, { useContext, useEffect, Fragment } from "react"
import QuestionContext from "../../../context/questions/questionsContext"
import BottomInput from "../../layout/BottomInput"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import { ListSubheader } from "@material-ui/core"
import AnsweredQuestionsList from "./AnsweredQuestionsList"
import ActiveQuestionsList from "./ActiveQuestionsList"

const useStyles = makeStyles(() => ({
  listSubheader: {
    backgroundColor: "white",
  },
}))

const QuestionsPane = () => {
  const classes = useStyles()
  const questionsContext = useContext(QuestionContext)
  const {
    questions,
    activeQuestions,
    answeredQuestions,
    getLatestQuestions,
    sendQuestion,
    loading,
  } = questionsContext
  useEffect(() => {
    getLatestQuestions()
    // eslint-disable-next-line
  }, [questions])
  return (
    <Fragment>
      <List>
        <ListSubheader className={classes.listSubheader}>
          {"Active Questions"}
        </ListSubheader>
        <ActiveQuestionsList
          activeQuestions={activeQuestions}
          loading={loading}
        />
        <ListSubheader className={classes.listSubheader}>
          {"Answered Questions"}
        </ListSubheader>
        <AnsweredQuestionsList
          answeredQuestions={answeredQuestions}
          loading={loading}
        />
      </List>
      <BottomInput sendQuestion />
    </Fragment>
  )
}

export default QuestionsPane
