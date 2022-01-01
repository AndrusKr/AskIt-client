import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuestionLikes,
  removeQuestion,
  setPinnedQuestion,
  setQuestionData,
  setQuestionLoading,
  setUnpinQuestion,
} from "../../../redux/actions/questions";
import ModalWindow from "../../layout/modals/dialog";
import { useModal } from "../../hooks/useModal";
import { getAuthId, getIsAdmin } from "../../../redux/selectors/auth";
import { getUserStatus } from "../../../redux/selectors/user";

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: ({ isOwner }) => (isOwner ? "blue" : ""),
  },
  likeButton: {
    color: "gray",
    borderRadius: 20,
    height: 35,
  },
  likeButtonClicked: {
    color: "#2181C2",
  },
}));

const QuestionItem = ({ question }) => {
  const {
    id,
    text,
    askTime,
    answerTime,
    lastEditedAt,
    likedUserIds,
    isPinned,
    author: { authorId, authorNickname },
  } = question;

  const authUserId = useSelector(getAuthId);
  const isOwner = authorId === authUserId;
  const classes = useStyles({ isOwner });
  const dispatch = useDispatch();
  const isUserAdmin = useSelector(getIsAdmin);
  const isBlocked = useSelector(getUserStatus);
  const [openModal, handleOpen, handleClose] = useModal();
  const [isUpArrowShown, setIsUpArrowShown] = useState(false);

  const handleMouseOver = () => setIsUpArrowShown(true);
  const handleMouseLeave = () => setIsUpArrowShown(false);
  const handlePinQuestion = () => {
    if (isPinned) {
      return dispatch(setUnpinQuestion(id));
    }
    return dispatch(setPinnedQuestion(id));
  };

  const handleEdit = () =>
    dispatch(setQuestionData({ text, isEditActive: true, id }));

  const handleDelete = () => {
    // TODO: here should be saga (API call to the server) for delete the question
    dispatch(setQuestionLoading(true));
    dispatch(removeQuestion(id));
    handleClose();
  };

  const fmtTime = (timeStr) =>
    new Intl.DateTimeFormat("be", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hourCycle: "h23",
    }).format(new Date(timeStr));

  const onLike = () => {
    if (likedUserIds.includes(authUserId)) {
      question.likes = likedUserIds.filter(
        (_, idx) => likedUserIds.indexOf(authUserId) !== idx
      );
    } else {
      question.likes = [...likedUserIds, authUserId];
    }

    dispatch(changeQuestionLikes(question));
  };

  return (
    <Fragment>
      <ListItem
        alignItems="flex-start"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={isPinned ? "pinned-question" : ""}
      >
        <Grid container>
          <Grid container wrap="nowrap">
            <Grid item>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {authorNickname.charAt(0)}
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <ListItemText
                primary={<b>{authorNickname} </b>}
                secondary={
                  <>
                    <Typography variant="caption" color="textSecondary">
                      {answerTime !== null
                        ? `Answered: ${fmtTime(answerTime)}`
                        : fmtTime(askTime)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {lastEditedAt && `Edited: ${fmtTime(lastEditedAt)}`}
                    </Typography>
                  </>
                }
              />
            </Grid>

            {((isOwner && !isBlocked) || isUserAdmin) && !answerTime && (
              <Grid item>
                <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
                  <EditIcon />
                  {/* https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/dialogs/FullScreenDialog.js */}
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
                  <DeleteIcon />
                </IconButton>
                <ModalWindow
                  openModal={openModal}
                  handleCloseModal={handleClose}
                  submitChange={handleDelete}
                  dialogTitle="Are you sure you want to delete this question"
                  buttonName="Delete"
                  contentText={text}
                  buttonType="secondary"
                />
              </Grid>
            )}
            {isUserAdmin && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handlePinQuestion}
                className={isUpArrowShown ? "" : "edit-close-icon-hidden"}
              >
                {isPinned ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              </IconButton>
            )}
          </Grid>
          <Grid container>{text}</Grid>
          <Grid container justifyContent="flex-end">
            <Button
              disabled={isOwner || isBlocked}
              variant="outlined"
              className={
                likedUserIds.includes(authUserId)
                  ? `${classes.likeButton} ${classes.likeButtonClicked}`
                  : classes.likeButton
              }
              startIcon={<ThumbUpIcon />}
              onClick={onLike}
            >
              {likedUserIds.length}
            </Button>
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" />
    </Fragment>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionItem;
