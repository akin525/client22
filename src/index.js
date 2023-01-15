import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/settings" exact component={Admin} />
      <Route path="/" exact component={Auth} />
      <Route path="/dashboard" exact component={Admin} />
      <Route path="/fund" exact component={Admin} />
      <Route path="/airtime" exact component={Admin} />
      <Route path="/add" exact component={Admin} />
      <Route path="/createlock" exact component={Admin} />
      <Route path="/tv" exact component={Admin} />
      <Route path="/addlock" exact component={Admin} />
      <Route path="/elect" exact component={Admin} />
      <Route path="/withdraw" exact component={Admin} />
      <Route path="/data" exact component={Admin} />
      <Route path="/purchase" exact component={Admin} />
      <Route path="/deposit" exact component={Admin} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
