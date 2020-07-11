import React, { Fragment, useContext } from "react";
import { GlobalContext } from "../../App";
import { Switch, Route, Redirect } from "react-router-dom";
import TopBar from "./TopBar";
import SideMenu from "./SideMenu";
import { PrivateRoute } from "../";
import {
  Login as LoginPage,
  EmployeeDashboard,
  SingleEmployee as SingleEmployeePage,
} from "../../Pages";
import { Constants } from "../../Utils";

function Page(props) {
  const globalContext = useContext(GlobalContext);
  const shouldHideTopBar = () =>
    [Constants.pageTags.LOGIN_PAGE].includes(globalContext.currentPage.get);
  const shouldHideSideMenu = () =>
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
        <PrivateRoute exact path="/employee/:id">
          <SingleEmployeePage />
        </PrivateRoute>
        <Route exact path="/asd">
          {/*Quick accessing ui features*/}
          <EmployeeDashboard />
        </Route>
        <Route exact path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  };

  return (
    <Fragment>
      {!shouldHideTopBar() && <TopBar />}
      {!shouldHideSideMenu() && <SideMenu />}
      {renderRoutes()}
    </Fragment>
  );
}

export default Page;
