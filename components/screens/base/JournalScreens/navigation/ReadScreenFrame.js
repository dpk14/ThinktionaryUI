import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../ReadScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import WriteBackButtonImg from "../../../../Buttons/HeaderButtons/Images/WriteBackButtonImg";


export default class ReadScreenFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Stack = createStackNavigator()
        return (<Stack.Navigator screenOptions={{...HEADER_STYLES,
                                                ...{headerLeft : ()=><WriteBackButton navigation={this.props.navigation}/>}}}>
            <Stack.Screen
                name={ScreenNames.READ_SCREEN}
                component={ReadScreen}
                //options={{headerLeft : ()=><WriteBackButton navigation={this.props.navigation}/>}}
            />
        </Stack.Navigator>)
    }
}
