import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from "../../CustomButton";
import ScreenNames from "../../../navigation/ScreenNames"
import {styles} from "../Screen";
import AccountScreen from "./AccountScreen";

export default class HomeScreen extends AccountScreen{

    constructor(props) {
        super(props);
    }

    fillBody() {
            return (
                <View style = {styles.container}>
                    <Text style={styles.title}>Thinktionary</Text>
                    <View style = {newStyles.buttonOuterLayout}
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
                </View>
            );
        }
}


const newStyles = StyleSheet.create({
    buttonOuterLayout: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});