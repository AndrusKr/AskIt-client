import React from "react";
import { Help } from "@material-ui/icons";
import DarkModeToggle from "../DarkModeToggle";
import ProfileSettings from "../../entities/profile/ProfileSettings";
import { isTablet } from "../../../utils/helpers";

function UserHeader({ classes }) {
  console.log("isTablet", isTablet());
  return (
    <>
      <DarkModeToggle />
      <div className={`label-title`}>
        {!isTablet() && <Help className={classes.icon} />}
        AskIt!
      </div>
      <ProfileSettings classes={classes} />
    </>
  );
}

export default UserHeader;
