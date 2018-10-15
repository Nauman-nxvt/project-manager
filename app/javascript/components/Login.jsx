import React from 'react'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleLogin = () => {
    $.ajax({
      url: "/users/sign_in.json",
      type: "POST",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      },
      success: response => {
        this.props.changePage("delete");
        this.props.updateCurrentUser(this.state.email);
      },
      error: response => {
        let str = '';
        Object.entries(response.responseJSON).forEach(([k, v]) => str += `${k} ${v}`);
        alert(str.toUpperCase())
      }
    });
  };

  render() {
    return (
      <div className="container" id="login-form">
        <div className="row justify-content-md-center">
          <div className="col-4">
            <h2 className="main-heading">Login</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label>Email</label>
          </div>
          <div className="col-5">
            <input placeholder="email" onChange={(e) => {
              this.setState({email: e.target.value})
            }}/>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label>Password</label>
          </div>
          <div className="col-5">
            <input type="password" placeholder="password" onChange={(e) => {
              this.setState({password: e.target.value})
            }}/>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-4">
            <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  };
};