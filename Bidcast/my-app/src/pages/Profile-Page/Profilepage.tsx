import { Sidebar } from "./Sidebar";
import "./Profilepage.scss";
import { AccountDetails } from "./AccountDetails";
import { Following } from "./Following";
import { Route, Switch } from "react-router-dom";

// import { useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";

export function ProfilePage() {
  return (
    <div className="profile_page">
      <Sidebar />
      <Switch>
        <Route path="/profilePage/following">
          <Following />
        </Route>
        <Route path="/profilePage/accountDetails">
          <AccountDetails />
        </Route>
      </Switch>
    </div>
  );
}
