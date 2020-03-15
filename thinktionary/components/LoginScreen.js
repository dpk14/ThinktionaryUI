import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
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
            username: '',
            password: ''
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                        start={[0, 1]} style={styles.linearGradient}>
                            <Text style={styles.title}>Thinktionary</Text>
                             <EntryBox
                                attrName = 'username'
                                title = 'Username'
                                value = {this.state.username}
                                updateMasterState = {this._updateMasterState}
                            />
                            <EntryBox
                                attrName = 'password'
                                title = 'Password'
                                value = {this.state.password}
                                updateMasterState = {this._updateMasterState}
                            />
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>
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
        width : "100%",
        alignItems : 'center'
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 100,
        marginVertical: 50,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },

});
