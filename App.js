import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ScreenNames from "./navigation/ScreenNames";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "./components/utils/FontUtils";
import Initializer from "./controller/Initializer";
import React, {Component} from "react";
import Auth from "./controller/Auth";
import Main from "./controller/Main";
import AppLoading from "expo/build/launch/AppLoading";
import HomeScreen from "./components/screens/base/AuthScreens/HomeScreen";
import LoginScreen from "./components/screens/base/AuthScreens/LoginScreen";
import NewAccountScreen from "./components/screens/base/AuthScreens/NewAccountScreen";
import WriteScreen from "./components/screens/base/JournalScreens/WriteScreen";
import ReadScreen from "./components/screens/base/JournalScreens/ReadScreen";
import {Image} from "react-native";
import BackButtonImg from "./components/Buttons/HeaderButtons/Images/BackButtonImg";
import WriteBackButtonImg from "./components/Buttons/HeaderButtons/Images/WriteBackButtonImg";
import JournalTabScreen from "./components/screens/base/JournalScreens/navigation/JournalTabScreen";
import {HEADER_STYLES} from "./components/utils/baseStyles";
//import {BackButton, BackButtonImage} from "./components/BackButtonImage";


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading: false})
    }

    render() {
        if (this.state.loading) return <AppLoading></AppLoading>
        let Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={HEADER_STYLES}>
                    <Stack.Screen
                        name={ScreenNames.INITIALIZER_SCREEN}
                        component={Initializer}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={ScreenNames.HOME_SCREEN}
                        component={HomeScreen}
                        options={{headerShown: false, gestureEnabled: false}}
                    />
                    <Stack.Screen
                        name={ScreenNames.LOGIN_SCREEN}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name={ScreenNames.NEW_ACCT_SCREEN}
                        component={NewAccountScreen}
                    />
                    <Stack.Screen
                        name={ScreenNames.APP_NAVIGATION}
                        component={JournalTabScreen}
                        options={{headerShown: false, gestureEnabled: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
