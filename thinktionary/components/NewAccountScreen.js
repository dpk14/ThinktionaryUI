import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import EntryBox from "./EntryBox";
import CustomButton from "./CustomButton";
import {login} from "../requestHandler/main"
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";
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
            'hp-simplified-bold': require('../assets/fonts/hp-simplified-bold.ttf'),
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
                            <Text style={styles.title}>Create Account</Text>
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
                            <CustomButton
                                text="Login"
                                onPress={() => {
                                    alert(login(this.state.username, this.state.password))
                                }}
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
        marginTop: 150,
        marginVertical: 30,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },

});
