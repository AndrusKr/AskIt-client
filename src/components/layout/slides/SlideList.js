import React from "react";
import { GridList } from "@material-ui/core";
import SlideQuestion from "./SlideQuestion";
import { useSelector } from "react-redux";
import { getDisplayedOption } from "../../../redux/selectors/slide";
import { prepareQuestionOrder, questionFilter } from "../../../utils/helpers";

function SlideList({ activeQuestionsPrepared }) {
  const displayedOption = useSelector(getDisplayedOption);

  return (
    <div className={"slide-container"}>
      <GridList cellHeight={"auto"} cols={1}>
        {
          // [...activeQuestionsPrepared]
          // .sort((q1, q2) => {
          //   return questionFilter(q1, q2, displayedOption);
          // })
          prepareQuestionOrder(activeQuestionsPrepared, displayedOption).map(
            (q) => (
              <div className={"slide"} key={q.text}>
                <SlideQuestion question={q} key={q.text} />
              </div>
            )
          )
        }
      </GridList>
    </div>
  );
}

export default SlideList;
