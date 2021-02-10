import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Input, MenuItem, Select } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, CheckCircle, Edit, People } from "@material-ui/icons";
import { getLanguage } from "../../../redux/selectors/language";
import {
  getIsAdmin,
  getIsAuthenticated,
  getNickname,
} from "../../../redux/selectors/auth";
import { setLanguage } from "../../../redux/actions/language";
import translatorService from "../../../services/translatorService";
import { supportedLanguages } from "../../../constants/language";
import { setUsername } from "../../../redux/actions/auth";
import ModalWindow from "../../layout/modals/dialog";
import { useModal } from "../../hooks/useModal";
import IconButton from "@material-ui/core/IconButton";
import UserList from "./userList";

const ProfileSettings = ({ classes }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(getLanguage);
  const nickname = useSelector(getNickname);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAdmin = useSelector(getIsAdmin);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(nickname);
  const nicknameLabelRef = useRef(null);
  const nicknameRef = useRef(null);
  const [isUserListOpened, setIsUserListOpened] = useState(false);
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
    dispatch(setUsername(inputValue));
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
      {isAdmin && (
        <IconButton
          className={classes.avatar}
          onClick={() => setIsUserListOpened(!isUserListOpened)}
        >
          <People />
        </IconButton>
      )}
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
      <UserList
        isUserListOpened={isUserListOpened}
        setIsUserListOpened={setIsUserListOpened}
      />
    </>
  );
};

export default ProfileSettings;
