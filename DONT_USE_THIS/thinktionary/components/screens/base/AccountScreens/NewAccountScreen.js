import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "../../../EntryBox";
import CustomButton from "../../../CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import makeAccount from "../../../../requestHandler/Requests/AccountRequests/MakeAccount";
import Screen, {styles} from "../Screen";
import StyledBase from "../StyledBase";
import {_onLogin} from "./utils/callBacks";

export default class NewAccountScreen extends Screen {

    constructor(props) {
        super(props);
    }

    _onButtonClick = (response, exceptionThrown) => {
        if (exceptionThrown) {
            alert(response);
        } else {
            new Login(this.state.username, this.state.password).fetchAndExecute(_onLogin(this.props.navigation))
        }
    }

    render() {
        return (
            <StyledBase>
            <View style = {[styles.container]}>
                    <Text style={styles.title}>Thinktionary</Text>
                    <EntryBox
                        attrName='username'
                        title='Username'
                        value={this.state.username}
                        updateMasterState={this._updateMasterState}
                        marginVertical={12}
                    />
                    <EntryBox
                        attrName='password'
                        title='Password'
                        value={this.state.password}
                        updateMasterState={this._updateMasterState}
                        marginVertical={12}
                    />
                    <CustomButton
                        text="Create Account"
                        onPress={() => {
                            new makeAccount(this.state.username, this.state.password).fetchAndExecute(this._onButtonClick);
                        }}
                        width={220}
                    />
            </View>
            </StyledBase>
        );
    }
}