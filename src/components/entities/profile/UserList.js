import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { Dialog } from "@material-ui/core";
import { getAlphabeticUsersList } from "../../../redux/selectors/user";
import UserBarTabs from "./UserBarTabs";
import UserRowData from "./UserRowData";
import ModalTitle from "./ModalTitle";

function UserList({ isUserListOpened, setIsUserListOpened }) {
  const usersList = useSelector(getAlphabeticUsersList);
  const closeModal = () => setIsUserListOpened(false);

  return (
    <Dialog open={isUserListOpened} onClose={closeModal}>
      <ModalTitle
        title={"List of users"}
        closeModal={closeModal}
        classes={"switch-modes-helper"}
      />
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
