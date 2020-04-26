import React, { Component } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../../../Buttons/CustomButton";
import ScreenNames from "../../../../navigation/ScreenNames"
import {baseStyles} from "../Screen";
import Screen from "../Screen"
import StyledBase from "../StyledBase";
import {CustomButtonImg} from "../../../Buttons/CustomButtonImg";
import {_scale} from "../../../utils/scaling";

export default class HomeScreen extends Screen{

    constructor(props) {
        super(props);
    }

    renderScreen() {
            return (
                <StyledBase>
                        <Text style={baseStyles.title}>Thinktionary</Text>
                        <View style = {newStyles.buttonOuterLayout}
                            >
                            <CustomButton
                                text="Create Account"
                                onPress={() => this.props.navigation.navigate(ScreenNames.NEW_ACCT_SCREEN)}
                                style = {{width : 220, marginTop : 20}}
                            />
                            <CustomButton
                                text="Login"
                                onPress={() => this.props.navigation.navigate(ScreenNames.LOGIN_SCREEN)}
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
