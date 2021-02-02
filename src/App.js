import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";
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
import { getLanguage } from "./selectors/language";
import AlertMessage from "./components/layout/Alerts";

import { GlobalStyles } from "./components/themes/global";
import { darkTheme, lightTheme } from "./components/themes/themes";
import { getThemeMode } from "./selectors/common";
import { ADMIN, INDEX, SIGN_UP, SLIDE } from "./constants/routes";

const App = () => {
  const currentLang = useSelector(getLanguage);
  const theme = useSelector(getThemeMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await translatorService.init(currentLang ? currentLang : EN);
      setLoading(false);
    })();
  }, [loading, currentLang]);

  if (loading) {
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
          <PrivateRoute exact path={INDEX} component={HomePage} />
          <PrivateRoute exact path={ADMIN} component={AdminPage} />
          <PrivateRoute exact path={SLIDE} component={SlidePage} />
          <Redirect to={"/"} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
