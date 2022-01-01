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
import { useWindowLocation } from "../hooks/useWindowLocation";

const useStyles = makeStyles(() => ({
  appBar: {
    background: "white",
    boxShadow: "none",
  },
  title: {
    color: "blue",
    flexGrow: 1,
    textAlign: "center",
  },
  icon: {
    color: "blue",
    width: 35,
    height: 35,
  },
  slideHeader: {
    flexGrow: 1,
    color: "fff",
    cursor: "pointer",
  },
  avatar: {
    width: 30,
    height: 30,
    margin: "0 10px",
    background: "blue",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  editName: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "black",
  },
}));

const HideOnScroll = ({ trigger, children }) => (
  <Slide direction="down" in={!trigger}>
    {children}
  </Slide>
);

export default function Header() {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const currentLocation = useWindowLocation();

  const showHeader = () => {
    if (currentLocation === SLIDE) {
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
