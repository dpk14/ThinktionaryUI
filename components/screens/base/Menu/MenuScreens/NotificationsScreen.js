
import React, {Component} from "react";
import AppLoading from "expo/build/launch/AppLoadingNativeWrapper";
import {ENTRY_BOX_VERT_MARGIN, HEADER_STYLES} from "../../../../utils/baseStyles";
import StyledBase from "../../StyledBase";
import {StyledInputBox} from "../../../../EntryBox/TextInputBox/StyledInputBox";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../../utils/scaling";
import {createStackNavigator} from "@react-navigation/stack";
import {WriteBackButton} from "../../../../Buttons/HeaderButtons/Buttons/WriteBackButton";
import OptionButton from "../../../../Buttons/HeaderButtons/Buttons/OptionButton";
import ScreenNames from "../../../../../navigation/ScreenNames";
import ReadScreen from "../../JournalScreens/ReadScreen";

export default class NotificationsScreen extends Component {

       constructor(props) {
        super(props);
        this.state = {active : false, loading : false}
    }

    render() {
        if (this.state.fontLoading) return <AppLoading/>
        let {active} = this.state
        return(
            <StyledBase>
                <StyledInputBox
                    attrName=''
                    title= {active ? 'Check out your feed: ' : 'You have no notifications'}
                    value={''}
                    updateMasterState={this._updateMasterState}
                    scale = {.8}
                    style={{width : getScreenWidth()-30, height : getScreenHeight()-(ENTRY_BOX_VERT_MARGIN*2)-HEADER_HEIGHT, marginTop : HEADER_HEIGHT}}
                    active={active}
                    editable={false}
                />
            </StyledBase>
        )
    }
}
