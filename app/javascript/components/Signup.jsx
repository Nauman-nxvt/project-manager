import React from 'react'

export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      password_confirmation: '',
    }
  }
  handleSignup = () => {
    const email = this.state.email;
    const password = this.state.password;
    const password_confirmation = this.state.password_confirmation;
    console.log('email', email)
    if (email === '' || password === '' || password_confirmation === '') {
      alert('Please fill all fields.')
      return;
    }

    $.ajax({
      url: "/users.json",
      type: "POST",
      data: {
        user: {
          email,
          password,
          password_confirmation,
        }
      },
      success: response => {
        this.props.changePage("delete");
        this.props.updateCurrentUser(this.state.email);
      },
      error: response => {
        let str= '';
        Object.entries(response.responseJSON.errors).forEach(([k,v])=> str+= `${k} ${v}. `);
        alert(str);
      }
    });
  };
  render() {
    return (
      <div>
        <h2>Signup</h2>
          <input placeholder="email" value={this.state.email} onChange={(e)=>{
            this.setState({email: e.target.value})
          }}/>
          <input type="password" placeholder="password" value={this.state.password} onChange={(e)=>{
            this.setState({password: e.target.value})
          }}/>
          <input type="password" placeholder="retype password" value={this.state.password_confirmation} onChange={(e)=>{
            this.setState({password_confirmation: e.target.value})
          }}/>
          <button className="btn btn-primary" onClick={this.handleSignup}>Sign up</button>
      </div>
    );
  };
};