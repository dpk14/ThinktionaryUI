import React, {Component} from "react";
import {ABSTRACT_METHOD} from "../../../utils/abstraction";
import StyledScreen from "../StyledScreen";
import HomeScreen from "../../base/AccountScreens/HomeScreen";
import NewAccountScreen from "../../../deprecated/AccountScreens/NewAccountScreen";

export default class NewAccount extends StyledScreen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return <NewAccountScreen navigation={this.props.navigation}/>
    }
}
