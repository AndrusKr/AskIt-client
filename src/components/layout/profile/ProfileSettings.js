import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Input, MenuItem, Select } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Edit, CheckCircle } from "@material-ui/icons";
import { getLanguage } from "../../../redux/selectors/language";
import {
  getCurrentUser,
  getIsAuthenticated,
} from "../../../redux/selectors/auth";
import { setLanguage } from "../../../redux/actions/language";
import translatorService from "../../../services/translatorService";
import { supportedLanguages } from "../../../constants/language";
import { setUserName } from "../../../redux/actions/auth";
import ModalWindow from "../modals/dialog";
import { useModal } from "../../hooks/useModal";

const ProfileSettings = ({ classes }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(getLanguage);
  const { nickname } = useSelector(getCurrentUser);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(nickname);
  const nicknameLabelRef = useRef(null);
  const nicknameRef = useRef(null);
  const [openModal, handleOpen, handleClose] = useModal();

  useEffect(() => {});

  async function changeLanguage(e) {
    dispatch(setLanguage(e.target.value));
    await translatorService.changeLanguage(e.target.value);
  }

  const handleOpenModal = () => {
    if (nickname === inputValue) {
      return setIsInputActive(false);
    }
    return handleOpen();
  };
  const handleCloseModal = () => {
    handleClose();
    setIsInputActive(false);
  };

  const editNickname = () => setIsInputActive(true);

  const onChangeNickname = (e) => {
    if (e.target.value.length < 15) {
      setInputValue(e.target.value);
    }
  };

  const submitChangeName = () => {
    // TODO: here should be saga (API call to the server) for change the name (with check of an existing name)
    dispatch(setUserName(inputValue));
    handleCloseModal();
  };

  const onKeyPress = (e) => {
    // check if enter is pressed
    if (e.charCode === 13 && !e.shiftKey) {
      handleOpenModal();
    }
  };

  useEffect(() => {
    if (nickname) {
      setInputValue(nickname);
    }

    if (isInputActive) {
      nicknameRef.current.focus();
    }
  }, [isInputActive, nickname]);

  return (
    <>
      <FormControl>
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

      {isAuthenticated && (
        <Typography
          ref={nicknameLabelRef}
          variant={nickname.length > 10 ? "h7" : "h6"}
          className={`${classes.profile} ${!isInputActive && "user-name"}`}
        >
          <AccountCircle className={classes.avatar} />
          {!isInputActive && nickname}

          {isInputActive && (
            <Input
              inputRef={nicknameRef}
              value={inputValue}
              onChange={onChangeNickname}
              onKeyPress={onKeyPress}
              style={{
                width: `${Math.ceil(inputValue.length * 1.01)}ex`,
              }}
              className={"input-user-name"}
            />
          )}

          {isInputActive ? (
            <CheckCircle
              className={classes.editName}
              onClick={handleOpenModal}
            />
          ) : (
            <Edit className={classes.editName} onClick={editNickname} />
          )}
        </Typography>
      )}
      <ModalWindow
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        submitChange={submitChangeName}
        dialogTitle="Are you sure you want to change your name?"
        buttonName="Change"
      />
    </>
  );
};

export default ProfileSettings;
