import React from 'react';
import Listing from './Listing';
import Project from "./Project";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

export default class ReactHome extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Listing}/>
                        <Route path="/projects/:id" component={Project}/>
                        <Redirect to={'/'}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}