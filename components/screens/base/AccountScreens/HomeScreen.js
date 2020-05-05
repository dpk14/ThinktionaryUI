import React, { Component } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../../../Buttons/CustomButton";
import screenNames from "../../../../navigation/ScreenNames"
import {baseStyles} from "../Screen";
import Screen from "../Screen"
import StyledBase from "../StyledBase";
import {CustomButtonImg} from "../../../Buttons/CustomButtonImg";
import {_scale} from "../../../utils/scaling";
import {loginAndInitialize} from "../functions/callBacks";

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
                        <Text style={baseStyles.title}>Thinktionary</Text>
                        <View style = {newStyles.buttonOuterLayout}
                            >
                            <CustomButton
                                text="Create Account"
                                disabled = {this.state.loading}
                                onPress={() => this.navigateAndDisable(screenNames.NEW_ACCT_SCREEN)}
                                style = {{width : 220, marginTop : 20}}
                            />
                            <CustomButton
                                text="Login"
                                disabled = {this.state.loading}
                                onPress={() => this.navigateAndDisable(screenNames.LOGIN_SCREEN)}
                                style= {{width : 150, marginTop : 20}}
                            />
                        </View>
                </StyledBase>
            );
        }
}

const newStyles = StyleSheet.create({
    buttonOuterLayout: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 500
    }

});
