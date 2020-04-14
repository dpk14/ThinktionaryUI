
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import  {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import Screen, {baseStyles, styles} from "../Screen";
import React from "react";
import CustomButton from "../../../Buttons/CustomButton";
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
        this.state = {
        ...this.state, ...this.initialize()
        }
    }

    initialize(){
        let {entry, journal} = this.props.route.params
        return {
            entry : entry == undefined ? undefined : entry,
            entryID : entry == undefined ? undefined : entry.entryID,
            title : entry == undefined ? '' : entry.title,
            text : entry == undefined ? '' : entry.text,
            date : entry == undefined ? '' : entry.date,
            currTopic : '',
            topics : entry == undefined || entry.topics == null? new Set() : entry.topics,
            topicBank : journal.topics,
            activeTopics : new Set()
        }
    }

    clear() {
        return {
            entry: undefined,
            entryID: undefined,
            title: '',
            text: '',
            date: '',
            currTopic: '',
            topics: new Set(),
            topicBank: new Set(),
            activeTopics: new Set()
        }
    }

    componentDidMount() {
        this._blurUnsubscribe = this.props.navigation.addListener('blur', () => {
            this.setState(this.clear())
        });
        this._focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState(this.initialize())
        });
    }

    componentWillUnmount() {
        this._blurUnsubscribe()
        this._focusUnsubscribe()
    }


    _onTopicDelete = (topic) => {
        let {activeTopics} = this.state
        let newActiveTopics = new Set(activeTopics)
        newActiveTopics.delete(topic)
        if(newActiveTopics.size != activeTopics.size) this.setState({activeTopics: newActiveTopics})
    }

    createOrSave = () => {
        const {title, text, date, topics} = this.state
        this.state.entryID == undefined ?
            new BuildEntry(this.props.route.params.journal.userID, title=='' ? "Untitled" : title, text, topics, undefined).
            fetchAndExecute(_onCreate(this.setEntryID)) :
            this.save()
    }

    setEntryID = (entryID) =>{
        this.setState({entryID : entryID})
    }

    save = () => {
        const {title, text, date, topics} = this.state
        new ModifyEntry(this.props.route.params.journal.userID, this.state.entryID, title=='' ? "Untitled" : title, text, topics).
        fetchAndExecute()
    }

    submit = () => {
        let {username, password} = this.props.route.params.journal
        new Login(username, password).fetchAndExecute(_onSubmit(this.props.navigation))
    }

    _onTopicActivityChange = (topic, isActive) => {
        let {topics} = this.state
        let newTopics = new Set(topics)
        isActive ? newTopics.add(topic) : newTopics.delete(topic)
        this.setState({topics : newTopics})
    }

    renderScreen() {
        return (
            <StyledBase>
                <View style = {newStyles.outerFrame}>
                    <View style = {newStyles.topFrame}>
                        <StyledInputBox
                            attrName='title'
                            title="Title your thoughts!"
                            value={this.state.title}
                            updateMasterState={this._updateMasterState}
                            scale = {0.75}
                            width = '100%'
                            //width= '48.5%'
                            />
                        <StyledInputBox
                            attrName='text'
                            title='What are you thinking about?'
                            value={this.state.text}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            width='100%'
                            height = {400}
                            multiline = {true}
                            blurOnSubmit={false}
                        />
                        <TopicCreatorBox
                            attrName = 'currTopic'
                            setName = 'topics'
                            title = 'What tags do you want to use?'
                            active = {this.state.topics.size > 0}
                            value = {this.state.currTopic}
                            updateMasterState= {this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            height = {1.5*TOPIC_HEIGHT}
                            width = '100%'
                            topics = {this.state.topics}
                            onTopicDelete = {this._onTopicDelete}
                        />
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title="Select from tags you've used before:"
                            active = {this.state.topicBank.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            topics = {this.state.topicBank}
                            width= '100%'
                            height={1.5*TOPIC_HEIGHT}
                            onTopicActivityChange={this._onTopicActivityChange}
                            activeTopicsName ={'activeTopics'}
                            activeTopics = {this.state.activeTopics}
                        />
                    </View>
                    <View style = {newStyles.bottomFrame}>
                        <CustomButton
                            text="Save"
                            scale = {.8}
                            marginTop={0}
                            width = {165}
                            onPress={() => this.createOrSave()}
                        />
                        <CustomButton
                            text="Submit"
                            scale = {.8}
                            marginTop={0}
                            width = {165}
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
        justifyContent: 'space-evenly',
        //alignItems: 'center',
        flexDirection: 'row',
        width : '100%'
    },
    topFrame:{
        flex: 1,
    },
    outerFrame:{
        marginTop : 60,
        flex : 1,
        marginHorizontal : 15
    }

});
