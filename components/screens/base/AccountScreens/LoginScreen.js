
import { Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {StyleSheet, View} from 'react-native';
import StyledInput, {StyledInputBox} from "../../../StyledInput";
import CustomButton from "../../../CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import {styles} from "../Screen";
import React from "react";
import StyledBase from "../StyledBase";
import Screen from "../Screen"
import {_onLogin} from "./utils/callBacks";
export default class LoginScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            username : '',
            password : ''
        }
    }

    renderScreen() {
        return (
            <StyledBase>
                <View style = {[styles.container]}>
                    <Text style={[styles.title]}>Thinktionary</Text>
                    <StyledInputBox
                        attrName='username'
                        title='Username'
                        value={this.state.username}
                        updateMasterState={this._updateMasterState}
                        marginVertical={12}
                    />
                    <StyledInputBox
                        attrName='password'
                        title='Password'
                        value={this.state.password}
                        updateMasterState={this._updateMasterState}
                        marginVertical={12}
                    />
                    <CustomButton
                        text="Login"
                        width={150}
                        onPress={() => {
                            new Login(this.state.username, this.state.password).fetchAndExecute(_onLogin(this.props.navigation));
                        }}
                    />
            </View>
                </StyledBase>)

    }
}

