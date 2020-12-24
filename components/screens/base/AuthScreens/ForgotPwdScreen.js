import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledTextInput/StyledInputBox";
import CustomButton from "../../../Buttons/CustomButton";
import Screen from "../Screen";
import StyledBase from "../StyledBase";
import {HP_SIMPLIFIED_BOLD} from "../../../utils/FontUtils";
import SendConfKey from "../../../../requestHandler/Requests/AccountRequests/SendConfKey";
import ScreenNames from "../../../../navigation/ScreenNames";
import {getScreenWidth} from "../../../utils/scaling";

export default class ForgotPwdScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            email : '',
            loading : false,
        }
    }

    async componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=> this.setState({loading : false}))
    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    render() {
        let {username, email} = this.state
        return (
            <StyledBase>
                <Image
                    style ={{
                        aspectRatio : 1928/578,
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
                    marginVertical={30}
                />
                <StyledInputBox
                    attrName='email'
                    title='Email'
                    value={email}
                    updateMasterState={this._updateMasterState}
                    marginVertical={30}
                />
                <CustomButton
                    text="Send Confirmation"
                    disabled={this.state.loading}
                    style={{
                        marginTop : 10,
                    }}
                    onPress={() => {
                        this.setState({loading: true})
                        new SendConfKey(username, email, true).fetchAndExecute(
                            () => {this.props.navigation.navigate(ScreenNames.RESET_PWD_SCREEN,
                                {username : username, email : email})},
                            () => this.setState({loading: false}));
                    }}
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

export const verifyEmailStyles = StyleSheet.create({
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: "60%",
        marginBottom: 30,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    }
});
