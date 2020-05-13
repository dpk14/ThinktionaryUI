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
import {drawerStyle} from "../../Menu/config";
import MenuDrawer from "../../Menu/MenuDrawer";

export default class ReadScreenDrawerFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Drawer = createDrawerNavigator()
        let {navigation} = this.props
        return (<MenuDrawer navigation={navigation}>
            <Drawer.Screen
                name={ScreenNames.READ_SCREEN_FRAME}
                component={ReadScreenFrame}
            />
        </MenuDrawer>)
    }
}
