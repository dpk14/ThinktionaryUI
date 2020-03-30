
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StyledInput, {StyledInputBox} from "../../../EntryBox/StyledTextInput";
import Screen, {styles} from "../Screen";
import React from "react";
import CustomButton from "../../../CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {TOPIC_HEIGHT} from "../../../strings";
import TopicCreator, {TopicCreatorBox} from "../../../EntryBox/TopicCreator";
import StyledBase from "../StyledBase";
import BuildEntry from "../../../../requestHandler/Requests/JournalCommands/BuildEntry";
import ModifyEntry from "../../../../requestHandler/Requests/JournalCommands/ModifyEntry";

export default class WriteScreen extends Screen {

    constructor(props) {
        super(props);
        this.state.journal = props.route.params.journal
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
        this.state.topics = ''
        this.state.topicBank = ''
    }

    createOrSave = () => {
        const {journal, title, text, date, topics} = this.state
        this.props.route.params.entry == undefined ?
            new BuildEntry(journal.userID, title, text, topics, date == '' ? null : date).fetchAndExecute() :
            ModifyEntry(journal.userID, this.props.route.params.entry.entryID, title, text, topics, date == '' ? null : date)
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
                                    scale = {0.75}
                                    width= '48.5%'
                                />
                                <StyledInputBox
                                    attrName='date'
                                    title='Date'
                                    value={this.state.date}
                                    updateMasterState={this._updateMasterState}
                                    scale = {0.75}
                                    width='48.5%'
                                />
                            </View>
                            <View style = {newStyles.middleFrame}>
                                <StyledInputBox
                                    attrName='text'
                                    title='Text'
                                    value={this.state.text}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.75}
                                    width='100%'
                                    height = {400}
                                    multiline = {true}
                                    blurOnSubmit={false}
                                />
                                <TopicCreatorBox
                                    attrName='topics'
                                    title='Topics'
                                    value={this.state.topics}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.75}
                                    topicScale = {.65}
                                    height= {1.5*TOPIC_HEIGHT}
                                    width='100%'
                                />
                                <TopicCreatorBox
                                    attrName='topicBank'
                                    title='Topic Bank'
                                    alwaysActive = {true}
                                    editable = {false}
                                    value={this.state.topicBank}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.75}
                                    topicScale = {.65}
                                    topics = {this.state.journal.topics}
                                    width= '100%'
                                    height={1.5*TOPIC_HEIGHT}
                                />
                                <View style = {newStyles.bottomFrame}>
                                <CustomButton
                                    text="Save"
                                    scale = {.8}
                                    marginTop={8}
                                    width = {180}
                                    onPress={this.createOrSave()}
                                />
                                    <CustomButton
                                        text="Submit"
                                        scale = {.8}
                                        marginTop={8}
                                        width = {180}
                                        onPress={() => {}}
                                    />
                                </View>
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
    bottomFrame: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative'
    },
    middleFrame:{
        flex: 1,
        position: 'relative',
    },
    outerFrame:{
        flex: 1,
        marginHorizontal : 15
    }

});
