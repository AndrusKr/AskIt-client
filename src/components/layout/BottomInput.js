import React, {useEffect, useState} from "react"
import {v4 as uuid} from 'uuid';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import TelegramIcon from "@material-ui/icons/Telegram"
import {useSelector} from "react-redux";
import {getFooter} from "../../selectors/language";
import {MIN_QUESTION_LENGTH_ERROR_MESSAGE} from "../../constants/errors";
import {ERROR} from "../../constants/alerts";
import {useAlert} from "../hooks/useAlert";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10,
    marginLeft: "2%",
    marginRight: "2%",
    width: "96%",
  },
  form: {
    width: "100%",
  },
  inputText: {
    width: "100%",
  },
}))

const BottomInput = ({sendQuestion, loading}) => {
  const classes = useStyles()
  const footer = useSelector(getFooter);
  const [questionText, setQuestionText] = useState('')
  const showAlert = useAlert();

  useEffect(() => {
    if (footer) {
      footer.style.paddingBottom = "90px"
    }
  }, [footer])

  const onQuestionTextChange = (e) => {
    setQuestionText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!questionText) {
      return showAlert(ERROR, MIN_QUESTION_LENGTH_ERROR_MESSAGE)
    }

    sendQuestion({
      "id": uuid(),
      "author": {
        "id": "5f6686aa845cbd520ceb599a",
        "nickname": "Jayne"
      },
      text: questionText,
      asked: new Date(),
      "likes": [
        "5f6686aa75ad25fac6f523e8",
        "5f6686aad7ec91be5633b806",
        "5f6686aa149973deb1774e76",
        "5f6686aa9844ff2a3d95ed50",
        "5f6686aa9625e0d6c94dc89f",
        "5f6686aa70020dce89700680",
        "5f6686aae92b06b1f1b7c69b",
        "5f6686aa8634ff8b9f0ed389",
        "5f6686aa7e7b176a20e3c6ec"
      ],
      "answered": null,
      "edited": false
    })
    setQuestionText("")
  }

  const onKeyPress = (e) => {
    // check if enter is pressed
    if (e.charCode === 13 && !e.shiftKey) {
      onSubmit(e)
    }
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <form noValidate className={classes.form}>
          <Grid container>
            <Grid item xs>
              <TextField
                type="text"
                name="questionText"
                className={classes.inputText}
                label="Write Your question here..."
                multiline
                disabled={loading}
                value={questionText}
                onChange={onQuestionTextChange}
                onKeyPress={(e) => onKeyPress(e)}
                autoFocus
              />
            </Grid>
            <IconButton
              type="submit"
              onClick={onSubmit}
              edge="end"
              disabled={loading}
              aria-label="send"
            >
              <TelegramIcon/>
            </IconButton>
          </Grid>
        </form>
      </Toolbar>
    </AppBar>
  )
}

BottomInput.propTypes = {
  sendQuestion: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BottomInput
