import React, {useState} from "react"
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import {makeAuthRequest} from "../../actions/auth";
import {getJwt} from "../../selectors/auth";
import {
  MAX_NAME_LENGTH,
  MAX_NAME_LENGTH_ERROR_MESSAGE,
  MIN_NAME_LENGTH,
  MIN_NAME_LENGTH_ERROR_MESSAGE
} from "../../constants/errors";
import {ERROR} from "../../constants/alerts";
import {useAlert} from "../hooks/useAlert";

const SignUpPage = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const jwt = useSelector(getJwt);
  const [nickname, setNickname] = useState("")
  const showAlert = useAlert();

  if (jwt) {
    return <Redirect to="/"/>
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (nickname.length < MIN_NAME_LENGTH) {
      return showAlert(ERROR, MIN_NAME_LENGTH_ERROR_MESSAGE)
    }

    if (nickname.length > MAX_NAME_LENGTH) {
      return showAlert(ERROR, MAX_NAME_LENGTH_ERROR_MESSAGE)
    }

    dispatch(makeAuthRequest(nickname))
  }

  return (
    <Grid
      mt={56}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: "90vh"}}
    >
      <Grid item xs={11}>
        <Typography component="h1" variant="h3" align="center">
          {t('hi')}👋🏻
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t("pleaseEnterYourNickname")}
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            nickname="nickname"
            value={nickname}
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("letsGo")}
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}
export default SignUpPage
