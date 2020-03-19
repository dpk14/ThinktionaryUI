import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import CustomButton from "../../CustomButton";
import ScreenNames from "../../../navigation/ScreenNames"
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";

export default class HomeScreen extends Component {

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

    _Account

    render() {
        if (this.state.loading) return(<AppLoading/>);
        else {
            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                        start={[0, 1]} style={styles.linearGradient}>
                            <Text style={styles.title}>Thinktionary</Text>
                            <View style = {styles.buttonOuterLayout}
                                >
                                <CustomButton
                                    text="Create Account"
                                    onPress={() => this.props.navigation.navigate(ScreenNames.NEW_ACCT_SCREEN)}
                                    width = "55%"
                                />
                                <CustomButton
                                    text="Login"
                                    onPress={() => this.props.navigation.navigate(ScreenNames.LOGIN_SCREEN)}
                                    width = "55%"
                                />
                            </View>
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
        height : "100%",
        width : "100%",
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
    buttonOuterLayout: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});
