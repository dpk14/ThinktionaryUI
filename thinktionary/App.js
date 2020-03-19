import React, { Component } from 'react';
import LoginScreenDeprecated from './components/deprecated/LoginScreenDeprecated'
import LoginScreen from "./components/screens/AccountScreens/LoginScreen";
import NewAccountScreen from "./components/screens/AccountScreens/NewAccountScreen";

export default class App extends Component {

  render() {
    return (
        <NewAccountScreen></NewAccountScreen>
    );
  }
}


