import React from 'react'

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogout = () => {
        $.ajax({
            url: '/users/sign_out.json',
            type: 'DELETE',
            success: () => {
                this.props.changePage("login");
                this.props.updateCurrentUser(null);
            },
        });
    };

    render() {
        return (
            <button className="btn btn-danger" onClick={this.handleLogout}>Sign Out</button>
        );
    };
}