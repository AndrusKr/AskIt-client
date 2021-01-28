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
import {BY, EN, RU, supportedLanguages} from "../../constants/language";
import {useDispatch} from "react-redux";
import {setLanguage} from "../../actions/language";
import DarkModeToggle from "./DarkModeToggle";

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
  const classes = useStyles()
  const trigger = useScrollTrigger()
  const dispatch = useDispatch()
  const [lang, setLang] = useState('');

  async function changeLanguage(language) {
    setLang(language.target.value)
    dispatch(setLanguage(language.target.value))
    await translatorService.changeLanguage(language.target.value);
  }

  return (
    <Fragment>
      <CssBaseline/>
      <HideOnScroll trigger={trigger}>
        <AppBar className={classes.appBar}>
          <Toolbar className={'header'}>
            <DarkModeToggle/>
            <Typography variant="h3" className={classes.title}>
              <HelpIcon className={classes.icon}/>
              AskIt!
            </Typography>
            <select value={lang} onChange={changeLanguage}>
              <option value={lang}>--Please choose a lang--</option>
              <option value={EN}>{supportedLanguages[EN]}</option>
              <option value={RU}>{supportedLanguages[RU]}</option>
              <option value={BY}>{supportedLanguages[BY]}</option>
            </select>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  )
}
