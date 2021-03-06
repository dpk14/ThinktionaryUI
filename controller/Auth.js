import React, { Component } from 'react';

import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from "../navigation/ScreenNames";
import * as Font from "expo-font";

import HomeScreen from "../components/screens/base/AuthScreens/HomeScreen";
import LoginScreen from "../components/screens/base/AuthScreens/LoginScreen";
import NewAccountScreen from "../components/screens/base/AuthScreens/NewAccountScreen";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../components/utils/FontUtils";
import LoadingScreen from "../components/screens/LoadingScreen";

//https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }

    async componentDidMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
    }

    render(){
        if (this.state.loading) return (<LoadingScreen/>)
        let Stack = createStackNavigator()
        return (
            <Stack.Navigator
                screenOptions={{
                    headerTitle : "Thinktionary",
                    headerBackTitle: false,
                    headerTransparent: true,
                    gestureResponseDistance : {horizontal : 600 },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                        fontFamily: HP_SIMPLIFIED_BOLD,
                        shadowOffset: {height: 4},
                        shadowRadius: 20,
                        shadowOpacity: .5
                    }}}
            >
                <Stack.Screen
                    name={ScreenNames.HOME_SCREEN}
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ScreenNames.LOGIN_SCREEN}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name={ScreenNames.NEW_ACCT_SCREEN}
                    component={NewAccountScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        );
    }
}


