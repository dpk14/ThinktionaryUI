import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from "./AccountScreens/LoginScreen";
import Wrapper from "../../utils/Wrapper";

export default class StyledBase extends Component{

    constructor(props) {
        super(props);
    }

    render() {
            return (
                <KeyboardAvoidingView
                    style={{flex : 1}} behavior="padding" enabled>
                    <ScrollView
                        contentContainerStyle = {{flexGrow : 1}}>
                        <TouchableWithoutFeedback style = {{flex : 1}}
                                                  onPress={Keyboard.dismiss} accessible={false}>
                            <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                            start={[0, 1]} style={styles.linearGradient}>
                                {this.props.children}
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }
}

export const styles = StyleSheet.create({
    linearGradient :{
        flex : 1,
        flexDirection: 'column',
        marginTop : -200,
        marginBottom : -200,
        alignItems : 'center',
    },
});

