import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import SignInPage from "./components/pages/SignInPage";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";
import SlidePage from "./components/pages/SlidePage";

import AuthState from "./context/auth/AuthState";
import setJwtToAxios from "./utils/setJwtToAxios";
import socketClient from "./utils/socketClient";
import translatorService from "./services/translatorService";
import Spinner from "./components/layout/Spinner";

if (localStorage.token) {
  setJwtToAxios(localStorage.token); // add jwt to axios on page reload
}

const isAuth = localStorage.getItem("token");
const currentLang = localStorage.getItem("language");

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await socketClient.connect();
      await translatorService.init(currentLang ? currentLang : 'en')
      setLoading(false);
    })();
  }, [loading])


  if (loading) {
    return <Spinner/>
  }

  console.log('isAuth APP', isAuth)

  return (
    <AuthState>
      <Router>
        <Header/>
        <Switch>
          {/*<Route exact path="/sing-in" component={SignInPage}/>*/}
          <Route path="/sing-in" exact render={() =>
            isAuth ? (
              <Redirect to={"/"}/>
            ) : (
              <SignInPage path="/sing-in"/>
            )
          }
          />
          <Route
            path="/"
            exact
            render={() =>
              isAuth ? (
                <HomePage path="/"/>
              ) : (
                <Redirect to={"/sing-in"}/>
              )
            }
          />
          <PrivateRoute exact path="/admin" component={AdminPage}/>
          <PrivateRoute exact path="/slide" component={SlidePage}/>
          <Redirect to={'/'}/>
        </Switch>
        <Footer/>
      </Router>
    </AuthState>
  );
}

export default App;
