import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreenFrame from "./ReadScreenFrame";
import {createDrawerNavigator} from "@react-navigation/drawer";
import MenuDrawer from "../../Menu/MenuDrawer";

export default class ReadScreenDrawerFrame extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        let Drawer = createDrawerNavigator()
        return (<MenuDrawer baseScreenName = {ScreenNames.WRITE_SCREEN_FRAME}>
            <Drawer.Screen
                name={ScreenNames.READ_SCREEN_FRAME}
                component={ReadScreenFrame}
            />
        </MenuDrawer>)
    }
}
