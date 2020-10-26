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
import JournalTabScreen from "./components/screens/base/JournalScreens/navigation/JournalTabScreen";
import {HEADER_STYLES} from "./components/utils/baseStyles";
import VerifyAccount from "./requestHandler/Requests/AccountRequests/VerifyAccountInfo";
import VerifyEmailScreen from "./components/screens/base/AuthScreens/VerifyEmailScreen";

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
                        name={ScreenNames.VERIFY_ACCT_SCREEN}
                        component={VerifyEmailScreen}
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

const styles = StyleSheet.create({
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: "30%",
        marginBottom: "%15",
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },

});
