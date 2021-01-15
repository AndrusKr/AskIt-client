import React, {useEffect} from "react"
import QuestionsPane from "../entities/questions/QuestionsPane"
import QuestionsState from "../../context/questions/QuestionsState"
import socketClient from "../../utils/socketClient";


const HomePage = () => {

  useEffect(() => {
    (async () => {
      await socketClient.connect();
    })();
  }, [])

  return (
    <QuestionsState>
      <main>
        <QuestionsPane/>
      </main>
    </QuestionsState>
  )
}

export default HomePage
