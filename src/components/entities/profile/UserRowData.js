import React from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import HealingIcon from "@material-ui/icons/Healing";
import { banUserRequest } from "../../../redux/actions/user";

function UserRowData({ userData }) {
  const { isBanned, id, nickname, isAdmin } = userData;
  const dispatch = useDispatch();
  const handleClick = (id) => dispatch(banUserRequest(id));

  return (
    <ListItem
      // button
      className={isBanned && "banned-user"}
      key={id}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={`${nickname} ${isAdmin ? "admin" : ""}`} />

      {!isAdmin && !isBanned && (
        <RemoveCircleOutlineIcon
          className={"bun-icon"}
          onClick={() => handleClick(id)}
        />
      )}
      {!isAdmin && isBanned && (
        <HealingIcon className={"unbun-icon"} onClick={() => handleClick(id)} />
      )}
    </ListItem>
  );
}

export default UserRowData;
