import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../ReadScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import LinearGradient from "expo-linear-gradient/build/LinearGradient";
import {HEADER_HEIGHT} from "../../../../utils/scaling";

export default class ReadScreenFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Stack = createStackNavigator()
        let {navigation} = this.props
        return (<Stack.Navigator screenOptions={{...HEADER_STYLES,
                                                ...{headerLeft : () => <WriteBackButton navigation={navigation}/>,
                                                    headerRight : () => <OptionButton position={'right'}
                                                                                      navigation={navigation}
                                                                        />,
                                                    headerBackground : ()=> {return <LinearGradient colors={['rgba(127, 63, 191, 1)', 'rgba(127, 63, 191, 0)']} end={[0, 1, 1]}
                                                                                                    start={[1, 0, 0]} style={{height : HEADER_HEIGHT}}/>},
                                                    headerTransparent : true,}}}>
            <Stack.Screen
                name={ScreenNames.READ_SCREEN}
                component={ReadScreen}
            />
        </Stack.Navigator>)
    }
}
