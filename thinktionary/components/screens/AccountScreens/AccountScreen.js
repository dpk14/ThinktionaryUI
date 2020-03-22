import React, { Component } from 'react';

import {StyleSheet} from 'react-native';
import Screen from "../Screen"
import {Journal} from "../../structs/journal";
import ScreenNames from "../../../navigation/ScreenNames";
import {ABSTRACT_CLASS} from "../../utils/abstraction";

export default class AccountScreen extends Screen {

    constructor(props) {
        super(props);

        this.state.username = ''
        this.state.password = ''
        if(this.constructor === AccountScreen) {
            ABSTRACT_CLASS()
        }
    }

    _onLogin = (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{
            let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
            this.props.navigation.navigate(ScreenNames.WRITE_SCREEN)
        }
    }
}

export const accountScreenStyles = StyleSheet.create({
    container: {}});
