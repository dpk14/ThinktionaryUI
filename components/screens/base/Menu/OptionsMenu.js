import Screen, {baseStyles} from "../Screen";
import {View} from "react-native";
import React from "react";

export default class OptionsMenu extends Screen {

    constructor(props) {
        super(props);
    }

    renderScreen() {
        return <View style={{flex: 1}}/>;
    }
}
