import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage, TouchableWithoutFeedback} from 'react-native'
import {ORANGE, PURPLE} from "../../../utils/baseStyles";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";
import {AppLoading} from "expo";
import {getScreenHeight, getScreenWidth} from "../../../utils/scaling";
import {PWD, USER_KEY} from "../../../../assets/config";
import Logout from "../../../../requestHandler/Requests/AccountRequests/Logout";
import ScreenNames from "../../../../navigation/ScreenNames";
import {_onLogout} from "../functions/callBacks";
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import {DrawerContentComponentProps, DrawerContentOptions} from "@react-navigation/drawer/src/types";
import {styles} from "../StyledBase";
import {LinearGradient} from "expo-linear-gradient";
import BackButtonImg from "../../../Buttons/HeaderButtons/Images/BackButtonImg";
import Icon from "../../../Buttons/HeaderButtons/Images/Icon";
import {
    ABOUT_SCREEN, ABOUT_SCREEN_FRAME, ACCOUNT_SCREEN_FRAME,
    HELP_SCREEN,
    HELP_SCREEN_FRAME,
    NOTIFICATIONS_SCREEN,
    NOTIFICATIONS_SCREEN_FRAME
} from "./MenuScreenNames";

export class OptionsMenu extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            username : '',
            pwd : '',
        }
    }

    async componentDidMount() {
        await FontUtils.loadFonts()
        let username = await AsyncStorage.getItem(USER_KEY)
        let pwd = await AsyncStorage.getItem(PWD)
        this.setState({loading : false, username : username, pwd : pwd})
    }

    render() {
        if (this.state.loading) return <AppLoading/>
        let {username, pwd} = this.state
        let {navigation} = this.props
        let scrollViewStyle = {...this.props, ...{style : {flex: 1}}}
        return (
            <LinearGradient colors={[PURPLE, ORANGE]} end={[1, 0]}
                            start={[0, 1]} style={{flex:1}}>
                <DrawerContentScrollView {...scrollViewStyle}>
                    <DrawerItem
                        label = "Back"
                        icon = {() => {return <BackButtonImg/>}}
                        labelStyle={menuStyles.headerText}
                        onPress={() => navigation.navigate(ScreenNames.WRITE_SCREEN)}
                    />
                    <DrawerItem
                        label="Account"
                        labelStyle={menuStyles.headerText}
                        icon = {() => {return <Icon source={require("../../../../assets/images/about.png")}/>}}
                        onPress={() => navigation.navigate(ACCOUNT_SCREEN_FRAME)}
                    />
                    <DrawerItem
                        label="Notifications"
                        labelStyle={menuStyles.headerText}
                        icon = {() => {return <Icon source={require("../../../../assets/images/bell.png")}/>}}
                        onPress={() => navigation.navigate(NOTIFICATIONS_SCREEN_FRAME)}
                    />
                    <DrawerItem
                        label="Logout"
                        labelStyle={menuStyles.headerText}
                        icon = {() => {return <Icon source={require("../../../../assets/images/logout.png")}/>}}
                        onPress={() => new Logout(username, pwd).fetchAndExecute(_onLogout(navigation))}
                    />
                    <DrawerItem
                        label="Help"
                        labelStyle={menuStyles.headerText}
                        icon = {() => {return <Icon source={require("../../../../assets/images/help.png")}/>}}
                        onPress={() => navigation.navigate(HELP_SCREEN_FRAME)}
                    />
                    <DrawerItem
                        label="About"
                        labelStyle={menuStyles.headerText}
                        icon = {() => {return <Icon source={require("../../../../assets/images/about.png")}/>}}
                        onPress={() => navigation.navigate(ABOUT_SCREEN_FRAME)}
                    />
                </DrawerContentScrollView>
            </LinearGradient>
        )
    }
}

const menuStyles = StyleSheet.create({
    headerText : {
        fontSize : 20,
        opacity : .9,
        color: "#FFFFFF",
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 4,
        shadowOpacity: .3
    }

});
