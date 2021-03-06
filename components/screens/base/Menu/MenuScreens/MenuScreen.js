import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
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
        let Stack = createStackNavigator()
        let {screen, screenName, navigation} = this.props
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
