import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getJwt } from "../../redux/selectors/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const jwt = useSelector(getJwt);

  return (
    <Route
      {...rest}
      render={(props) =>
        !jwt ? <Redirect to="/sign-up" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
