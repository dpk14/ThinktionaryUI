import React, {Component} from "react";
import ScreenNames from "../../../../../navigation/ScreenNames";
import WriteScreenFrame from "./WriteScreenFrame";
import {createDrawerNavigator} from "@react-navigation/drawer";
import MenuDrawer from "../../Menu/MenuDrawer";

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
