import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "../EntryBox";
import CustomButton from "../CustomButton";
import {login} from "../../requestHandler/main"
import AccountScreen from "./AccountScreen";
import Login from "../../requestHandler/Requests/AccountRequests/Login";
import {Field, FieldMap} from "../structs/field";
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class LoginScreenEfficient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            fields : new FieldMap([new Field('username', 'Username', ''),
                new Field('password', 'Password', '')])
        };
    }

    _onButtonClick = (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{

        }
    }

    _updateMasterComponent = (fields) => {
        this.setState({fields : fields})
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                <AccountScreen
                    fields = {this.state.fields}
                    buttonName= 'Login'
                    buttonRequest = {new Login(this.state.fields.getEntry('username').value, this.state.fields.getEntry('password').value)}
                    updateMasterComponent = {this._updateMasterComponent}
                    callBack={this._onButtonClick}
                />
            );
        }
    }
};
