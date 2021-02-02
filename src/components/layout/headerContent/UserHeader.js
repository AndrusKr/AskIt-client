import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import HelpIcon from "@material-ui/icons/Help";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import DarkModeToggle from "../DarkModeToggle";
import { supportedLanguages } from "../../../constants/language";
import { setLanguage } from "../../../actions/language";
import translatorService from "../../../services/translatorService";
import { getLanguage } from "../../../selectors/language";

function UserHeader({ classes }) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(getLanguage);

  async function changeLanguage(e) {
    dispatch(setLanguage(e.target.value));
    await translatorService.changeLanguage(e.target.value);
  }
  return (
    <>
      <DarkModeToggle />
      <Typography variant="h3" className={classes.title}>
        <HelpIcon className={classes.icon} />
        AskIt!
      </Typography>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple">{"Language"}</InputLabel>
        <Select
          value={currentLanguage}
          onChange={changeLanguage}
          input={<Input id="select-multiple" />}
        >
          {Object.keys(supportedLanguages).map((name) => {
            return (
              <MenuItem key={name} value={name}>
                {supportedLanguages[name]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default UserHeader;
