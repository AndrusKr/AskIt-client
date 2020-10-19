import React from "react"
import Spinner from "../../layout/Spinner"
import QuestionItem from "./QuestionItem"

const ActiveQuestionsLists = ({ activeQuestions, loading }) => {
  if (activeQuestions && activeQuestions.length === 0) {
    return (
      <h4>There is no active questions yet - Hey;) Be the first one to add!</h4>
    )
  }
  return activeQuestions && !loading ? (
    activeQuestions
      .sort((q1, q2) => {
        if (q1.likes.length < q2.likes.length) {
          return 1
        } else if (q1.likes.length > q2.likes.length) {
          return -1
        } else {
          if (Date.parse(q1.asked) < Date.parse(q2.asked)) {
            return -1
          } else if (Date.parse(q1.asked) > Date.parse(q2.asked)) {
            return 1
          } else {
            return 0
          }
        }
      })
      .map((q) => <QuestionItem question={q} key={q.id} />)
  ) : (
    <Spinner />
  )
}

export default ActiveQuestionsLists
