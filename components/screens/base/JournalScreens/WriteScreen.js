
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import  {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import Screen, {baseStyles, styles} from "../Screen";
import React from "react";
import CustomButton from "../../../CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {TOPIC_HEIGHT} from "../../../strings";
import {TopicCreatorBox} from "../../../EntryBox/TopicBox/TopicCreatorBox";
import StyledBase from "../StyledBase";
import BuildEntry from "../../../../requestHandler/Requests/JournalCommands/BuildEntry";
import ModifyEntry from "../../../../requestHandler/Requests/JournalCommands/ModifyEntry";
import {_onCreate, _onLogin, _onSubmit, parseOrAlert} from "../functions/callBacks";
import ScreenNames from "../../../../navigation/ScreenNames";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";

export default class WriteScreen extends Screen {

    constructor(props) {
        super(props);
        this.state.entryID = props.route.params.entry == undefined ? undefined : props.route.params.entry.entryID
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
        this.state.currTopic = ''
        this.state.topics = new Set()
        this.state.topicBank = this.props.route.params.journal.topics
    }

    createOrSave = () => {
        const {title, text, date, topics} = this.state
        this.state.entryID == undefined ?
            new BuildEntry(this.props.route.params.journal.userID, title, text, topics, undefined).
            fetchAndExecute(_onCreate(this.setEntryID)) :
            this.save()
    }

    setEntryID = (entryID) =>{
        this.setState({entryID : entryID})
    }

    save = () => {
        const {title, text, date, topics} = this.state
        new ModifyEntry(this.props.route.params.journal.userID, this.state.entryID, title, text, topics).
        fetchAndExecute()
    }

    submit = () => {
        let {username, password} = this.props.route.params.journal
        new Login(username, password).fetchAndExecute(_onSubmit(this.props.navigation))
    }

    renderScreen() {
        return (
            <StyledBase>
                <View style = {newStyles.outerFrame}>
                    <View style = {newStyles.topFrame}>
                        <StyledInputBox
                            attrName='title'
                            title='Title'
                            value={this.state.title}
                            updateMasterState={this._updateMasterState}
                            scale = {0.75}
                            width = '100%'
                            //width= '48.5%'
                            />
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
                            attrName='currTopic'
                            setName='topics'
                            title='Topics'
                            value={this.state.currTopic}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            height= {1.5*TOPIC_HEIGHT}
                            width='100%'
                            topics={this.state.topics}
                        />
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title='Topic Bank'
                            active = {this.state.topicBank.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            topics = { this.state.topicBank}
                            width= '100%'
                            height={1.5*TOPIC_HEIGHT}
                        />
                    </View>
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
            </StyledBase>
            );
        }
}

export const newStyles = StyleSheet.create({
    /*
    topFrame: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative'
    },
    */
    bottomFrame: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative'
    },
    topFrame:{
        flex: 1,
        position: 'relative',
    },
    outerFrame:{
        marginTop : 60,
        flex : 1,
        marginHorizontal : 15
    }

});
