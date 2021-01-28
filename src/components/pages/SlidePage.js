import React from "react";
import {Container, GridList, GridListTile, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PersonIcon from '@material-ui/icons/Person';
import {getActiveQuestions} from "../../selectors/questions";
import {getMockActiveQuestions} from "../../mock/common";

const SlidePage = (props) => {

  const activeQuestions = useSelector(getActiveQuestions);
  const activeQuestionsPrepared = [...activeQuestions].length ? [...activeQuestions] : getMockActiveQuestions();

   console.log('activeQuestionsPrepared', activeQuestionsPrepared)

  return (
    <div className={'slide-container'}>
      {/*<Container fixed maxWidth={'xs'}>*/}
        <GridList cellHeight={160} className={'ui'} cols={1}>
          {
            [...activeQuestionsPrepared]
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
              }).map(q =>
              <GridListTile key={q.text} cols={1} className={'slide'}>
                  <Typography variant="h6" component="h2" className={'slide-sights'}>
                    <div><PersonIcon />{q.author.nickname}</div>
                    <div>{q.likes.length} <ThumbUpIcon /></div>
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {q.text}
                  </Typography>
              </GridListTile>)
          }
        </GridList>
      {/*</Container>*/}

      <h1>
        Join at http://123.123.123.123
      </h1>
    </div>
  )
}

export default SlidePage;
