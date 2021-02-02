import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import SlideHeader from "./headerContent/SlideContent";
import UserHeader from "./headerContent/UserHeader";
import { SLIDE } from "../../constants/routes";

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
  slideHeader: {
    flexGrow: 1,
    color: "fff",
    cursor: "pointer",
  },
}));

const HideOnScroll = ({ trigger, children }) => (
  <Slide direction="down" in={!trigger}>
    {children}
  </Slide>
);

export default function Header(props) {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const showHeader = () => {
    if (window.location.pathname === SLIDE) {
      return <SlideHeader classes={classes} />;
    }
    return <UserHeader classes={classes} />;
  };

  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll trigger={trigger}>
        <AppBar className={classes.appBar}>
          <Toolbar className={"header"}>{showHeader()}</Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
}
