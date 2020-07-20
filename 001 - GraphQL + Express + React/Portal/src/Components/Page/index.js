import React, { Fragment, useContext } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { Switch, Route, Redirect } from "react-router-dom";
import TopBar from "./TopBar";
import { PrivateRoute } from "../";
import {
  Login as LoginPage,
  EmployeeDashboard,
  PortalSettings,
} from "../../Pages";
import { Constants } from "../../Utils";

function Page(props) {
  const globalContext = useContext(GlobalContext);
  const shouldHideTopBar = () =>
    [Constants.pageTags.LOGIN_PAGE].includes(globalContext.currentPage.get);

  const renderRoutes = () => {
    return (
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/dashboard">
          <EmployeeDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/settings">
          <PortalSettings />
        </PrivateRoute>
        <Route exact path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  };

  return (
    <Fragment>
      {!shouldHideTopBar() && <TopBar />}
      {renderRoutes()}
    </Fragment>
  );
}

export default Page;
