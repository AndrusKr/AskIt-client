import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth } from "../../redux/selectors/auth";
import { MeetingRoomRounded } from "@material-ui/icons";
import { userSignOutRequest } from "../../redux/actions/auth";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuth);

  const signOut = () => {
    dispatch(userSignOutRequest());
  };

  return (
    isAuthenticated && (
      <IconButton onClick={signOut}>
        <MeetingRoomRounded />
      </IconButton>
    )
  );
};

export default SignOutButton;
