
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StyledInput, {StyledInputBox} from "../../../EntryBox/StyledInput";
import Screen, {styles} from "../Screen";
import React from "react";
import CustomButton from "../../../CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {TOPIC_HEIGHT} from "../../../strings";
import TopicCreator from "../../../TopicCreator";
import StyledBase from "../StyledBase";

export default class WriteScreen extends Screen {

    constructor(props) {
        super(props);
        this.state.title = ''
        this.state.date = ''
        this.state.topics = ''
        this.state.topicBank = ''
    }

    renderScreen() {
        return (
            <StyledBase>
            <View style = {styles.container}>
                        <View style = {newStyles.outerFrame}>
                            <View style = {newStyles.topFrame}>
                                <StyledInputBox
                                    attrName='title'
                                    title='Title'
                                    value={this.state.title}
                                    updateMasterState={this._updateMasterState}
                                    scale = {0.8}
                                    width={218}
                                />
                                <StyledInputBox
                                    attrName='date'
                                    title='Date'
                                    value={this.state.date}
                                    updateMasterState={this._updateMasterState}
                                    scale = {0.8}
                                    width={218}
                                />
                            </View>
                            <View style = {newStyles.bottomFrame}>
                                <StyledInputBox
                                    attrName='text'
                                    title='Text'
                                    value={this.state.text}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    width={450}
                                    height = {400}
                                    multiline = {true}
                                    blurOnSubmit={false}
                                />
                                <StyledInputBox
                                    attrName='topics'
                                    title='Topics'
                                    value={this.state.topics}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    topicScale = {.7}
                                    height= {TOPIC_HEIGHT}
                                    width={450}
                                />
                                <StyledInputBox
                                    attrName='topicBank'
                                    title='Topic Bank'
                                    value={this.state.topicBank}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    width={450}
                                    height={1.5*TOPIC_HEIGHT}
                                />
                                <CustomButton
                                    text="Save"
                                    width = "100%"
                                    scale = {.8}
                                    onPress={() => {}}
                                />
                            </View>
                        </View>
                </View>
            </StyledBase>
            );
        }
}

export const newStyles = StyleSheet.create({
    topFrame: {
        marginTop : 60,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative'
    },
    bottomFrame:{
        flex: 1,
        position: 'relative',
    },
    outerFrame:{
        flex: 1,
        marginHorizontal : 15
    }

});
