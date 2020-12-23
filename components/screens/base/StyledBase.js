import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {ORANGE, PURPLE} from "../../utils/baseStyles";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import VerifyAccountInfo from "../../../requestHandler/Requests/AccountRequests/VerifyAccountInfo";
import RichToolbar from "react-native-pell-rich-editor/src/RichToolbar";

export default class StyledBase extends Component{

    constructor(props) {
        super(props);
    }

    render() {
            return (
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                 contentContainerStyle = {{flexGrow : 1}}
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
                </KeyboardAwareScrollView>
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
        justifyContent : 'center'
    },
});

