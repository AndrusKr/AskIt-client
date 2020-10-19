import React, { Fragment } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import HelpIcon from "@material-ui/icons/Help"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Slide from "@material-ui/core/Slide"
import CssBaseline from "@material-ui/core/CssBaseline"

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

const HideOnScroll = ({ trigger, children }) => (
  <Slide direction="down" in={!trigger}>
    {children}
  </Slide>
)

export default function Header(props) {
  const classes = useStyles()
  const trigger = useScrollTrigger()

  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll trigger={trigger}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              <HelpIcon className={classes.icon} />
              AskIt!
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  )
}
