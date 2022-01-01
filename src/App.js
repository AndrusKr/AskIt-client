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
import { BY } from "./constants/language";
import { getLanguage } from "./redux/selectors/language";
import AlertMessage from "./components/layout/Alerts";

import { GlobalStyles } from "./components/themes/global";
import { darkTheme, lightTheme } from "./components/themes/themes";
import { getThemeMode } from "./redux/selectors/common";
import { ADMIN, INDEX, SIGN_UP, SLIDE } from "./constants/routes";
import socketClient from "./utils/socketClient";
import { addNewQuestion, setAllQuestions } from "./redux/actions/questions";
import { getIsSignup, getJwt } from "./redux/selectors/auth";
import { getSignedInUser } from "./redux/actions/auth";

const App = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector(getLanguage);
  const theme = useSelector(getThemeMode);
  const jwt = useSelector(getJwt);
  const isSignup = useSelector(getIsSignup);
  const [isLoading, setIsLoading] = useState(false);
  const onCreated = (q) => dispatch(addNewQuestion(q));
  const onReceivedAll = (qs) => dispatch(setAllQuestions(qs));
  const onDefault = () => console.log("onDefault");

  const questionOperations = {
    CREATE: onCreated,
    READ_ALL: onReceivedAll,
    UPDATE: onDefault,
    DELETE: onDefault,
    ERROR: onDefault,
    default: onDefault,
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (jwt) {
        if (!isSignup) {
          await translatorService.init(currentLang ? currentLang : BY);
        }

        dispatch(getSignedInUser());
        await socketClient.connect(jwt);

        const onReceivedQuestionOperationFrame = ({ body }) => {
          const { type, payload } = JSON.parse(body);
          (questionOperations[type] || questionOperations.default)(payload);
        };

        await socketClient.subscribeTopic(
          "questions",
          onReceivedQuestionOperationFrame
        );
      } else {
        await translatorService.init(currentLang ? currentLang : BY);
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
