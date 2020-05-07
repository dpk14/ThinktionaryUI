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
import WriteScreen from "../components/screens/base/JournalScreens/WriteScreen";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../components/utils/FontUtils";
import ReadScreen from "../components/screens/base/JournalScreens/ReadScreen";
import {screenOptions} from "../App";
import AppLoading from "expo/build/launch/AppLoading";

//https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }

    render(){
        if(this.state.loading) return <AppLoading></AppLoading>
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
                  name={ScreenNames.WRITE_SCREEN}
                  component={WriteScreen}
              />
              <Stack.Screen
                  name={ScreenNames.READ_SCREEN}
                  component={ReadScreen}
              />
          </Stack.Navigator>
    );
  }
}


