import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../ReadScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import WriteBackButtonImg from "../../../../Buttons/HeaderButtons/Images/WriteBackButtonImg";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import ReadScreenFrame from "./ReadScreenFrame";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {OptionsMenu} from "../../Menu/OptionsMenu";

export default class ReadScreenDrawerFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Drawer = createDrawerNavigator()
        let {navigation} = this.props
        return (<Drawer.Navigator drawerContent={<OptionsMenu navigation={navigation}/>}
                >
            <Drawer.Screen
                name={ScreenNames.READ_SCREEN_FRAME}
                component={ReadScreenFrame}
            />
        </Drawer.Navigator>)
    }
}
