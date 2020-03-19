import React, { Component } from 'react';
import LoginScreen from './components/LoginScreen'
import LoginScreenEfficient from "./components/PotentialEnhancements/LoginScreenEfficient";

export default class App extends Component {

  render() {
    return (
        <LoginScreenEfficient></LoginScreenEfficient>
    );
  }
}


