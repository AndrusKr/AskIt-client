import { ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import List from "@material-ui/core/List";
import React from "react";
import {
  setDisplayedOption,
  setIsDisplayOptionsOpened,
} from "../../../redux/actions/slide";
import { useDispatch, useSelector } from "react-redux";
import {
  getDisplayedOption,
  getIsDisplayOptionsOpened,
} from "../../../redux/selectors/slide";
import { useTranslation } from "react-i18next";

const SlideQuestionsDisplayOptions = ({
  handleMouseOver,
  handleMouseLeave,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDisplayOptionsOpened = useSelector(getIsDisplayOptionsOpened);
  const displayedOption = useSelector(getDisplayedOption);

  const handleClick = (e) => {
    dispatch(setDisplayedOption(e.target.innerText));
    dispatch(setIsDisplayOptionsOpened(!isDisplayOptionsOpened));
  };

  if (!isDisplayOptionsOpened) {
    return "";
  }

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div">{t("displayOptions")}</ListSubheader>
      }
      className={"question-select"}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={t("popular")} />
        {displayedOption === t("popular") && <DoneIcon />}
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={t("oldest")} />
        {displayedOption === t("oldest") && <DoneIcon />}
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={t("recent")} />
        {displayedOption === t("recent") && <DoneIcon />}
      </ListItem>
    </List>
  );
};

export default SlideQuestionsDisplayOptions;
