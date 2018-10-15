import React from 'react'

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
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
        let str= ''
        Object.entries(response.responseJSON).forEach(([k,v])=> str+= `${k} ${v}`  )
        alert(str)
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
          <input placeholder="email" onChange={(e)=>{
            this.setState({email: e.target.value})
          }}/>
          <input type="password" placeholder="password" onChange={(e)=>{
            this.setState({password: e.target.value})
          }}/>
          <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
      </div>
    );
  };
};