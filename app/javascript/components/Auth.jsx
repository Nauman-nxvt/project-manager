import React from 'react'
import Signup from "./Signup"
import Login from "./Login"

class Auth extends React.Component {
    render() {
        return (
            <div>
                {this.props.page === 'signup' ?
                    <Signup changePage={this.props.changePage} updateCurrentUser={this.props.updateCurrentUser}/> :
                    <Login changePage={this.props.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
                }
            </div>
        );
    }
}

export default Auth