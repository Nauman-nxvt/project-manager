import React from 'react'
import {Link} from "react-router-dom";
import Logout from "./Logout"

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to={'/'}>Project Manager</Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {
                this.props.currentUser &&
                <li className="nav-item active">
                  <Link className="nav-link" to={'/'}>Projects'</Link>
                </li>
              }
            </ul>

            <ul className="nav navbar-nav navbar-right">
              {
                this.props.currentUser &&
                <li>
                  <Logout changePage={this.props.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
                </li>
              }
              {
                !this.props.currentUser &&
                <li>
                  <button className="btn btn-primary" onClick={() => this.props.changePage("login")}>Login</button>
                </li>
              }
              {
                !this.props.currentUser &&
                <li>
                  <button className="btn btn-primary" onClick={() => this.props.changePage("signup")}>Sign up</button>
                </li>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header