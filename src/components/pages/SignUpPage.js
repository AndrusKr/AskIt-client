import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { adminAuthRequest, makeAuthRequest } from "../../redux/actions/auth";
import { getJwt } from "../../redux/selectors/auth";
import {
  MAX_NAME_LENGTH,
  MAX_NAME_LENGTH_ERROR_MESSAGE,
  MIN_NAME_LENGTH,
  MIN_NAME_LENGTH_ERROR_MESSAGE,
} from "../../constants/errors";
import { ERROR } from "../../constants/alerts";
import { useAlert } from "../hooks/useAlert";
import { ADMIN } from "../../constants/routes";
import { validatePassword } from "../../utils/helpers";
import CredsForm from "../entities/profile/CredsForm";

const SignUpPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const jwt = useSelector(getJwt);
  const showAlert = useAlert();
  const [nickname, setNickname] = useState("");
  const isAdmin = window.location.pathname === ADMIN;

  if (jwt) {
    return <Redirect to="/" />;
  }

  const handleChange = (e) => setNickname(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const errorMessage = isAdmin && "Wrong login or password!";

    if (nickname.length < MIN_NAME_LENGTH) {
      return showAlert(ERROR, errorMessage || MIN_NAME_LENGTH_ERROR_MESSAGE);
    }

    if (nickname.length > MAX_NAME_LENGTH) {
      return showAlert(ERROR, errorMessage || MAX_NAME_LENGTH_ERROR_MESSAGE);
    }

    if (isAdmin) {
      if (!validatePassword(password)) {
        return showAlert(ERROR, errorMessage);
      }

      return dispatch(adminAuthRequest({ nickname, password }));
    }

    return dispatch(makeAuthRequest(nickname));
  };

  return (
    <Grid
      mt={56}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={11}>
        <Typography component="h1" variant="h3" align="center">
          {t("hi")}👋🏻
        </Typography>
        <CredsForm
          handleSubmit={onSubmit}
          handleChange={handleChange}
          login={nickname}
          setPassword={setPassword}
          password={password}
          label={t("pleaseEnterYourNickname")}
          passwordTitle={"Password"}
          buttonName={t("letsGo")}
        />
      </Grid>
    </Grid>
  );
};
export default SignUpPage;
