
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StyledInput, {StyledInputBox} from "../../../EntryBox/StyledTextInput";
import Screen, {baseStyles, styles} from "../Screen";
import React from "react";
import CustomButton from "../../../CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {TOPIC_HEIGHT} from "../../../strings";
import TopicCreator, {TopicCreatorBox} from "../../../EntryBox/TopicCreator";
import StyledBase from "../StyledBase";
import BuildEntry from "../../../../requestHandler/Requests/JournalCommands/BuildEntry";
import ModifyEntry from "../../../../requestHandler/Requests/JournalCommands/ModifyEntry";
import {_onCreate, _onLogin, _onSubmit, parseOrAlert} from "../functions/callBacks";
import ScreenNames from "../../../../navigation/ScreenNames";

export default class WriteScreen extends Screen {

    constructor(props) {
        super(props);
        this.state.entryID = props.route.params.entry == undefined ? undefined : props.route.params.entry.entryID
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
        this.state.topics = {
            value : '',
            set : new Set()
        }
        this.state.topicBank = ''
    }

    createOrSave = () => {
        const {title, text, date, topics} = this.state
        this.state.entryID == undefined ?
            new BuildEntry(this.props.route.params.journal.userID, title, text, topics.set, date == '' ? undefined : date).
            fetchAndExecute(parseOrAlert(_onCreate, {callBack : this.setEntryID})) :
            this.save()
    }

    setEntryID = (entryID) =>{
        this.setState({entryID : entryID})
    }

    save = () => {
        const {title, text, date, topics} = this.state
        new ModifyEntry(this.props.route.params.journal.userID, this.state.entryID, title, text, topics.set, date == '' ? undefined : date).
        fetchAndExecute(parseOrAlert())
    }

    submit = () => {
        this.props.navigation.navigate(ScreenNames.READ_SCREEN, {journal : this.props.route.params.journal})
    }

    renderScreen() {
        return (
            <StyledBase>
            <View style = {baseStyles.container}>
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
                                    topics = { this.props.route.params.journal.topics}
                                    width= '100%'
                                    height={1.5*TOPIC_HEIGHT}
                                />
                                <View style = {newStyles.bottomFrame}>
                                <CustomButton
                                    text="Save"
                                    scale = {.8}
                                    marginTop={8}
                                    width = {180}
                                    onPress={() => this.createOrSave()}
                                />
                                    <CustomButton
                                        text="Submit"
                                        scale = {.8}
                                        marginTop={8}
                                        width = {180}
                                        onPress={() => {this.createOrSave();
                                                        this.submit();
                                        }}
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
        marginTop : 60,
        flex: 1,
        marginHorizontal : 15
    }

});
