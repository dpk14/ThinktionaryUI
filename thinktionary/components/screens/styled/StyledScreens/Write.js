import React, {Component} from "react";
import {ABSTRACT_METHOD} from "../../../utils/abstraction";
import StyledScreen from "../../base/StyledBase";
import HomeScreen from "../../base/AccountScreens/HomeScreen";
import WriteScreen from "../../base/JournalScreens/WriteScreen";

export default class Write extends StyledScreen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return <WriteScreen navigation={this.props.navigation}/>
    }
}
