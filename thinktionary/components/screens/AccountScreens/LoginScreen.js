
import { Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {StyleSheet, View} from 'react-native';
import EntryBox from "../../EntryBox";
import CustomButton from "../../CustomButton";
import Login from "../../../requestHandler/Requests/AccountRequests/Login"
import {styles} from "../Screen";
import React from "react";
import AccountScreen from "./AccountScreen"
export default class LoginScreen extends AccountScreen {

    constructor(props) {
        super(props);
    }

    fillBody() {

        return (
            <View style = {styles.container}>
                <Text style={styles.title}>Thinktionary</Text>
                <EntryBox
                    attrName='username'
                    title='Username'
                    value={this.state.username}
                    updateMasterState={this._updateMasterState}
                />
                <EntryBox
                    attrName='password'
                    title='Password'
                    value={this.state.password}
                    updateMasterState={this._updateMasterState}
                />
                <CustomButton
                    text="Login"
                    onPress={() => {
                        new Login(this.state.username, this.state.password).fetchAndExecute(this._onLogin);
                    }}
                />
            </View>)
    }
}

