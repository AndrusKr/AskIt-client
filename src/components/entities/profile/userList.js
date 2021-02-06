import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import {
  Dialog,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { getUsersList } from "../../../redux/selectors/user";

function UserList({ isUserListOpened, setIsUserListOpened }) {
  const usersList = useSelector(getUsersList);

  return (
    <Dialog
      open={isUserListOpened}
      // onClose={this.handleClose}
      className={"user-list-dialog"}
      onBackdropClick={() => setIsUserListOpened(false)}
    >
      <h2 className={"user-list-title"}>
        List of users{" "}
        <CloseIcon
          onClick={() => setIsUserListOpened(false)}
          className={"user-list-close-icon"}
        />
      </h2>

      <List component="nav" className={"user-list-container"}>
        {[...usersList].map((i) => {
          return (
            <ListItem
            // button
            // className={""}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={`${i.nickname} ${i.isAdmin ? "admin" : ""}`}
              />

              <RemoveCircleOutlineIcon className={"bun-icon"} />
            </ListItem>
          );
        })}

        {/*<People />*/}
        {/*<Typography variant="h3" >*/}
        {/*  AskIt!*/}
        {/*</Typography>*/}
      </List>
    </Dialog>
  );
}

export default UserList;
