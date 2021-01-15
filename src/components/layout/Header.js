import React, {Fragment, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import HelpIcon from "@material-ui/icons/Help"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Slide from "@material-ui/core/Slide"
import CssBaseline from "@material-ui/core/CssBaseline"
import translatorService from "../../services/translatorService";

const useStyles = makeStyles(() => ({
  appBar: {
    background: "white",
    boxShadow: "none",
  },
  title: {
    color: "#027bfd",
    flexGrow: 1,
    textAlign: "center",
  },
  icon: {
    width: 35,
    height: 35,
  },
}))

const HideOnScroll = ({trigger, children}) => (
  <Slide direction="down" in={!trigger}>
    {children}
  </Slide>
)

export default function Header(props) {
  const [lang, setLang] = useState('');
  const classes = useStyles()
  const trigger = useScrollTrigger()

  async function changeLanguage(language) {
    setLang(language.target.value)
    await translatorService.changeLanguage(language.target.value);
  }

  return (
    <Fragment>
      <CssBaseline/>
      <HideOnScroll trigger={trigger}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              <HelpIcon className={classes.icon}/>
              AskIt!
            </Typography>
            <select value={lang} onChange={changeLanguage}>
              <option value={lang}>--Please choose a lang--</option>
              <option value="en">En</option>
              <option value="ru">Ru</option>
              <option value="by">By</option>
            </select>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  )
}
