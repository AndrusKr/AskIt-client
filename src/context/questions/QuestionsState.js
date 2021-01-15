import React, {useEffect, useReducer} from "react"

// import axios from "axios"
import QuestionsContext from "./questionsContext"
import questionsReducer from "./questionsReducer"
// https://next.json-generator.com/
// [
//   {
//     'repeat(10, 50)': {
//       id: '{{objectId()}}',
//        author: {
//         id: '{{objectId()}}',
//         username: '{{firstName()}}'
//       },
//       text: '{{lorem(2, "paragraphs")}}',
//       asked:'{{moment(this.date(new Date(2014, 0, 1), new Date(2019, 0, 1))).format()}}',
//       likes: [{'repeat(0,20)': '{{objectId()}}'}],
//       answered(tags) {
//         return Math.random() > 0.5 ?
//           moment(new Date(2019, 0, 1), new Date()).format() : null;
// },
//       edited: false
//     }
//   }
// ]
import socketClient from "../../utils/socketClient";

import {IS_LOADING, QUESTIONS_ERROR, RECEIVED_QUESTION} from "../types"

const QuestionsState = (props) => {
  const initialState = {
    questions: [],
    activeQuestions: [],
    answeredQuestions: [],
    current: null,
    loading: true,
    error: null,
  }
  const [state, dispatch] = useReducer(questionsReducer, initialState)
  useEffect(() => {
      (async () => {
        try {
          await questionsTopicSubscribe()
        } catch (err) {
          dispatch({
            type: QUESTIONS_ERROR,
            payload: err.message,
          })
        } finally {
          dispatch({
            type: IS_LOADING,
            payload: false,
          })
        }
      })();
      // eslint-disable-next-line
    }, []
  )

  const questionsTopicSubscribe = async () => await socketClient.subscribeTopic("questions", onReceivedQuestion)
  const sendQuestion = (question) => socketClient.sendMsg("process-question", question)

  const onReceivedQuestion = (receivedQuestion) => {
    console.log("RECEIVED question " + receivedQuestion.body)
    dispatch({
      type: RECEIVED_QUESTION,
      payload: JSON.parse(receivedQuestion.body),
    })
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions: state.questions,
        activeQuestions: state.activeQuestions,
        answeredQuestions: state.answeredQuestions,
        current: state.current,
        error: state.error,
        loading: state.loading,
        sendQuestion,
        // getLatestQuestions,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  )
}

export default QuestionsState
