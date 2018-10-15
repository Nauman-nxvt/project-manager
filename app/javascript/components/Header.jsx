import React from 'react'
import {Link} from "react-router-dom";
import Signup from "./Signup"
import Login from "./Login"
import Logout from "./Logout"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      page: "login",
      currentUser: null,
    }
  }

  setPage = () => {
    if (this.state.currentUser === null) {
      this.setState({page: "login"})
    } else {
      this.setState({page: "delete"})
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({currentUser: this.props.currentUser}, ()=>{
        this.setPage();
      });
    }
  }

  changePage = (newPage) => {
    this.setState({
      page: newPage
    });
  };

  render() {
    const AuthLinks = () => {
      switch (this.state.page) {
        case "signup":
          return <Signup changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
        case "login":
          return <Login changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
        default: return null;
      }
    };
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to={'/'}>Project Manager</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={'/'}>Home</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              {
                this.state.currentUser && <li><Logout changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/></li>
              }
              {
                !this.state.currentUser &&
                <li>
                  <button className="btn btn-primary" onClick={() => this.changePage("login")}>Login</button>
                </li>
              }
              {
                !this.state.currentUser &&
                <li>
                  <button className="btn btn-primary" onClick={() => this.changePage("signup")}>Sign up</button>
                </li>
              }
            </ul>
          </div>
        </nav>
        {
          !this.state.currentUser &&
          <div className="row justify-content-md-center">
            <div className="col-6 shadow-lg" style={{padding: 20, marginTop: 50}}>
              {<AuthLinks/>}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Header