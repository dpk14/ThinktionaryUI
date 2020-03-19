import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "../../EntryBox";
import CustomButton from "../../CustomButton";
import Login from "../../../requestHandler/Requests/AccountRequests/Login"
import makeAccount from "../../../requestHandler/Requests/AccountRequests/MakeAccount";
import {styles} from "../Screen";
import AccountScreen from "./AccountScreen";

export default class NewAccountScreen extends AccountScreen {

    constructor(props) {
        super(props);
    }

    _onButtonClick = (response, exceptionThrown) => {
        if (exceptionThrown) {
            alert(response);
        } else {
            new Login(this.state.username, this.state.password).fetchAndExecute(this._onLogin)
        }
    }

    fillBody() {
        return (<View style = {styles.container}>
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
                        text="Create Account"
                        onPress={() => {
                            new makeAccount(this.state.username, this.state.password).fetchAndExecute(this._onButtonClick);
                        }}
                        width="55%"
                    />
            </View>
        );
    }
}
