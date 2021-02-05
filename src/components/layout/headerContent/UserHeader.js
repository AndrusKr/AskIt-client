import React from "react";
import Typography from "@material-ui/core/Typography";
import { Help } from "@material-ui/icons";
import DarkModeToggle from "../DarkModeToggle";
import ProfileSettings from "../profile/ProfileSettings";

function UserHeader({ classes }) {
  return (
    <>
      <DarkModeToggle />
      <Typography variant="h3" className={classes.title}>
        <Help className={classes.icon} />
        AskIt!
      </Typography>
      <ProfileSettings classes={classes} />
    </>
  );
}

export default UserHeader;
