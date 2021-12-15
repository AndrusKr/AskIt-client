import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const ModalTitle = ({ title, closeModal, classes }) => {
  return (
    <h2 className={`${classes} user-list-title`}>
      {title}
      <CloseIcon
        onClick={closeModal}
        className={"user-list-close-icon switch-modes-helper"}
      />
    </h2>
  );
};

export default ModalTitle;
