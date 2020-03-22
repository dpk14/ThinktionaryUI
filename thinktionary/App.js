import React, { Component } from 'react';

import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from "./navigation/ScreenNames";
import * as Font from "expo-font";
//import Home from "./components/screens/styled/StyledScreens/Home";
import Login from "./components/screens/styled/StyledScreens/Login";
import NewAccount from "./components/screens/styled/StyledScreens/MakeAccount";

import Write from "./components/screens/styled/StyledScreens/Write";
import Wrapper from "./components/utils/Wrapper";
import HomeScreen from "./components/screens/base/AccountScreens/HomeScreen";
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";

//https://reactnavigation.org/docs/stack-navigator#navigationoptions-used-by-stacknavigator

export default class App extends Component {

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('./assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('./assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    render(){
        let Stack = createStackNavigator()

    return (
        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
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
              }}
              >
            <Stack.Screen
                name={ScreenNames.HOME_SCREEN}
                component={<Wrapper {HomeScreen}></Wrapper>}
                options={{headerShown : false}}
            />
            <Stack.Screen
                name={ScreenNames.LOGIN_SCREEN}
                component={Login}
            />
            <Stack.Screen
                name={ScreenNames.NEW_ACCT_SCREEN}
                component={NewAccount}
            />
              <Stack.Screen
                  name={ScreenNames.WRITE_SCREEN}
                  component={Write}
              />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}


