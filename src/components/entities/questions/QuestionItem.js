import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(() => ({
  likeButton: {
    color: "gray",
    borderRadius: 20,
    height: 35,
  },
  likeButtonClicked: {
    color: "#2181C2",
  },
}))

const QuestionItem = ({ question }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const {
    author: { id: authorID, name: authorName },
    text,
    likes,
    asked,
    answered,
    edited,
  } = question

  const getLiked = () => likes.includes("CURRENT_USER_ID")
  const [isLiked, setIsLiked] = useState(getLiked())
  const isOwner = authorID === "CURRENT_USER_ID" ? true : false

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const onLike = () => {
    getLiked()
      ? likes.splice(likes.indexOf("CURRENT_USER_ID"), 1)
      : likes.push("CURRENT_USER_ID")
    setIsLiked(getLiked())
  }

  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <Grid container>
          <Grid container wrap="nowrap">
            <Grid item>
              <ListItemAvatar>
                <Avatar>{authorName.charAt(0)}</Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item>
              <ListItemText
                primary={<b>{authorName}</b>}
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {answered !== null ? `Answered: ${answered}` : asked}
                  </Typography>
                }
              />
            </Grid>

            {isOwner && !answered && (
              <Grid item>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                  {/* https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/dialogs/FullScreenDialog.js */}
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
                  <DeleteIcon />
                </IconButton>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Are you sure this question?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      "{text}"
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            )}
          </Grid>
          <Grid container>{text}</Grid>
          <Grid container justify="flex-end">
            <Button
              disabled={isOwner}
              variant="outlined"
              className={
                isLiked
                  ? `${classes.likeButton} ${classes.likeButtonClicked}`
                  : classes.likeButton
              }
              startIcon={<ThumbUpIcon />}
              onClick={onLike}
            >
              {likes.length}
            </Button>
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" />
    </Fragment>
  )
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
}

export default QuestionItem
