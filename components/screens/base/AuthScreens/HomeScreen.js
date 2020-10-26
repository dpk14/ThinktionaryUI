import React, { Component } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../../../Buttons/CustomButton";
import screenNames from "../../../../navigation/ScreenNames"
import {baseStyles} from "../Screen";
import Screen from "../Screen"
import StyledBase from "../StyledBase";
import {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";

export default class HomeScreen extends Screen{

    constructor(props) {
        super(props);
        this.state = {
            ...this.state, ...{loading : false}
        }
    }

    async componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=> this.setState({loading : false}))
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    async navigateAndDisable(toScreen) {
        this.setState({loading: true})
        this.props.navigation.navigate(toScreen)
    }

    renderScreen() {
            return (
                <StyledBase>
                        <Text style={homeStyles.title}>Thinktionary</Text>
                        <View style = {homeStyles.buttonOuterLayout}
                            >
                            <CustomButton
                                text="Login"
                                disabled = {this.state.loading}
                                onPress={() => this.navigateAndDisable(screenNames.LOGIN_SCREEN)}
                                style= {{width : 320, marginTop : 30}}
                            />
                            <CustomButton
                                text="Create Account"
                                disabled = {this.state.loading}
                                onPress={() => this.navigateAndDisable(screenNames.NEW_ACCT_SCREEN)}
                                style = {{width : 320, marginTop : 30}}
                            />
                        </View>
                </StyledBase>
            );
        }
}

export const homeStyles = StyleSheet.create({
    buttonOuterLayout: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 500
    }, title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: "60%",
        marginBottom: 0,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    }
});
