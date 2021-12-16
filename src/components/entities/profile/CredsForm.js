import LoginField from "./LoginField";
import PasswordInput from "../../layout/PasswordInput";
import Button from "@material-ui/core/Button";
import React from "react";
import { ADMIN } from "../../../constants/routes";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../../../redux/selectors/auth";

const CredsForm = ({
  handleSubmit,
  handleChange,
  login,
  setPassword,
  password,
  buttonName,
  label,
  isPassedCheck,
  setConfirmedNewPassword,
  confirmedNewPassword,
  repeatPasswordError,
  loginError,
  passwordError,
  passwordTitle,
  newPasswordTitle,
}) => {
  const isAdmin = useSelector(getIsAdmin);
  const isAdminPage = window.location.pathname === ADMIN;
  return (
    <form className={"credentials-container"} onSubmit={handleSubmit}>
      <LoginField
        label={label}
        handleChange={handleChange}
        login={login}
        loginError={loginError}
      />
      {(isAdminPage || isAdmin) && (
        <PasswordInput
          setPassword={setPassword}
          password={password}
          passwordTitle={passwordTitle}
          errorMessage={passwordError}
        />
      )}
      {isPassedCheck && (
        <PasswordInput
          setPassword={setConfirmedNewPassword}
          password={confirmedNewPassword}
          passwordTitle={newPasswordTitle}
          errorMessage={repeatPasswordError}
        />
      )}
      <Button type="submit" fullWidth variant="contained" color="primary">
        {buttonName}
      </Button>
    </form>
  );
};

export default CredsForm;
