import {drawerStyle} from "./config";
import {OptionsMenu} from "./OptionsMenu";
import React, {Component} from "react";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";

export default class MenuDrawer extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        let Drawer = createDrawerNavigator()
        let {navigation, children} = this.props
        return(
        <Drawer.Navigator
            drawerStyle={drawerStyle}
            drawerContent={()=><OptionsMenu navigation={navigation}/>}
        >
            {children}
        </Drawer.Navigator>)
   }
}