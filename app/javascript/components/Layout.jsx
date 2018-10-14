import React from 'react';
import Header from './Header';

class Layout extends React.Component{
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
