import React, { Component } from 'react';

import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from "../navigation/ScreenNames";
import * as Font from "expo-font";

import HomeScreen from "../components/screens/base/AccountScreens/HomeScreen";
import LoginScreen from "../components/screens/base/AccountScreens/LoginScreen";
import NewAccountScreen from "../components/screens/base/AccountScreens/NewAccountScreen";
import WriteScreen from "../components/screens/base/JournalScreens/WriteScreen";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../components/utils/FontUtils";
import ReadScreen from "../components/screens/base/JournalScreens/ReadScreen";

//https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

export default class Auth extends Component {

    constructor(props) {
        super(props);
    }


    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
    }

    render(){
        let Stack = createStackNavigator()

        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={this.props.screenOptions}
                >
                    <Stack.Screen
                        name={ScreenNames.HOME_SCREEN}
                        component={HomeScreen}
                        options={{headerShown : false}}
                    />
                    <Stack.Screen
                        name={ScreenNames.LOGIN_SCREEN}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name={ScreenNames.NEW_ACCT_SCREEN}
                        component={NewAccountScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


