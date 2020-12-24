import {Image, Text} from 'react-native';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledTextInput/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login"
import {baseStyles, styles} from "../Screen";
import React from "react";
import StyledBase from "../StyledBase";
import Screen from "../Screen"
import {_onLogin, parseOrAlert} from "../functions/callBacks";
import SelectableText from "../../../SelectableText/SelectableText";
import ScreenNames from "../../../../navigation/ScreenNames";
import {getScreenWidth} from "../../../utils/scaling";

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
        this._focusUnsubscribe = this.props.navigation.addListener('focus', () => this.setState({loading: false}))
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    renderScreen() {
        let {username, password} = this.state;
        return (
            <StyledBase>
                <Image
                    style ={{
                        aspectRatio : 1928/578,
                        marginTop : -(getScreenWidth()*.2),
                        width : getScreenWidth()*.8,
                        height : undefined,
                        marginBottom : 15
                    }}
                    resizeMode={'contain'}
                    source={require("../../../../assets/images/thinktionary.png")}
                />
                <StyledInputBox
                    attrName='username'
                    title='Username'
                    value={username}
                    updateMasterState={this._updateMasterState}
                    marginVertical={15}
                />
                <StyledInputBox
                    attrName='password'
                    title='Password'
                    value={password}
                    updateMasterState={this._updateMasterState}
                    marginVertical={15}
                    secureTextEntry={true}
                />
                <CustomButton
                    text="Login"
                    style={{width: 150, marginTop: 8}}
                    disabled={this.state.loading}
                    onPress={() => {
                        this.setState({loading: true})
                        new Login(username, password).fetchAndExecute(
                            _onLogin(this.props.navigation, username, password), () => this.setState({loading: false}));
                    }}

                />
                <SelectableText
                    text="Forgot Password?"
                    onPress={() => this.props.navigation.navigate(ScreenNames.FORGOT_PWD_SCREEN)}
                />
                <Image
                    style ={{aspectRatio : 1499/1151, marginTop : 8, width : getScreenWidth()*.4, height : undefined}}
                    resizeMode={'contain'}
                    source={require("../../../../assets/images/thinkart2.png")}
                />
            </StyledBase>)

    }
}
