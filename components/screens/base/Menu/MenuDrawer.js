import {drawerStyle} from "./config";
import {OptionsMenu} from "./OptionsMenu";
import React, {Component} from "react";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ScreenNames from "../../../../navigation/ScreenNames";
import WriteScreenFrame from "../JournalScreens/navigation/WriteScreenFrame";
import {ABOUT_SCREEN, HELP_SCREEN, NOTIFICATIONS_SCREEN} from "./MenuScreenNames";
import NotificationsScreen from "./MenuScreens/NotificationsScreen";
import MenuScreen from "./MenuScreens/MenuScreen";
import AboutScreen from "./MenuScreens/InfoScreens/AboutScreen";
import HelpScreen from "./MenuScreens/InfoScreens/HelpScreen";

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
            {this.buildMenuScreen(Drawer, NOTIFICATIONS_SCREEN, (props) => <NotificationsScreen {...props}/>)}
            {this.buildMenuScreen(Drawer, ABOUT_SCREEN, (props) => <AboutScreen {...props}/>)}
            {this.buildMenuScreen(Drawer, HELP_SCREEN, (props) => <HelpScreen {...props}/>)}
        </Drawer.Navigator>)
   }
}
