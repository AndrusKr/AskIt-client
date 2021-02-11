import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { HighlightOff, Telegram } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getFooter } from "../../redux/selectors/language";
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
import { getIsAdmin } from "../../redux/selectors/auth";
import { getUserStatus } from "../../redux/selectors/user";

const useStyles = makeStyles((theme) => ({
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

const BottomInput = ({ sendQuestion, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const footer = useSelector(getFooter);
  const editedText = useSelector(getEditedText);
  const isEditActive = useSelector(getIsEditActive);
  const editedQuestionId = useSelector(getEditedQuestionId);
  const textInputRef = useRef(null);
  const [questionText, setQuestionText] = useState("");
  const [symbolsAmount, setSymbolsAmount] = useState(MAX_MESSAGE_LIMIT);
  const [editQuestionText, setEditQuestionText] = useState(editedText);
  const isAdmin = useSelector(getIsAdmin);
  const isBlocked = useSelector(getUserStatus);
  const showAlert = useAlert();

  useEffect(() => {
    if (footer) {
      footer.style.paddingBottom = "90px";
    }

    if (editedText) {
      setEditQuestionText(editedText);
      textInputRef.current.focus();
    }
  }, [footer, editedText]);

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
        id: uuid(),
        author: {
          id: "5f6686aa845cbd520ceb599a",
          nickname: "Jayne",
          isAdmin,
        },
        text: questionText,
        asked: new Date(),
        likes: [
          "5f6686aa75ad25fac6f523e8",
          "5f6686aad7ec91be5633b806",
          "5f6686aa149973deb1774e76",
          "5f6686aa9844ff2a3d95ed50",
          "5f6686aa9625e0d6c94dc89f",
          "5f6686aa70020dce89700680",
          "5f6686aae92b06b1f1b7c69b",
          "5f6686aa8634ff8b9f0ed389",
          "5f6686aa7e7b176a20e3c6ec",
        ],
        answered: null,
        edited: false,
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
                  isEditActive ? "Edit message" : "Write Your question here..."
                }
                multiline
                disabled={loading || isBlocked}
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
  loading: PropTypes.bool.isRequired,
};

export default BottomInput;
