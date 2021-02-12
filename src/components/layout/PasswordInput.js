import React, { useState } from "react";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ADMIN } from "../../constants/routes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "5px",
  },
}));

const PasswordInput = ({
  password,
  setPassword,
  passwordTitle,
  errorMessage,
}) => {
  const classes = useStyles();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  // if (window.location.pathname !== ADMIN) {
  //   return "";
  // }

  return (
    <>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-filled" variant="outlined">
          {passwordTitle}
        </InputLabel>
        <FilledInput
          id="component-filled"
          type={isPasswordShown ? "text" : "password"}
          value={password}
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.input,
            },
          }}
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
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default PasswordInput;
