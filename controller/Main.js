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
import Initializer from "./Initializer";
import Auth from "./Auth";
import App from "./App";
import React from "react";

//https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

let screenOptions={
    headerTitle : "Thinktionary",
    headerBackTitle: false,
    headerTransparent: true,
    gestureResponseDistance : {horizontal : 600 },
    headerTitleStyle: {
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },
}

export default class Main extends Component {

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
    }

    render(){
        let Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={screenOptions}
                >
                    <Stack.Screen
                        name={ScreenNames.INITIALIZER_SCREEN}
                        component={Initializer}
                    />
                    <Stack.Screen
                        name={ScreenNames.AUTH_NAVIGATION}
                        component={Auth}
                    />
                    <Stack.Screen
                        name={ScreenNames.APP_NAVIGATION}
                        component={App}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


