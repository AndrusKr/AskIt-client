import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import SignInPage from "./components/pages/SignInPage";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";
import SlidePage from "./components/pages/SlidePage";

import AuthState from "./context/auth/AuthState";
import setJwtToAxios from "./utils/setJwtToAxios";

if (localStorage.token) {
  setJwtToAxios(localStorage.token); // add jwt to axios on page reload
}

const App = () => (
  <AuthState>
    <Router>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/admin" component={AdminPage} />
        <PrivateRoute exact path="/slide" component={SlidePage} />
        <Route component={SignInPage} />
      </Switch>
      <Footer />
    </Router>
  </AuthState>
);

export default App;
