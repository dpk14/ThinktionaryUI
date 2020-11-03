import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../../utils/baseStyles";
import OptionButton from "../../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import React, {Component} from 'react'
import {object, string} from "prop-types"
import {ABOUT_SCREEN, HELP_SCREEN} from "../../MenuScreenNames";
import AboutScreen from "../InfoScreens/AboutScreen";
import HelpScreen from "../InfoScreens/HelpScreen";

export default class MenuScreen extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        let Stack = createStackNavigator()
        let {navigation} = this.props
        return (<Stack.Navigator screenOptions={{...HEADER_STYLES,
            ...{headerLeft : () => <OptionButton position={'left'}
                                                 navigation={navigation}
                />}}}>
            <Stack.Screen
                name={HELP_SCREEN}
                component={HelpScreen}
            />
        </Stack.Navigator>)
    }
}
