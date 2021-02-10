import React from "react";
import { FilledInput, InputAdornment, InputLabel } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ADMIN } from "../../constants/routes";

const PasswordInput = ({
  password,
  setPassword,
  isPasswordShown,
  setIsPasswordShown,
}) => {
  if (window.location.pathname !== ADMIN) {
    return "";
  }

  return (
    <>
      <label>Please, enter your password</label>
      <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
      <FilledInput
        id="filled-adornment-password"
        type={isPasswordShown ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsPasswordShown(!isPasswordShown)}
              edge="end"
            >
              {isPasswordShown ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default PasswordInput;
