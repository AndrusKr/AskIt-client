import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getAlphabeticUsersList } from "../../../redux/selectors/user";
import UserBarTabs from "./UserBarTabs";
import UserRowData from "./UserRowData";

function UserList({ isUserListOpened, setIsUserListOpened }) {
  const usersList = useSelector(getAlphabeticUsersList);

  return (
    <Dialog
      open={isUserListOpened}
      onBackdropClick={() => setIsUserListOpened(false)}
    >
      <h2 className={"user-list-title switch-modes-helper"}>
        List of users{" "}
        <CloseIcon
          onClick={() => setIsUserListOpened(false)}
          className={"user-list-close-icon switch-modes-helper"}
        />
      </h2>
      <UserBarTabs />

      <List
        component="nav"
        className={"user-list-container switch-modes-helper"}
      >
        {[...usersList].map((i) => {
          return <UserRowData userData={i} />;
        })}
      </List>
    </Dialog>
  );
}

export default UserList;
