import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import { LinearGradient } from 'expo-linear-gradient';
import FontUtils from "../../utils/FontUtils";
import {ABSTRACT_CLASS, ABSTRACT_METHOD} from "../../utils/abstraction";

export default class Screen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    render() {
            if(this.state.loading){
                return null
            }
            else return this.renderScreen()
        }

    renderScreen() {
        return ABSTRACT_METHOD()
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop : 200,
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

