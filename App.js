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
import HomeScreen from "./components/screens/base/AccountScreens/HomeScreen";
import LoginScreen from "./components/screens/base/AccountScreens/LoginScreen";
import NewAccountScreen from "./components/screens/base/AccountScreens/NewAccountScreen";
import WriteScreen from "./components/screens/base/JournalScreens/WriteScreen";


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
    }

    render(){
        if (this.state.loading) return <AppLoading></AppLoading>
        let Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown : false}}>
                    <Stack.Screen
                        name={ScreenNames.INITIALIZER_SCREEN}
                        component={Initializer}
                    />
                    <Stack.Screen
                        name={ScreenNames.HOME_SCREEN}
                        component={HomeScreen}
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
                        name={ScreenNames.WRITE_SCREEN}
                        component={WriteScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}

/*
                    <Stack.Screen
                        name={ScreenNames.AUTH_NAVIGATION}
                        component={Auth}
                    />
                    <Stack.Screen
                        name={ScreenNames.APP_NAVIGATION}
                        component={Main}
                    />

 */

/*
<Stack.Screen
    name={ScreenNames.HOME_SCREEN}
    component={HomeScreen}
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
name={ScreenNames.WRITE_SCREEN}
component={WriteScreen}
/>
*/
