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

export default class NewAccountScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            emailKey : '',
            loading : false,
        }
    }

    async componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=> this.setState({loading : false}))
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    confirmEmailKeyAndCreateAccount() {
        let {username, password, email} = this.props.navigation

        new makeAccount(username, password, email, this.state.emailKey).fetchAndExecute(
            () => new Login(username, password).fetchAndExecute(_onLogin(this.props.navigation)),
            () => this.setState({loading: false}));
    }

    render() {
        return (
            <StyledBase>
                <Text style={baseStyles.title}>Thinktionary</Text>
                <StyledInputBox
                    attrName='emailKey'
                    title='Email Verification Key'
                    value={this.state.emailKey}
                    updateMasterState={this._updateMasterState}
                    marginVertical={15}
                />
                <CustomButton
                    text="Submit Key"
                    disabled={this.state.loading}
                    style={{
                        marginTop : 8,
                        width : 220
                    }}
                    onPress={() => {
                        this.setState({loading : true})
                        this.confirmEmailKeyAndCreateAccount()
                    }}
                />
            </StyledBase>
        );
    }
}
