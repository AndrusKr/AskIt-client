import React from "react";
import {
  FormControl,
  FormHelperText,
  makeStyles,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "15px",
  },
}));

const LoginField = ({ label, handleChange, login, loginError }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined">
      <TextField
        variant="outlined"
        margin="normal"
        label={label}
        onChange={handleChange}
        type="text"
        value={login}
        autoFocus
        id={"switch-modes-helper"}
        className={"user-bar-title"}
        InputProps={{
          classes: {
            input: classes.input,
          },
        }}
        aria-describedby="component-error-text"
      />
      {loginError && (
        <FormHelperText id="component-error-text">{loginError}</FormHelperText>
      )}
    </FormControl>
  );
};

export default LoginField;
