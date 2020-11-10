import React, { Component } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../../../Buttons/CustomButton";
import screenNames from "../../../../navigation/ScreenNames"
import {baseStyles} from "../Screen";
import Screen from "../Screen"
import StyledBase from "../StyledBase";
import {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";
import {getScreenWidth} from "../../../utils/scaling";

export default class HomeScreen extends Screen {

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
//<Text style={homeStyles.title}>Thinktionary</Text>
    renderScreen() {
            return (
                <StyledBase>
                    <Image
                        style ={{aspectRatio : 1928/578, marginTop : -(getScreenWidth()*.2), width : getScreenWidth()*.8, height : undefined}}
                        resizeMode={'contain'}
                        source={require("../../../../assets/images/thinktionary.png")}
                    />
                <CustomButton
                        text="Login"
                        disabled = {this.state.loading}
                        onPress={() => this.navigateAndDisable(screenNames.LOGIN_SCREEN)}
                        style= {{width : 320, marginTop : 30}}
                        scale={.85}
                    />
                    <CustomButton
                        text="Create Account"
                        disabled = {this.state.loading}
                        onPress={() => this.navigateAndDisable(screenNames.NEW_ACCT_SCREEN)}
                        style = {{width : 320, marginTop : 30}}
                        scale={.85}
                    />
                    <Image
                        style ={{aspectRatio : 1499/1151, marginTop : 30, width : getScreenWidth()*.4, height : undefined}}
                        resizeMode={'contain'}
                        source={require("../../../../assets/images/thinkart2.png")}
                    />
                </StyledBase>
            );
        }
}

export const homeStyles = StyleSheet.create({
    buttonOuterLayout: {
        alignItems: 'center'
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
