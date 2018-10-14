import React from 'react';
import Listing from './Listing';
import NewProject from './NewProject';
import AllProjects from './AllProjects';
import {Route, Redirect, Switch} from 'react-router-dom'
import Project from "./Project";

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Listing}/>
          <Route path="/projects/:id" component={Project}/>
          {/*<Redirect from="/" to="/projects"/>*/}
          {/*<Redirect to="/projects"/>*/}
        </Switch>
      </div>
    )
  }
}