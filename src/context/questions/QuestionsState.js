import React, { useReducer, useEffect } from "react"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
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
import questions from "./questions.json"

import {
  GET_LATEST_QUESTIONS,
  QUESTIONS_ERROR,
  RECEIVED_QUESTION,
} from "../types"

const QuestionsState = (props) => {
  let stompClient
  const initialState = {
    stompClient: null,
    questions: null,
    activeQuestions: null,
    answeredQuestions: null,
    current: null,
    error: null,
  }
  const [state, dispatch] = useReducer(questionsReducer, initialState)
  useEffect(() => {
    questionsConnect()
    // sendQuestion("Hello Andrus!")
    // eslint-disable-next-line
  }, [])

  const questionsConnect = () => {
    let headers = {
      // { Authorization: "Bearer " + localStorage.getItem("jwt") },
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2MDI5NjgzNTgsImV4cCI6MTYwMzA1NDc1OH0.sMEAomRATx9mAgQ0w4h_SOlyQYCEFu5JUjaFOpuzVaw",
    }
    const socket = new SockJS("http://localhost:8080/ws/", null, headers)
    stompClient = Stomp.over(socket)
    console.log(headers)
    stompClient.connect(headers, onConnected, onConnectionError)
  }

  const onConnected = (frame) => {
    console.log("Questions WS Connected: " + frame)
    stompClient.subscribe("/topic/questions", onReceivedQuestion)
  }

  const onReceivedQuestion = (question) => {
    console.log(question)
    dispatch({
      type: RECEIVED_QUESTION,
      payload: question,
    })
  }

  const onConnectionError = (err) => {
    console.log(err)
  }

  const questionsDisconnect = () => {
    if (stompClient !== null) stompClient.disconnect()
    console.log("Questions WS disconnected.")
  }

  const sendQuestion = (question) => {
    stompClient.send("app/sendMessage", {}, JSON.stringify(question))
  }

  const getLatestQuestions = async () => {
    try {
      // const res = await axios.get("/api/questions");
      dispatch({
        type: GET_LATEST_QUESTIONS,
        // payload: res.data,
        payload: questions,
      })
    } catch (err) {
      dispatch({
        type: QUESTIONS_ERROR,
        payload: err.response.msg,
      })
    }
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions: state.questions,
        activeQuestions: state.activeQuestions,
        answeredQuestions: state.answeredQuestions,
        current: state.current,
        error: state.error,
        questionsConnect,
        questionsDisconnect,
        sendQuestion,
        getLatestQuestions,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  )
}

export default QuestionsState
