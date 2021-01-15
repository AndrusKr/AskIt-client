import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({component: Component, ...rest}) => {
  // const authContext = useContext(AuthContext);
  // check out why they are not seen!!!
  // const { isAuthenticated, loading } = authContext;
  // console.log(authContext)
  return (
    // <Route
    // {...rest}
    // render={(props) =>
    //   !isAuthenticated && !loading ? (
    //   // !localStorage.getItem("login") ? (
    //     <Redirect to="/signin" />
    //   ) : (
    // <Component {...props} />
    //   )
    // }
    // />
    <Component/>
  );
};

export default PrivateRoute;
