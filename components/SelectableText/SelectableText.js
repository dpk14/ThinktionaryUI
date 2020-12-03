import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";

export default class SelectableText extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style = {selectableTextStyles.background}
                activeOpacity = {0.0}
                onPress = {this.props.onPress}
            >
                <Text
                    style = {selectableTextStyles.text}
                >
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

export const selectableTextStyles = StyleSheet.create({
    background: {
        alignItems: 'center',
        backgroundColor : 'rgba(52, 52, 52, 0)',
    }, text: {
        fontSize: 16,
        marginVertical : 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    }
});
