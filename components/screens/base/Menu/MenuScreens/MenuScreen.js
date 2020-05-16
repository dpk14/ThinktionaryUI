import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../../JournalScreens/ReadScreen";
import React, {Component} from 'react'
import {object, string} from "prop-types"

export default class MenuScreen extends Component{

    static propTypes = {
        screen : object.isRequired,
        screenName : string.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        let {screen, screenName} = this.props
        let Stack = createStackNavigator()
        let {navigation} = this.props
        return (<Stack.Navigator screenOptions={{...HEADER_STYLES,
            ...{headerLeft : () => <OptionButton position={'left'}
                                                  navigation={navigation}
                />}}}>
            <Stack.Screen
                name={screenName}
                component={screen}
            />
        </Stack.Navigator>)
    }
}
