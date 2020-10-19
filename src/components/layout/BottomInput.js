import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import TelegramIcon from "@material-ui/icons/Telegram"

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

const BottomInput = ({ sendQuestion }) => {
  const classes = useStyles()
  useEffect(() => {
    let footer = document.getElementsByTagName("footer")[0]
    footer.style.paddingBottom = "90px"
    // eslint-disable-next-line
  }, [])
  const [question, setQuestion] = useState({
    name: "",
    phone: "",
    email: "",
    type: "personal",
  })
  const { name, phone, email, type } = question

  const [questionText, setQuestionText] = useState("")

  const onQuestionTextChange = (e) => setQuestionText(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(questionText)
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
                value={questionText}
                onChange={onQuestionTextChange}
                autoFocus
              />
            </Grid>
            <IconButton
              type="submit"
              onClick={onSubmit}
              edge="end"
              aria-label="send"
            >
              <TelegramIcon />
            </IconButton>
          </Grid>
        </form>
      </Toolbar>
    </AppBar>
  )
}

export default BottomInput
