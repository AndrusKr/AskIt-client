import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  Tooltip,
  Zoom,
} from "@material-ui/core";
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
import {BY, EN, RU, supportedLanguages, supportedLanguages2} from "../../../constants/language";
import { setUsername } from "../../../redux/actions/auth";
import ModalWindow from "../../layout/modals/dialog";
import { useModal } from "../../hooks/useModal";
import IconButton from "@material-ui/core/IconButton";
import UserList from "./UserList";
import ChangeCredentialsWindow from "../../layout/modals/credentials";
import eng from "../../../images/eng.svg";
import rus from "../../../images/rus.svg";
import bel from "../../../images/bel.svg";

const ProfileSettings = ({ classes }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(getLanguage);
  // TODO: remove "|| "Andrus";" it's just for testing Admin abilities
  const nickname =
    useSelector(getNickname) || localStorage.getItem("nickname") || "Andrus";
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAdmin = useSelector(getIsAdmin);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(nickname);
  const nicknameLabelRef = useRef(null);
  const nicknameRef = useRef(null);
  const [isUserListOpened, setIsUserListOpened] = useState(false);
  const [isCredentialsOpened, setIsCredentialsOpened] = useState(false);
  const [openModal, handleOpen, handleClose] = useModal();

  useEffect(() => {});

  async function changeLanguage(e) {
    // console.log('CLICK222', e.target.alt)
    // dispatch(setLanguage(e.target.alt));
    // await translatorService.changeLanguage(e.target.alt);
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

  const changeCredentials = () => {
    if (!isAdmin) return;
    setIsCredentialsOpened(true);
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

  console.log("isCredentialsOpened", isCredentialsOpened);

  return (
    <>
      {isAdmin && isAuthenticated && (
        <IconButton
          className={classes.avatar}
          onClick={() => setIsUserListOpened(!isUserListOpened)}
        >
          <Tooltip TransitionComponent={Zoom} title="Show users">
            <People />
          </Tooltip>
        </IconButton>
      )}
      <FormControl>
        {/*<div className={"flag-container"}>*/}
        {/*  {Object.keys(supportedLanguages2).map((name) => {*/}
        {/*    return (*/}
        {/*      <img*/}
        {/*        src={supportedLanguages2[name]}*/}
        {/*        className={`flag-icon ${*/}
        {/*          currentLanguage === name && "flag-icon-border"*/}
        {/*        }`}*/}
        {/*        alt={name}*/}
        {/*        onClick={changeLanguage}*/}
        {/*      />*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</div>*/}

        <Select
          value={currentLanguage}
          onChange={changeLanguage}
          input={<Input id="select-multiple" />}
          className={"switch-modes-helper"}
        >
          {Object.keys(supportedLanguages).map((name) => {
            return (
              <MenuItem key={name} value={name} className={"switch-modes"}>
                {supportedLanguages[name]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {isAuthenticated && (
        //Typography
        <div
          ref={nicknameLabelRef}
          // variant={nickname.length > 10 ? "h7" : "h6"}
          className={`profile-nickname ${classes.profile} ${
            !isInputActive && "user-name"
          } switch-modes-helper`}
        >
          <Tooltip TransitionComponent={Zoom} title="Change credentials">
            <AccountCircle
              className={`${classes.avatar} ${isAdmin && "bun-icon"}`}
              onClick={changeCredentials}
            />
          </Tooltip>
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
              className={"switch-modes-helper profile-nickname"}
            />
          )}

          {isInputActive ? (
            <CheckCircle
              className={classes.editName}
              onClick={handleOpenModal}
            />
          ) : (
            <Tooltip TransitionComponent={Zoom} title="Edit name">
              <Edit className={classes.editName} onClick={editNickname} />
            </Tooltip>
          )}
        </div>
      )}
      <ModalWindow
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        submitChange={submitChangeName}
        dialogTitle="Are you sure you want to change your name?"
        buttonName="Change"
      />
      <ChangeCredentialsWindow
        isCredentialsOpened={isCredentialsOpened}
        setIsCredentialsOpened={setIsCredentialsOpened}
      />
      <UserList
        isUserListOpened={isUserListOpened}
        setIsUserListOpened={setIsUserListOpened}
      />
    </>
  );
};

export default ProfileSettings;
