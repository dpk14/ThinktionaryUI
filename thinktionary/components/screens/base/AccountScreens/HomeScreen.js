import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../../../CustomButton";
import ScreenNames from "../../../../navigation/ScreenNames"
import {styles} from "../Screen";
import Screen from "../Screen"
import StyledBase from "../StyledBase";

export default class HomeScreen extends Screen{

    constructor(props) {
        super(props);
    }

    renderScreen() {
            return (
                <StyledBase>
                    <View style = {[styles.container]}>
                        <Text style={styles.title}>Thinktionary</Text>
                        <View style = {newStyles.buttonOuterLayout}
                            >
                            <CustomButton
                                text="Create Account"
                                onPress={() => this.props.navigation.navigate(ScreenNames.NEW_ACCT_SCREEN)}
                                width = {220}
                            />
                            <CustomButton
                                text="Login"
                                onPress={() => this.props.navigation.navigate(ScreenNames.LOGIN_SCREEN)}
                                width = {120}
                            />
                        </View>
                    </View>
                </StyledBase>
            );
        }
}

const newStyles = StyleSheet.create({
    buttonOuterLayout: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});
