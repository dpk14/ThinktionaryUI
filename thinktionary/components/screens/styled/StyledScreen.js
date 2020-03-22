import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {ABSTRACT_CLASS, HP_SIMPLIFIED_BOLD} from "../../../configStrings";

import { LinearGradient } from 'expo-linear-gradient';
import {ABSTRACT_METHOD} from "../../utils/abstraction";

export default class StyledScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../../../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../../../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    renderScreen(){
        return ABSTRACT_METHOD("renderScreen")
    }

    render() {
            const Screen = this.renderScreen()
            return (
                <KeyboardAvoidingView
                    style={{flex : 1}} behavior="padding" enabled>
                    <ScrollView
                        contentContainerStyle = {{flexGrow : 1}}>
                        <TouchableWithoutFeedback style = {{flex : 1}}
                                                  onPress={Keyboard.dismiss} accessible={false}>
                            <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                            start={[0, 1]} style={styles.linearGradient}>
                                {Screen}
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

