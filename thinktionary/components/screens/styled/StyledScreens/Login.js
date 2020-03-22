import React, {Component} from "react";
import {ABSTRACT_METHOD} from "../../../utils/abstraction";
import StyledScreen from "../StyledScreen";
import HomeScreen from "../../base/AccountScreens/HomeScreen";
import LoginScreen from "../../../deprecated/AccountScreens/LoginScreen";

export default class Login extends StyledScreen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return this.style(<LoginScreen/>)
    }
}
