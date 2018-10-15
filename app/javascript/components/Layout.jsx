import React from 'react';
import Header from './Header';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
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

  updateCurrentUser = (val) => {
    this.setState({
      currentUser: val
    })
  };

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/>
          {this.state.currentUser && <div className="container">{this.props.children}</div>}
      </div>
    );
  }
}

export default Layout;
