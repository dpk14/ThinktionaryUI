import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {StyleSheet, View} from 'react-native';
import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import {baseStyles, styles} from "../Screen";
import React from "react";
import StyledBase from "../StyledBase";
import Screen from "../Screen"
import {_onLogin, parseOrAlert} from "../functions/callBacks";
export default class LoginScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state, ...{
                username: '',
                password: '',
                loading: false,
            }
        }
    }

    async componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=> this.setState({loading : false}))
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    renderScreen() {
        return (
            <StyledBase>
                    <Text style={[baseStyles.title]}>Thinktionary</Text>
                    <StyledInputBox
                        attrName='username'
                        title='Username'
                        value={this.state.username}
                        updateMasterState={this._updateMasterState}
                        marginVertical={15}
                    />
                    <StyledInputBox
                        attrName='password'
                        title='Password'
                        value={this.state.password}
                        updateMasterState={this._updateMasterState}
                        marginVertical={15}
                        secureTextEntry={true}
                    />
                    <CustomButton
                        text="Login"
                        style={{width : 150, marginTop : 8}}
                        disabled={this.state.loading}
                        onPress={() => {
                            this.setState({loading : true})
                            new Login(this.state.username, this.state.password).fetchAndExecute(
                                _onLogin(this.props.navigation), ()=>this.setState({loading: false}));
                        }}
                    />
                </StyledBase>)

    }
}
