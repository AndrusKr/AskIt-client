import React from "react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import BrightnessIcon from "@material-ui/icons/Brightness3";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getThemeMode } from "../../redux/selectors/common";
import { setThemeMode } from "../../redux/actions/common";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getThemeMode);
  const isLight = theme === null || theme === "light";

  const toggleTheme = () => {
    dispatch(setThemeMode(isLight ? "dark" : "light"));
  };

  return (
    <IconButton onClick={toggleTheme}>
      {isLight ? <BrightnessIcon /> : <WbSunnyIcon />}
    </IconButton>
  );
};

export default DarkModeToggle;
