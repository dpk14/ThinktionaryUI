import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../configStrings";
import EntryBox from "./EntryBox";
const MULTILINE_TOPMARGIN_ADJUSTER = 4

export default class TopicCreator extends EntryBox {

    constructor(props) {
        if(props.onSubmitEditing!=undefined) throw Error("Cannot define custom onSubmit for TopicCreator")
        super(props);
        this.state.onSubmitEditing = this._onSubmitEditing
    }

    _onSubmitEditing(){

    }



}


const Styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        position: 'relative',
        backgroundColor : "white",
        shadowOffset: { height: 4},
        shadowRadius: 20,
    },
    textInput: {
        fontWeight: '400',
        fontFamily: HP_SIMPLIFIED,
        color: '#282828',
        width: '100%',
        height: 65,
        position: 'relative',
        borderRadius: 20,
        opacity: .9
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontWeight: '300',
        lineHeight: 24,
    }

})
