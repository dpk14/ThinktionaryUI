import React, {Component} from "react";
import StyledScreen from "../../base/StyledBase";
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
