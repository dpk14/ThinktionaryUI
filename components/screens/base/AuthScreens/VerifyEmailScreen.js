import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View, Image} from 'react-native';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import MakeAccount from "../../../../requestHandler/Requests/AccountRequests/MakeAccount";
import Screen, {baseStyles, styles} from "../Screen";
import StyledBase from "../StyledBase";
import {_onLogin} from "../functions/callBacks";
import {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";
import ResetEmail from "../../../../requestHandler/Requests/AccountRequests/ResetEmail";
import {getScreenWidth} from "../../../utils/scaling";

export default class VerifyEmailScreen extends Screen {

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
        let {username, password, email} = this.props.route.params
        new MakeAccount(username, password, email, this.state.emailKey).fetchAndExecute(
            () => new Login(username, password).fetchAndExecute(_onLogin(this.props.navigation, username, password)),
            () => this.setState({loading: false}));
    }

    confirmEmailKeyAndRegister() {
        let {username, password, email} = this.props.route.params
        new ResetEmail(username, email, this.state.emailKey).fetchAndExecute(
            () => new Login(username, password).fetchAndExecute(_onLogin(this.props.navigation, username, password)),
            () => this.setState({loading: false}));
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
                    attrName='emailKey'
                    title='Email Verification Key'
                    value={this.state.emailKey}
                    updateMasterState={this._updateMasterState}
                    marginVertical={30}
                />
                <CustomButton
                    text="Submit Key"
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
                            this.props.route.params.newAccount ? this.confirmEmailKeyAndCreateAccount() : this.confirmEmailKeyAndRegister()
                        }
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
