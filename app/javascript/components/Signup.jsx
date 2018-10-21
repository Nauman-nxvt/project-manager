import React from 'react'

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_confirmation: '',
        }
    }

    handleSignup = () => {
        const email = this.state.email;
        const password = this.state.password;
        const password_confirmation = this.state.password_confirmation;
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
                let str = '';
                Object.entries(response.responseJSON.errors).forEach(([k, v]) => str += `${k} ${v}.\n`);
                alert(str.toUpperCase());
            }
        });
    };

    render() {
        return (
            <div className="container" id="signup-form">
                <div className="row justify-content-md-center">
                    <div className="col-4">
                        <h2 className="main-heading">Signup</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <label>Email</label>
                    </div>
                    <div className="col-5">
                        <input placeholder="email" value={this.state.email} onChange={(e) => {
                            this.setState({email: e.target.value})
                        }}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <label>Password</label>
                    </div>
                    <div className="col-5">
                        <input type="password" placeholder="password" value={this.state.password} onChange={(e) => {
                            this.setState({password: e.target.value})
                        }}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <label>Password confirmation</label>
                    </div>
                    <div className="col-5">
                        <input type="password" placeholder="retype password" value={this.state.password_confirmation}
                               onChange={(e) => {
                                   this.setState({password_confirmation: e.target.value})
                               }}/>
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={this.handleSignup}>Sign up</button>
                    </div>
                </div>
            </div>
        );
    };
};