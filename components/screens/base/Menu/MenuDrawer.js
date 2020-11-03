import {drawerStyle} from "./config";
import {OptionsMenu} from "./OptionsMenu";
import React, {Component} from "react";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ScreenNames from "../../../../navigation/ScreenNames";
import WriteScreenFrame from "../JournalScreens/navigation/WriteScreenFrame";
import {
    ABOUT_SCREEN,
    ABOUT_SCREEN_FRAME, ACCOUNT_SCREEN_FRAME,
    HELP_SCREEN, HELP_SCREEN_FRAME,
    NOTIFICATIONS_SCREEN,
    NOTIFICATIONS_SCREEN_FRAME
} from "./MenuScreenNames";
import NotificationsScreen from "./MenuScreens/NotificationsScreen";
import MenuScreen from "./MenuScreens/MenuScreen";
import AboutScreen from "./MenuScreens/InfoScreens/AboutScreen";
import HelpScreen from "./MenuScreens/InfoScreens/HelpScreen";
import NotificationsScreenFrame from "./MenuScreens/ScreenFrames/NotificationsScreenFrame";
import AboutScreenFrame from "./MenuScreens/ScreenFrames/AboutScreenFrame";
import HelpScreenFrame from "./MenuScreens/ScreenFrames/HelpScreenFrame";
import AccountScreenFrame from "./MenuScreens/ScreenFrames/AccountScreenFrame";

export default class MenuDrawer extends Component{

    constructor(props) {
        super(props);
    }

    frame(screenName){
        return screenName + "Frame"
    }

    buildMenuScreen(Drawer, screenName, screen){
        return <Drawer.Screen
            name={screenName}
            component={(props)=> {
                let newProps = {...props, ...{screenName : screenName, screen : screen}}
                return <MenuScreen {...newProps} />
            }}
        />
    }

    render(){
        let Drawer = createDrawerNavigator()
        let {navigation, children} = this.props
        return(
        <Drawer.Navigator
            drawerContent={(props)=><OptionsMenu {...props}/>}
        >
            {children}
            <Drawer.Screen
                name={ACCOUNT_SCREEN_FRAME}
                component={AccountScreenFrame}
            />
            <Drawer.Screen
                name={NOTIFICATIONS_SCREEN_FRAME}
                component={NotificationsScreenFrame}
            />
            <Drawer.Screen
                name={ABOUT_SCREEN_FRAME}
                component={AboutScreenFrame}
            />
            <Drawer.Screen
                name={HELP_SCREEN_FRAME}
                component={HelpScreenFrame}
            />
        </Drawer.Navigator>)
   }
}
