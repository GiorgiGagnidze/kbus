import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/index" component={Index}/>
        <Route path="/nucleo-icons" component={NucleoIcons}/>
        <Route path="/landing-page" component={LandingPage}/>
        <Route path="/profile-page" component={ProfilePage}/>
        <Route path="/login-page" component={LoginPage}/>
        <Redirect to="/index" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
