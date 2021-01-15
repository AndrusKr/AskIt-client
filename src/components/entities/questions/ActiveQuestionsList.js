import React, {useState} from "react"
import Spinner from "../../layout/Spinner"
import QuestionItem from "./QuestionItem"

const ActiveQuestionsLists = ({activeQuestions, loading}) => {
  const [isUpdated, setIsUpdated] = useState(false);

  function getArrQuestions() {
    isUpdated ? setIsUpdated(false) : setIsUpdated(true)
  }

  if (loading) {
    return <Spinner/>
  }

  if (activeQuestions.length === 0) {
    return (
      <h4>
        <span>
          There is NO active questions yet 🤷🏻‍♂️ <br/>
          -> Hey;) Be the first one to add!
        </span>
      </h4>
    )
  }

  return activeQuestions
    .sort((q1, q2) => {
      const q1Time = Date.parse(q1.asked)
      const q2Time = Date.parse(q2.asked)
      if (q1.likes.length < q2.likes.length) {
        return 1
      } else if (q1.likes.length > q2.likes.length) {
        return -1
      } else {
        if (q1Time < q2Time) {
          return -1
        } else if (q1Time > q2Time) {
          return 1
        } else {
          return 0
        }
      }
    })
    .map((q) => <QuestionItem question={q} key={q.id} getArrQuestions={getArrQuestions}/>)
}

export default ActiveQuestionsLists
