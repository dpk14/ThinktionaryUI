import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import makeAccount from "../../../../requestHandler/Requests/AccountRequests/MakeAccount";
import Screen, {baseStyles, styles} from "../Screen";
import StyledBase from "../StyledBase";
import {_onLogin, parseOrAlert} from "../functions/callBacks";

let USERNAME_MIN_LENGTH = 1
let PASSWORD_MIN_LENGTH = 6

export default class NewAccountScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            loading : false,
        }
    }

    _onButtonClick = (response, exceptionThrown) => {
        if (exceptionThrown) {
            alert(response);
        } else {
            new Login(this.state.username, this.state.password).fetchAndExecute(_onLogin(this.props.navigation))
        }
    }

    createAccount(username, password) {
        if (this.validateInfo(username, password)) new makeAccount(username, password).fetchAndExecute(this._onButtonClick);
    }

    validateInfo(username, password){
        let messages = []
        if (username.length < 1) messages.push("Username cannot be empty")
        if (password.length < PASSWORD_MIN_LENGTH) messages.push("Password must exceed " + (PASSWORD_MIN_LENGTH - 1).toString() + " characters")
        if(messages.length == 0) return true
        else {
            let message = ""
            messages.forEach((msg) => message+=msg + "\n")
            alert(message)
            return false
        }
    }

    render() {
        return (
            <StyledBase>
                    <Text style={baseStyles.title}>Thinktionary</Text>
                    <StyledInputBox
                        attrName='username'
                        title='Username'
                        value={this.state.username}
                        updateMasterState={this._updateMasterState}
                        marginVertical={15}
                    />
                    <StyledInputBox
                        attrName='password'
                        title='Password'
                        value={this.state.password}
                        updateMasterState={this._updateMasterState}
                        marginVertical={15}
                        secureTextEntry={true}
                    />
                    <CustomButton
                        text="Create Account"
                        disabled={this.state.loading}
                        style={{
                            marginTop : 8,
                            width : 220
                        }}
                        onPress={() => {
                            this.setState({loading : true})
                            this.createAccount(this.state.username, this.state.password)
                        }}
                    />
            </StyledBase>
        );
    }
}
