import React from "react";
import Router from "react-router/lib/Router";
import Route from "react-router/lib/Route";
import IndexRoute from "react-router/lib/IndexRoute";
import Login from "./components/Login";
import List from "./components/List";
import Stats from "./components/Stats";
import { browserHistory } from "react-router";

async function getSession() {
  if (localStorage.getItem("profile")) {
    return true;
  } else {
    return false;
  }
}
async function authRequired(nextState, replace, callback) {
  var hasSession = await getSession();
  if (!hasSession && nextState.location.pathname !== "/") {
    replace("/");
    callback();
  } else if (nextState.location.pathname === "/" && hasSession) {
    replace("/list");
    callback();
  } else {
    callback();
  }
}

const Routes = props => (
  <Router {...props}>
    <Route path="/" onEnter={authRequired} component={Login} />
    <Route path="/list" onEnter={authRequired} component={List} />
    <Route path="/stats" onEnter={authRequired} component={Stats} />
  </Router>
);

export default Routes;
