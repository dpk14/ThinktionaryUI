import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from "./navigation/ScreenNames";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "./components/utils/FontUtils";
import Initializer from "./controller/Initializer";
import Auth from "./controller/Auth";
import Main from "./controller/Main";
import React, {Component} from "react";

export default class App extends Component {

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
    }

    render(){
        let Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <Stack.Navigator>
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
                        component={Main}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


