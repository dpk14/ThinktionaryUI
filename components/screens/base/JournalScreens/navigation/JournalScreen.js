import GestureRecognizer from "react-native-swipe-gestures";
import {_onSubmit} from "../../functions/callBacks";
import StyledBase from "../../StyledBase";
import {View} from "react-native";
import React, {Component} from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenNames from "../../../../../navigation/ScreenNames";
import WriteScreenFrame from "./WriteScreenFrame";
import ReadScreenFrame from "./ReadScreenFrame";

export default class JournalScreen extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        const Tab = createMaterialTopTabNavigator()
        return (<Tab.Navigator tabBar = {()=><View/>}>
            <Tab.Screen
                name={ScreenNames.WRITE_SCREEN_FRAME}
                component={WriteScreenFrame}
            />
            <Tab.Screen
                name={ScreenNames.READ_SCREEN_FRAME}
                component={ReadScreenFrame}
            />
        </Tab.Navigator>)
    }
}
