import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {ABSTRACT_CLASS, ABSTRACT_METHOD} from "../../utils/abstraction";
import LoadingScreen from "../LoadingScreen";

export default class Screen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            fontLoading: true,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({fontLoading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    render() {
            if(this.state.fontLoading){
                return <LoadingScreen/>
            }
            return this.renderScreen()
        }

    renderScreen() {
        return ABSTRACT_METHOD()
    }
}

export const baseStyles = StyleSheet.create({
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

