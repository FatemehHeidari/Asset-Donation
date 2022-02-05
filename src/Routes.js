
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import About from "./pages/About";
import RequestPage from "./pages/RequestPage";
import DonarPage from "./pages/DonarPage";
import AddDonation from "./pages/AddDonation";
import Home from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import AddProject from "./pages/AddProject";
import ProjectOwnerPage from "./pages/ProjectOwnerPage";
import DonateToProject from "./pages/DonateToProject";
import AccessControlPage from "./pages/AccessControlPage";
import history from './utils/history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/DonarPage" component={DonarPage} />
                    <Route path="/RequestPage" component={RequestPage} />
                    <Route path="/AddDonation" component={AddDonation} />
                    <Route path="/DonateToProject" component={DonateToProject} />
                    <Route path="/AddProject" component={AddProject} />
                    <Route path="/ProjectOwnerPage" component={ProjectOwnerPage} />
                    <Route path="/AdminPage" component={AdminPage} />
                    <Route path="/AccessControlPage" component={AccessControlPage} />
                </Switch>
            </Router>
        )
    }
}