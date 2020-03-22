import React, {Component} from "react";
import {ABSTRACT_METHOD} from "../../../utils/abstraction";
import StyledScreen from "../StyledScreen";
import HomeScreen from "../../base/AccountScreens/HomeScreen";

export default class Home extends StyledScreen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return this.style(<HomeScreen/>)
    }
}

