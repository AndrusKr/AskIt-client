import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {ThemeProvider} from 'styled-components';
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import SignUpPage from "./components/pages/SignUpPage";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";
import SlidePage from "./components/pages/SlidePage";

import translatorService from "./services/translatorService";
import Spinner from "./components/layout/Spinner";
import {EN} from "./constants/language";
import {getLanguage} from "./selectors/language";
import AlertMessage from "./components/layout/Alerts";


import {GlobalStyles} from './components/themes/global';
import {darkTheme, lightTheme} from './components/themes/themes';
import {getThemeMode} from "./selectors/common";

const App = () => {
  const currentLang = useSelector(getLanguage);
  const theme = useSelector(getThemeMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await translatorService.init(currentLang ? currentLang : EN)
      setLoading(false);
    })();
  }, [loading])


  if (loading) {
    return <Spinner/>
  }

  return (
    <Router>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles/>
        <Header/>
        <AlertMessage/>
        <Switch>
          <Route exact path="/sign-up" component={SignUpPage}/>
          <PrivateRoute exact path="/" component={HomePage}/>
          <PrivateRoute exact path="/admin" component={AdminPage}/>
          <PrivateRoute exact path="/slide" component={SlidePage}/>
          <Redirect to={'/'}/>
        </Switch>
        <Footer/>
      </ThemeProvider>
    </Router>
  );
}

export default App;
