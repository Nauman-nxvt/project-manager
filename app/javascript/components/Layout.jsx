import React from 'react';
import Header from './Header';
import Auth from './Auth';

class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
            page: "login",
        }
    }

    componentDidMount() {
        $.ajax({
            url: "/auth/check_for_user",
            type: "GET",
            success: response => {
                if (!!response.json && response.json.email) {
                    this.setState({
                        currentUser: response.json.email
                    })
                } else {
                    this.setState({
                        currentUser: null
                    })
                }
            }
        });
    }

    changePage = (page) => {
        this.setState({page});
    };

    updateCurrentUser = (val) => {
        this.setState({
            currentUser: val
        })
    };

    render() {
        return (
            <div>
                <Header
                    currentUser={this.state.currentUser}
                    updateCurrentUser={this.updateCurrentUser}
                    changePage={this.changePage}
                />
                {
                    !!this.state.currentUser ? <div className="container">{this.props.children}</div> :
                        <Auth
                            currentUser={this.state.currentUser}
                            page={this.state.page}
                            changePage={this.changePage}
                            updateCurrentUser={this.updateCurrentUser}
                        />
                }
            </div>
        );
    }
}

export default Layout;
