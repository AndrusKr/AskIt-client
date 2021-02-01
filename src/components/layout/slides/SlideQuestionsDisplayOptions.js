import {ListItem, ListItemText, ListSubheader} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import List from "@material-ui/core/List";
import React from "react";
import {setDisplayedOption, setIsDisplayOptionsOpened} from "../../../actions/slide";
import {useDispatch, useSelector} from "react-redux";
import {getDisplayedOption, getIsDisplayOptionsOpened} from "../../../selectors/slide";


const SlideQuestionsDisplayOptions = ({handleMouseOver, handleMouseLeave}) => {
  const dispatch = useDispatch()
  const isDisplayOptionsOpened = useSelector(getIsDisplayOptionsOpened);
  const displayedOption = useSelector(getDisplayedOption);

  const handleClick = (e) => {
    dispatch(setDisplayedOption(e.target.innerText))
    dispatch(setIsDisplayOptionsOpened(!isDisplayOptionsOpened))
  }

  if (!isDisplayOptionsOpened) {
    return '';
  }

  return (<List
      component="nav"
      subheader={<ListSubheader component="div">Display options</ListSubheader>}
      className={'question-select'}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Popular"/>{displayedOption === 'Popular' && <DoneIcon/>}
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Oldest"/>{displayedOption === 'Oldest' && <DoneIcon/>}
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Recent"/>{displayedOption === 'Recent' && <DoneIcon/>}
      </ListItem>
    </List>
  )
}

export default SlideQuestionsDisplayOptions;