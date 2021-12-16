import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
// TODO: change to API
// import {changeAdminCredentials, checkAdminCredentials} from "../../../api/auth";
import {
  checkAdminCredentials,
  changeAdminCredentials,
} from "../../../mock/common";
import { useAlert } from "../../hooks/useAlert";
import { ERROR, SUCCESS } from "../../../constants/alerts";
import {
  MAX_NAME_LENGTH,
  MAX_NAME_LENGTH_ERROR_MESSAGE,
  MIN_NAME_LENGTH,
  MIN_NAME_LENGTH_ERROR_MESSAGE,
} from "../../../constants/errors";
import { validatePassword } from "../../../utils/helpers";
import { Transition } from "./dialog";
import ModalTitle from "../../entities/profile/ModalTitle";
import CredsForm from "../../entities/profile/CredsForm";

const ChangeCredentialsWindow = ({
  isCredentialsOpened,
  setIsCredentialsOpened,
}) => {
  const showAlert = useAlert();
  const [isPassedCheck, setIsPassedCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [login, setLogin] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [credsError, setCredsError] = useState("");

  // close modal and clean everything
  const handleClose = () => {
    setIsCredentialsOpened(false);
    setLogin("");
    setPassword("");
    setNewPassword("");
    setNewLogin("");
    setConfirmedNewPassword("");
    setPasswordError("");
    setLoginError("");
    setRepeatPasswordError("");
    setCredsError("");
    setIsPassedCheck(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // depends on which modal is open use those values
    const creds = {
      login: isPassedCheck ? newLogin : login,
      password: isPassedCheck ? newPassword : password,
    };

    if (!isPassedCheck) {
      try {
        // if creds are valid, clean creds error, login and set passedCheck to open a modal to change creds
        setCredsError("");
        await checkAdminCredentials(creds);
        setLogin("");
        setIsPassedCheck(true);
      } catch (err) {
        setCredsError(err.message);
      }
    } else {
      // if we had some errors from previous time we should clean them before we start new check
      setLoginError("");
      setPasswordError("");
      setRepeatPasswordError("");
      // setState async action, to get right result for this action we should use block variable isErrorOccurred
      let isErrorOccurred;

      if (newLogin.length < MIN_NAME_LENGTH) {
        setLoginError(MIN_NAME_LENGTH_ERROR_MESSAGE);
        isErrorOccurred = true;
      }

      if (newLogin.length > MAX_NAME_LENGTH) {
        setLoginError(MAX_NAME_LENGTH_ERROR_MESSAGE);
        isErrorOccurred = true;
      }

      if (!validatePassword(newPassword)) {
        setPasswordError("Weak password, you had better change it");
        isErrorOccurred = true;
      }

      if (newPassword !== confirmedNewPassword) {
        setRepeatPasswordError("Passwords are not equal!");
        isErrorOccurred = true;
      }

      if (!isErrorOccurred && newLogin && newPassword) {
        try {
          await changeAdminCredentials(creds);
          showAlert(SUCCESS, "Credentials have been changed successfully!");
        } catch (error) {
          showAlert(ERROR, "Something went wrong...");
        } finally {
          handleClose();
        }
      }
    }
  };
  const handleChangeLogin = (e) => {
    if (isPassedCheck) {
      return setNewLogin(e.target.value);
    }
    return setLogin(e.target.value);
  };

  const closeModal = () => {
    handleClose();
  };

  return (
    <Dialog
      open={isCredentialsOpened}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setIsCredentialsOpened(!isCredentialsOpened)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <ModalTitle
        title={
          isPassedCheck
            ? "Set new credentials"
            : "Please, enter your credentials to continue!"
        }
        closeModal={closeModal}
        classes={"creds-title"}
      />

      {!isPassedCheck && (
        <h3 className={"error-title creds-title"}>{credsError}</h3>
      )}

      <CredsForm
        isPassedCheck={isPassedCheck}
        handleSubmit={onSubmit}
        handleChange={handleChangeLogin}
        label={isPassedCheck ? "Set new login" : "Please, enter your login"}
        login={isPassedCheck ? newLogin : login}
        loginError={loginError}
        setPassword={isPassedCheck ? setNewPassword : setPassword}
        password={isPassedCheck ? newPassword : password}
        passwordTitle={isPassedCheck ? "Enter new password" : "Password"}
        passwordError={passwordError}
        setConfirmedNewPassword={setConfirmedNewPassword}
        confirmedNewPassword={confirmedNewPassword}
        newPasswordTitle={"Repeat your new password"}
        repeatPasswordError={repeatPasswordError}
        buttonName={"Send"}
      />
    </Dialog>
  );
};

export default ChangeCredentialsWindow;
