
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import About from "./pages/About";
import RequestPage from "./pages/RequestPage";
import DonarPage from "./pages/DonarPage";
import AddDonation from "./pages/AddDonation";
import Home from "./pages/MainPage";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                     <Route path="/DonarPage" component={DonarPage} />
                    <Route path="/RequestPage" component={RequestPage} />
                    <Route path="/AddDonation" component={AddDonation} />
                </Switch>
            </Router>
        )
    }
}