import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native'
import {PURPLE} from "../../../utils/baseStyles";
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";
import {AppLoading} from "expo";
import {getScreenHeight, getScreenWidth} from "../../../utils/scaling";
import {PWD, USER_KEY} from "../../../../assets/config";
import Logout from "../../../../requestHandler/Requests/AccountRequests/Logout";
import ScreenNames from "../../../../navigation/ScreenNames";
import {_onLogout} from "../functions/callBacks";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

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
        return (
            <DrawerContentScrollView>
                <DrawerItemList>
                <TouchableOpacity style={{flex: 1}}
                                  onPress={() => new Logout(username, pwd).fetchAndExecute(_onLogout(this.props.navigation))}>
                    <Text style={menuStyles.headerText}>
                        {"Logout"}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const menuStyles = StyleSheet.create({
    headerText : {
        fontSize : 22,
        color: '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    }

});

/*
    render() {
        if (this.state.loading) return <AppLoading/>
        let {username, pwd} = this.state
        return (
            <View style={{flex: 1, backgroundColor: PURPLE, opacity: .9}}>
                <View style={{marginTop : 40, marginLeft : 20, flex : 1}}>
                <TouchableOpacity style={{flex: 1}}
                                  onPress={() => new Logout(username, pwd).fetchAndExecute(_onLogout(this.props.navigation))}>
                    <Text style={menuStyles.headerText}>
                        {"Logout"}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
 */