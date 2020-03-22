import React, {Component} from "react";
import {ABSTRACT_METHOD} from "../../../utils/abstraction";
import StyledScreen from "../StyledScreen";
import HomeScreen from "../../base/AccountScreens/HomeScreen";
import WriteScreen from "../../base/JournalScreens/WriteScreen";

export default class Write extends StyledScreen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return this.style(<WriteScreen/>)
    }
}
