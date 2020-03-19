import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {ABSTRACT_CLASS, ABSTRACT_METHOD, HP_SIMPLIFIED_BOLD} from "../../configStrings";
import { LinearGradient } from 'expo-linear-gradient';

export default class Screen extends Component{

        constructor(props) {
            super(props);

        this.state = {
            loading : true,
        };
        if(this.constructor === Screen) {
            throw new Error(ABSTRACT_CLASS)
        }
    }

    fillBody(){
        throw Error(ABSTRACT_METHOD);
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            const Body = this.fillBody()
            return (
                <KeyboardAvoidingView style={{flex : 1}} behavior="padding" enabled>
                <ScrollView
                    contentContainerStyle = {{flexGrow : 1}}>
                    <TouchableWithoutFeedback style = {{flex : 1}}
                                              onPress={Keyboard.dismiss} accessible={false}>
                        <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                        start={[0, 1]} style={styles.linearGradient}>
                        {Body}
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </ScrollView>
                </KeyboardAvoidingView>
            );
        }
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical : 200,
        alignItems : 'center',
    },
    linearGradient :{
        flex : 1,
        flexDirection: 'column',
        marginTop : -200,
        marginBottom : -200,
        alignItems : 'center',
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 150,
        marginVertical: 30,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },

});

