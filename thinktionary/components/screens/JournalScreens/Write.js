import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {ABSTRACT_CLASS, ABSTRACT_METHOD, HP_SIMPLIFIED_BOLD} from "../../../configStrings";
import {Journal} from "../../structs/journal";
import EntryBox from "../../EntryBox";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class Write extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            title : 'untitled',
            date : ''
        };
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
        else if(exceptionThrown!=undefined){
            let journal = new Journal(response["myEntries"], response["myEntryMap"], response["myTopics"], response["myUserID"])
        }
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                    start={[0, 1]} style={styles.linearGradient}>
                        <FlexBox style = {styles.frame}>
                            <EntryBox
                                attrName='title'
                                title='Title'
                                value={this.state.title}
                                updateMasterState={this._updateMasterState}
                            />
                            <EntryBox
                                attrName='date'
                                title='Date'
                                value={this.state.date}
                                updateMasterState={this._updateMasterState}
                            />
                        </FlexBox>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            );
        }
    }
}

export const styles = StyleSheet.create({
    frame: {
        flex: 1,
        margin : "15%",
        color : "#FFFFFF",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient :{
        flex : 2,
        height : "100%",
        width : "100%",
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
