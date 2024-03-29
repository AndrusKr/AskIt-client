import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { HighlightOff, Telegram } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  MAX_QUESTION_LENGTH_ERROR_MESSAGE,
  MIN_QUESTION_LENGTH_ERROR_MESSAGE,
} from "../../constants/errors";
import { ERROR } from "../../constants/alerts";
import { useAlert } from "../hooks/useAlert";
import { MAX_MESSAGE_LIMIT } from "../../constants/message";
import {
  getEditedQuestionId,
  getEditedText,
  getIsEditActive,
} from "../../redux/selectors/questions";
import {
  setQuestionData,
  setQuestionLoading,
  updateQuestion,
} from "../../redux/actions/questions";
import profanityFilter from "../../services/profanityFilter";
import { getUserStatus } from "../../redux/selectors/user";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10,
    marginLeft: "2%",
    marginRight: "2%",
    width: "96%",
  },
  form: {
    width: "100%",
  },
  inputText: {
    width: "100%",
  },
}));

const BottomInput = ({ sendQuestion }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editedText = useSelector(getEditedText);
  const isEditActive = useSelector(getIsEditActive);
  const editedQuestionId = useSelector(getEditedQuestionId);
  const textInputRef = useRef(null);
  const [questionText, setQuestionText] = useState("");
  const [symbolsAmount, setSymbolsAmount] = useState(MAX_MESSAGE_LIMIT);
  const [editQuestionText, setEditQuestionText] = useState(editedText);
  const isBlocked = useSelector(getUserStatus);
  const showAlert = useAlert();

  useEffect(() => {
    if (editedText) {
      setEditQuestionText(editedText);
      textInputRef.current.focus();
    }
  }, [editedText]);

  useEffect(() => {
    if (editQuestionText === editedText && isEditActive) {
      setSymbolsAmount(MAX_MESSAGE_LIMIT - editQuestionText.length);
    }
  }, [isEditActive, editQuestionText, questionText]);

  useEffect(() => {
    textInputRef.current.focus();
  });

  const onQuestionTextChange = (e) => {
    if (isEditActive) {
      setEditQuestionText(e.target.value);
    } else {
      setQuestionText(e.target.value);
    }
    setSymbolsAmount(MAX_MESSAGE_LIMIT - e.target.value.length);
  };

  const handleEditClose = () => {
    dispatch(setQuestionData({ text: "", isEditActive: false, id: null }));
    setSymbolsAmount(MAX_MESSAGE_LIMIT - questionText.length);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (symbolsAmount < 0) {
      return showAlert(ERROR, MAX_QUESTION_LENGTH_ERROR_MESSAGE);
    }

    if (
      (!isEditActive && !questionText) ||
      (isEditActive && !editQuestionText)
    ) {
      return showAlert(ERROR, MIN_QUESTION_LENGTH_ERROR_MESSAGE);
    }

    if (
      (!isEditActive && profanityFilter.isProfane(questionText)) ||
      (isEditActive && profanityFilter.isProfane(editQuestionText))
    ) {
      return showAlert(ERROR, "Please be polite and do not use swear words");
    }

    if (isEditActive) {
      // TODO: here should be saga (API call to the server) for update the question
      dispatch(setQuestionLoading(true));
      dispatch(updateQuestion({ editedQuestionId, editQuestionText }));
      setSymbolsAmount(MAX_MESSAGE_LIMIT - questionText.length);
    } else {
      sendQuestion({
        text: questionText,
        askTime: new Date(),
      });
      setQuestionText("");
      textInputRef.current.focus();
      return setSymbolsAmount(MAX_MESSAGE_LIMIT);
    }
  };

  const onKeyPress = (e) => {
    // check if enter is pressed
    if (e.charCode === 13 && !e.shiftKey) {
      onSubmit(e);
    }
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={`${classes.appBar} switch-modes-helper`}
    >
      <Toolbar>
        <form noValidate className={classes.form}>
          <Grid container>
            <Grid item xs>
              <TextField
                autoFocus
                inputRef={textInputRef}
                type="text"
                name="questionText"
                className={classes.inputText}
                label={
                  isEditActive ? "Edit message" : t("writeYourQuestionHere")
                }
                multiline
                disabled={isBlocked}
                value={isEditActive ? editQuestionText : questionText}
                onChange={onQuestionTextChange}
                onKeyPress={onKeyPress}
              />
            </Grid>
            <div
              className={
                symbolsAmount < 0
                  ? "symbols-amount-counter max-question-text-error"
                  : "symbols-amount-counter"
              }
            >
              <HighlightOff
                className={
                  isEditActive
                    ? "edit-close-icon-active"
                    : "edit-close-icon-hidden"
                }
                onClick={handleEditClose}
              />
              {symbolsAmount}
            </div>
            <IconButton
              type="submit"
              onClick={onSubmit}
              edge="end"
              disabled={symbolsAmount < 0 || isBlocked}
              aria-label="send"
            >
              <Telegram />
            </IconButton>
          </Grid>
        </form>
      </Toolbar>
    </AppBar>
  );
};

BottomInput.propTypes = {
  sendQuestion: PropTypes.func.isRequired,
};

export default BottomInput;
