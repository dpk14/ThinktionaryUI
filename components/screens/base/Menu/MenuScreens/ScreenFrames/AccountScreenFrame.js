import {createStackNavigator} from "@react-navigation/stack";
import React, {Component} from 'react'
import OptionButton from "../../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import {HEADER_STYLES} from "../../../../../utils/baseStyles";
import {ACCOUNT_SCREEN} from "../../MenuScreenNames";
import AccountScreen from "../AccountScreen";
import VerifyEmailScreen from "../../../AuthScreens/VerifyEmailScreen";
import screenNames from "../../../../../../navigation/ScreenNames";

export default class AccountScreenFrame extends Component{

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
                name={ACCOUNT_SCREEN}
                component={AccountScreen}
            />
            <Stack.Screen
                name={screenNames.VERIFY_ACCT_SCREEN}
                component={VerifyEmailScreen}
            />
        </Stack.Navigator>)
    }
}
