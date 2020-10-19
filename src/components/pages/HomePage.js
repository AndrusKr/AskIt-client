import React from "react"
import QuestionsPane from "../entities/questions/QuestionsPane"
import QuestionsState from "../../context/questions/QuestionsState"

const HomePage = () => {
  return (
    <QuestionsState>
      <main>
        <QuestionsPane />
      </main>
    </QuestionsState>
  )
}

export default HomePage
