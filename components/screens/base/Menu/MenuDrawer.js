import {drawerStyle} from "./config";
import {OptionsMenu} from "./OptionsMenu";
import React, {Component} from "react";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ScreenNames from "../../../../navigation/ScreenNames";
import WriteScreenFrame from "../JournalScreens/navigation/WriteScreenFrame";
import {NOTIFICATIONS_SCREEN} from "./MenuScreenNames";
import NotificationsScreen from "./MenuScreens/NotificationsScreen";
import MenuScreen from "./MenuScreens/MenuScreen";

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
            //drawerStyle={drawerStyle}
            drawerContent={(props)=><OptionsMenu {...props}/>}
        >
            {children}
            {this.buildMenuScreen(Drawer, NOTIFICATIONS_SCREEN, (props) => <NotificationsScreen {...props}/>)}
        </Drawer.Navigator>)
   }
}
