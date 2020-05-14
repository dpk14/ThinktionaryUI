import {drawerStyle} from "./config";
import {OptionsMenu} from "./OptionsMenu";
import React, {Component} from "react";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ScreenNames from "../../../../navigation/ScreenNames";
import WriteScreenFrame from "../JournalScreens/navigation/WriteScreenFrame";
import {NOTIFICATIONS_SCREEN} from "./MenuScreenNames";
import NotificationsScreen from "./MenuScreens/NotificationsScreen";

export default class MenuDrawer extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        let Drawer = createDrawerNavigator()
        let {navigation, children} = this.props
        return(
        <Drawer.Navigator
            //drawerStyle={drawerStyle}
            drawerContent={(props)=><OptionsMenu {...props}/>}
        >
            {children}
            <Drawer.Screen
                name={NOTIFICATIONS_SCREEN}
                component={NotificationsScreen}
            />
        </Drawer.Navigator>)
   }
}
