import React, {Component} from "react";
import StyledScreen from "../../base/StyledBase";
import HomeScreen from "../../base/AccountScreens/HomeScreen";

export default class Home extends StyledScreen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return <HomeScreen navigation={this.props.navigation}/>
    }
}

