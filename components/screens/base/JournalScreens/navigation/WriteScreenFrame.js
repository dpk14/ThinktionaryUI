import GestureRecognizer from "react-native-swipe-gestures";
import {_onSubmit} from "../../functions/callBacks";
import StyledBase from "../../StyledBase";
import {View} from "react-native";
import React, {Component} from "react";
import WriteScreen, {newStyles} from "../WriteScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../ReadScreen";
import WriteBackButtonImg from "../../../../Buttons/HeaderButtons/Images/WriteBackButtonImg";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import {ReadFwdButton} from "../../../../Buttons/HeaderButtons/Buttons/ReadFwdButton";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";


export default class WriteScreenFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Stack = createStackNavigator()
        let {navigation} = this.props
        return (<Stack.Navigator screenOptions={{...HEADER_STYLES,
            ...{headerRight : () => <ReadFwdButton navigation={navigation}/>,
                headerLeft : () => <OptionButton position={'left'}
                                                  navigation={navigation}
                />}}}>
            <Stack.Screen
                name={ScreenNames.WRITE_SCREEN}
                component={WriteScreen}
            />
        </Stack.Navigator>)
    }
}
