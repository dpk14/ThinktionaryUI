import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from "./AccountScreens/LoginScreen";
import Wrapper from "../../utils/Wrapper";
import {baseStyles} from "./Screen";
import {ORANGE, PURPLE} from "../../utils/baseStyles";

export default class StyledBase extends Component{

    constructor(props) {
        super(props);
    }

    render() {
            return (
                <KeyboardAvoidingView
                    style={{flex : 1}} behavior="padding" enabled>
                    <ScrollView contentContainerStyle = {{flexGrow : 1}}
                                keyboardShouldPersistTaps = {'handled'}
                        >
                        <TouchableWithoutFeedback style = {{flex : 1}}
                                                  onPress={Keyboard.dismiss} accessible={false}>
                            <LinearGradient colors={[PURPLE, ORANGE]} end={[1, 0]}
                                            start={[0, 1]} style={styles.linearGradient}>

                                <View style = {styles.container}>
                                {this.props.children}
                                </View>
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
    container: {
        flex: 1,
        marginVertical : 200,
        alignItems : 'center',
    },
});

