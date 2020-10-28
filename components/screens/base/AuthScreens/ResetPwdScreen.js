import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import MakeAccount from "../../../../requestHandler/Requests/AccountRequests/MakeAccount";
import Screen, {baseStyles, styles} from "../Screen";
import StyledBase from "../StyledBase";
import {_onLogin, parseOrAlert} from "../functions/callBacks";
import {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";
import VerifyAccount from "../../../../requestHandler/Requests/AccountRequests/VerifyAccountInfo";
import ScreenNames from "../../../../navigation/ScreenNames";
import ResetPassword from "../../../../requestHandler/Requests/AccountRequests/ResetPassword";

let PASSWORD_MIN_LENGTH = 6

export default class ResetPwdScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            password : '',
            confirmPassword : '',
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

    resetPassword() {
        let {password, confirmPassword, emailKey} = this.state;
        let {username, email} = this.props.route.params
        if (this.validateInfo(password, confirmPassword)) {
            new ResetPassword(username, password, email, emailKey).fetchAndExecute(
                () => new Login(username, password).fetchAndExecute(_onLogin(this.props.navigation, username, password)),
                () => this.setState({loading: false}));
        } else {
            this.setState({loading: false})
        }
    }


    validateInfo(password, confirmPassword){
        let messages = []
        if (password.length < PASSWORD_MIN_LENGTH) messages.push("Password must exceed " + (PASSWORD_MIN_LENGTH - 1).toString() + " characters")
        if (password != confirmPassword) messages.push("Passwords do not match")
        if (messages.length == 0) return true
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
                <Text style={verifyEmailStyles.title}>Thinktionary</Text>
                <StyledInputBox
                    attrName='password'
                    title='New Password'
                    value={this.state.password}
                    updateMasterState={this._updateMasterState}
                    marginVertical={15}
                    secureTextEntry={true}
                />
                <StyledInputBox
                    attrName='confirmPassword'
                    title='Confirm New Password'
                    value={this.state.confirmPassword}
                    updateMasterState={this._updateMasterState}
                    marginVertical={15}
                    secureTextEntry={true}
                />
                <StyledInputBox
                    attrName='emailKey'
                    title='Email Verification Key'
                    value={this.state.emailKey}
                    updateMasterState={this._updateMasterState}
                    marginVertical={30}
                />
                <CustomButton
                    text="Reset Password"
                    disabled={this.state.loading}
                    style={{
                        marginTop : 10,
                        width : 220
                    }}
                    onPress={() => {
                        if (isNaN(parseInt(this.state.emailKey))) {
                            alert("Confirmation key must be a number")
                        } else {
                            this.setState({loading: true})
                            this.resetPassword();
                        }
                    }}
                />
            </StyledBase>
        );
    }
}

export const verifyEmailStyles = StyleSheet.create({
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: "60%",
        marginBottom: 30,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    }
});
