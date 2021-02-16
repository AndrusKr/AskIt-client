import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import SignUpPage from "./components/pages/SignUpPage";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";
import SlidePage from "./components/pages/SlidePage";

import translatorService from "./services/translatorService";
import Spinner from "./components/layout/Spinner";
import { EN } from "./constants/language";
import { getLanguage } from "./redux/selectors/language";
import AlertMessage from "./components/layout/Alerts";

import { GlobalStyles } from "./components/themes/global";
import { darkTheme, lightTheme } from "./components/themes/themes";
import { getThemeMode } from "./redux/selectors/common";
import { ADMIN, INDEX, SIGN_UP, SLIDE } from "./constants/routes";
import { getUsersListRequest } from "./redux/actions/user";
import socketClient from "./utils/socketClient";
import { putQuestions } from "./redux/actions/questions";
import { getIsSignup, getJwt } from "./redux/selectors/auth";
import { useAlert } from "./components/hooks/useAlert";
import { SUCCESS } from "./constants/alerts";
import { getAuthUser } from "./redux/actions/auth";

const App = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector(getLanguage);
  const theme = useSelector(getThemeMode);
  const jwt = useSelector(getJwt);
  const isSignup = useSelector(getIsSignup);
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = useAlert();
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (jwt) {
        if (!isSignup) {
          await translatorService.init(currentLang ? currentLang : EN);
        }

        dispatch(getUsersListRequest());
        dispatch(getAuthUser());
        const greetings = isSignup ? "Hello for the newcomer" : "Welcome back";
        if (window.location.pathname !== SLIDE) {
          showAlert(SUCCESS, `${greetings}, ${nickname}!!!`);
        }
        await socketClient.connect(jwt);

        const onReceivedQuestion = (receivedQuestion) => {
          dispatch(putQuestions(JSON.parse(receivedQuestion.body)));
        };

        await socketClient.subscribeTopic("questions", onReceivedQuestion);
      } else {
        await translatorService.init(currentLang ? currentLang : EN);
      }
      setIsLoading(false);
    })();
  }, [jwt, isSignup]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Router>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header />
        <AlertMessage />
        <Switch>
          <Route exact path={SIGN_UP} component={SignUpPage} />
          <Route exact path={ADMIN} component={AdminPage} />
          {/*<PrivateRoute exact path={ADMIN} component={AdminPage} />*/}
          <PrivateRoute exact path={INDEX} component={HomePage} />
          <PrivateRoute exact path={SLIDE} component={SlidePage} />
          <Redirect to={"/"} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
