import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, { forwardRef } from "react";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalWindow = ({
  openModal,
  handleCloseModal,
  submitChange,
  dialogTitle,
  buttonName,
  contentText,
  buttonType = "default",
}) => {
  return (
    <Dialog
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        &quot;{dialogTitle}&quot;
      </DialogTitle>
      {contentText && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            &quot;{contentText}&quot;
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={submitChange} color={buttonType}>
          {buttonName}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
