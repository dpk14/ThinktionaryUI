import GestureRecognizer from "react-native-swipe-gestures";
import {_onSubmit} from "../functions/callBacks";
import StyledBase from "../StyledBase";
import {View} from "react-native";
import React, {Component} from "react";
import WriteScreen, {newStyles} from "./WriteScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ScreenNames from "../../../../navigation/ScreenNames";
import ReadScreen from "./ReadScreen";
import WriteBackButton from "../../../Buttons/HeaderButtons/WriteBackButton";


export default class JournalScreen extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Tab = createMaterialTopTabNavigator()
        return (<Tab.Navigator>
                    <Tab.Screen
                        name={ScreenNames.WRITE_SCREEN}
                        component={WriteScreen}
                    />
                    <Tab.Screen
                        name={ScreenNames.READ_SCREEN}
                        component={ReadScreen}
                        //options={{headerBackImage : ()=> {return <WriteBackButton/>}}}
                        />
            </Tab.Navigator>)
        }
}
