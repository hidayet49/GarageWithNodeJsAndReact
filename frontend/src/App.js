import React from "react";
import SignUpForm from './Component/SignUpForm'
import SignInForm from './Component/SignInForm'
import ClientHomePage from './Component/ClientHomePage'
import AdminHomePage from './Component/AdminHomePage'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
        <Switch>

          <Route path="/signIn">
            <SignInForm />
          </Route>

          <Route path="/signUp">
            <SignUpForm />
          </Route>

          <Route path="/adminHome">
            <AdminHomePage />
          </Route>

          <Route path="/clientHome">
            <ClientHomePage />
          </Route>
        </Switch>
      
    </Router>
  );
}

