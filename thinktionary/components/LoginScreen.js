import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "./EntryBox";
const HP_SIMPLIFIED = "hp-simplified";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            username: ''
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified': require('../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                <View style={styles.container}>
                    <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                    start={[0, 1]} style={styles.linearGradient}>
                        <Text style={styles.welcome}>Welcome to React Native!</Text>
                        <Text style={styles.instructions}>To get started, edit App.js</Text>
                        <Text style={styles.instructions}>{instructions}</Text>
                        <EntryBox
                            attrName = 'username'
                            title = 'Username'
                            value = {this.state.username}
                            updateMasterState = {this._updateMasterState}
                            textInputStyles = {{ // here you can add additional TextInput styles
                            color: 'green',
                            fontSize: 15,
                        }}
                            otherTextInputProps = {{   // here you can add other TextInput props of your choice
                            maxLength: 12,
                        }}
                            />
                    </LinearGradient>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    linearGradient :{
        flex : 2,
        height : "100%",
        width : "100%"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED,
    },
    instructions: {
        textAlign: 'center',
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED,
        marginBottom: 5,
    },
});
