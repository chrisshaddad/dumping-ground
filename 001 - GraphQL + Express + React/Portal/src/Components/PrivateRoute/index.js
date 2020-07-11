import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Constants } from "../../Utils";
import PropTypes from "prop-types";

function PrivateRoute({ children, ...rest }) {
  //Can be replaced with prefered auth checking method
  const isAuthenticated = JSON.parse(
    localStorage.getItem(Constants.localStorageVars.IS_AUTHENTICATED)
  );

  if (!isAuthenticated) return <Redirect to="/" />;

  return <Route {...rest}>{children}</Route>;
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PrivateRoute;
