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
        let Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerTitle : "Thinktionary",
                    headerBackTitle: false,
                    headerTransparent: true,
                    gestureResponseDistance : {horizontal : 600 },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                        //fontFamily: HP_SIMPLIFIED_BOLD,
                        shadowOffset: {height: 4},
                        shadowRadius: 20,
                        shadowOpacity: .5
                    }}}>
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


