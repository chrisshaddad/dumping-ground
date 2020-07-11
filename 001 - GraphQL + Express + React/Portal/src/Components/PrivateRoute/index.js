import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Constants } from "../../Utils";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //Can be replaced with prefered auth checking method
  const isAuthenticated = JSON.parse(
    localStorage.getItem(Constants.localStorageVars.IS_AUTHENTICATED)
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element,
};

export default PrivateRoute;
