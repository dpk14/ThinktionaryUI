import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../ReadScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {HEADER_STYLES} from "../../../../utils/baseStyles";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import WriteBackButtonImg from "../../../../Buttons/HeaderButtons/Images/WriteBackButtonImg";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import WriteScreenFrame from "./WriteScreenFrame";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {OptionsMenu} from "../../Menu/OptionsMenu";
import MenuDrawer from "../../Menu/MenuDrawer";
import ReadScreenFrame from "./ReadScreenFrame";

export default class WriteScreenDrawerFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Drawer = createDrawerNavigator()
        let {navigation} = this.props
        return (<MenuDrawer navigation={navigation}>
            <Drawer.Screen
                name={ScreenNames.WRITE_SCREEN_FRAME}
                component={WriteScreenFrame}
            />
        </MenuDrawer>)
    }
}
