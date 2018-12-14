import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
        <header>
          <img src={logo} className="logo" alt="logo" />
          <h1 className="f1l">muz</h1>
        </header>
    );
  }
}

export default Header;
