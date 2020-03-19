import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "../EntryBox";
import CustomButton from "../CustomButton";
import {login} from "../../requestHandler/main"
import AccountScreenCore from "./AccountScreenCore";
import Login from "../../requestHandler/Requests/AccountRequests/Login";
import {Field, FieldMap} from "../structs/field";
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class LoginScreenEfficient extends Component {

    constructor(fieldMap, buttonName, buttonRequest, callBack) {
        super([]);

        this.state = {
            fields : fieldMap,
            buttonName : buttonName,
            buttonRequest : buttonRequest,
            callBack : callBack,
        };
    }

    _updateMasterComponent = (fields) => {
        this.setState({fields : fields})
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                <AccountScreenCore
                    fields = {this.state.fields}
                    buttonName=  {this.state.buttonName}
                    buttonRequest = {this.state.buttonRequest}
                    updateMasterComponent = {this._updateMasterComponent}
                    callBack={this.state.callBack}
                />
            );
        }
    }
}
