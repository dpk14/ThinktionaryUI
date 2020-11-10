import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View, Image} from 'react-native';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Screen, {baseStyles, styles} from "../Screen";
import StyledBase from "../StyledBase";
import VerifyAccountInfo from "../../../../requestHandler/Requests/AccountRequests/VerifyAccountInfo";
import ScreenNames from "../../../../navigation/ScreenNames";
import {getScreenWidth} from "../../../utils/scaling";

let USERNAME_MIN_LENGTH = 1
let PASSWORD_MIN_LENGTH = 6

export default class NewAccountScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            confirmPassword : '',
            email : '',
            loading : false,
        }
    }

    async componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=> this.setState({loading : false}))
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    verifyAccountInfo(username, password, confirmPassword, email) {
        if (this.validateInfo(username, password, confirmPassword, email)) {
                new VerifyAccountInfo(username, email).fetchAndExecute(
                    () => this.props.navigation.navigate(ScreenNames.VERIFY_ACCT_SCREEN, {
                        username : username,
                        password : password,
                        email : email,
                        newAccount : true}),
                    () => this.setState({loading: false}));
        } else {
            this.setState({loading: false})
        }
    }

    validateInfo(username, password, confirmPassword, email){
        let messages = []
        if (username.length < 1) messages.push("Username cannot be empty")
        if (password.length < PASSWORD_MIN_LENGTH) messages.push("Password must exceed " + (PASSWORD_MIN_LENGTH - 1).toString() + " characters")
        if (password != confirmPassword) messages.push("Passwords do not match")
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) messages.push ("Invalid email address");
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
                <Image
                    style ={{
                        aspectRatio : 1928/578,
                        width : getScreenWidth()*.8,
                        height : undefined,
                        marginBottom : 15
                    }}
                    resizeMode={'contain'}
                    source={require("../../../../assets/images/thinktionary.png")}
                />
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
                    <StyledInputBox
                        attrName='confirmPassword'
                        title='Confirm Password'
                        value={this.state.confirmPassword}
                        updateMasterState={this._updateMasterState}
                        marginVertical={15}
                        secureTextEntry={true}
                    />
                    <StyledInputBox
                        attrName='email'
                        title='Email'
                        value={this.state.email}
                        updateMasterState={this._updateMasterState}
                        marginVertical={15}
                        secureTextEntry={false}
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
                            this.verifyAccountInfo(this.state.username, this.state.password, this.state.confirmPassword, this.state.email)
                        }}
                    />
                <Image
                    style ={{aspectRatio : 1499/1151, marginTop : 30, width : getScreenWidth()*.4, height : undefined}}
                    resizeMode={'contain'}
                    source={require("../../../../assets/images/thinkart2.png")}
                />
            </StyledBase>
        );
    }
}
