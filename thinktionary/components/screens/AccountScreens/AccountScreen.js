import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {ABSTRACT_CLASS, ABSTRACT_METHOD, HP_SIMPLIFIED_BOLD} from "../../../configStrings";
import {Journal} from "../../structs/journal";
import ScreenNames from "../../../navigation/ScreenNames";

export default class AccountScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            username: '',
            password: '',
        };
        if(this.constructor === AccountScreen) {
            throw new Error(ABSTRACT_CLASS)
        }
    }

    fillBody(){
        throw Error(ABSTRACT_METHOD);
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../../../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../../../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    _onLogin = (response, exceptionThrown) =>{
        if(exceptionThrown) {
            alert(response);
        }
        else{
            let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
            console.log(journal.userID)
            this.props.navigation.navigate(ScreenNames.WRITE_SCREEN)
        }
    }

    render() {
        const Body = this.fillBody()
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                    <ScrollView contentContainerStylei = {{flexGrow : 1}}>
                        <TouchableWithoutFeedback style = {{flex : 1}}
                                          onPress={Keyboard.dismiss} accessible={false}>
                            {Body}
                        </TouchableWithoutFeedback>
                    </ScrollView>
            );
        }
    }
}

export const styles = StyleSheet.create({
    scrollView : {
        opacity : 1,
        flex : 0,
        height : "100%",
        color : "#AAAAAA"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient :{
        flex : 1,
        alignItems : 'center'
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
