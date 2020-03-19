import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "../../EntryBox";
import CustomButton from "../../CustomButton";
import Login from "../../../requestHandler/Requests/AccountRequests/Login"

import AccountScreen, {styles} from "./AccountScreen";
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class LoginScreen extends AccountScreen {

    constructor(props) {
        super(props);
    }

    fillBody() {

        return (<LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                start={[0, 1]} style={styles.linearGradient}>
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
        </LinearGradient>)
    }
}

