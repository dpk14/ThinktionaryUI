
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import  {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import Screen, {baseStyles} from "../Screen";
import React from "react";
import CustomButton from "../../../Buttons/CustomButton";
import Login from "../../../../requestHandler/Requests/AccountRequests/Login";
import {TOPIC_HEIGHT} from "../../../strings";
import {TopicCreatorBox} from "../../../EntryBox/TopicBox/TopicCreatorBox";
import StyledBase from "../StyledBase";
import BuildEntry from "../../../../requestHandler/Requests/JournalCommands/BuildEntry";
import ModifyEntry from "../../../../requestHandler/Requests/JournalCommands/ModifyEntry";
import {
    _onCreate,
    _onLogin,
    _onSubmit, createOrSave,
    loginAndInitialize,
    parseOrAlert,
    reloadJournalAndInitialize
} from "../functions/callBacks";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../utils/scaling";
import AppLoading from "expo/build/launch/AppLoading";
import {BUTTON_HEIGHT, ENTRY_BOX_HEIGHT, ENTRY_BOX_VERT_MARGIN} from "../../../utils/baseStyles";

const MARGIN_HORIZONTAL = 15
const TOPIC_BOX_HEIGHT = 1.5 * TOPIC_HEIGHT
const ENTRY_BOX_SCALE = .75
const BUTTON_SCALE = .8
const BOTTOM_FRAME_TOP_MARGIN = 7.5

export default class WriteScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
        ...this.state, ...{journalLoading : true}}

    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }


    initialize(journal){
        let entry = this.props.route.params == undefined ? undefined : this.props.route.params.entry
        return {
            journal : journal,
            entry : entry == undefined ? undefined : entry,
            entryID : entry == undefined ? undefined : entry.entryID,
            title : entry == undefined ? '' : entry.title,
            text : entry == undefined ? '' : entry.text,
            date : entry == undefined ? '' : entry.date,
            currTopic : '',
            topics : entry == undefined || entry.topics == null? new Set() : entry.topics,
            topicBank : journal.topics,
            activeTopics : new Set(),
            journalLoading : false,
            loading : false,
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
            topicBank : this.state.journal.topics,
            activeTopics: new Set()
        }
    }

    async componentDidMount() {
        this._blurUnsubscribe = this.props.navigation.addListener('blur', () => {
            this.setState(this.clear())
        });
        await loginAndInitialize((journal) => this.setState(this.initialize(journal)))
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=>loginAndInitialize((journal) => this.setState(this.initialize(journal))))
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

    _onTopicCreatorPress = (topic) => {
        return () => {
        let {activeTopics, topics} = this.state
        activeTopics.delete(topic)
        topics.delete(topic)
        this.setState({topics: topics, activeTopics: activeTopics})
    }
    }

    submit = () => {
        let {username, password} = this.state.journal
        new Login(username, password).fetchAndExecute(_onSubmit(this.props.navigation))
    }

    _onTopicActivityChange = (topic, isActive) => {
        let {topics} = this.state
        let newTopics = new Set(topics)
        isActive ? newTopics.add(topic) : newTopics.delete(topic)
        this.setState({topics : newTopics})
    }

    setEntryID = (entryID) =>{
        this.setState({entryID : entryID})
    }

    getWriteBoxHeight() {
        let ERROR_MARGIN = 7.5
        return (1 / ENTRY_BOX_SCALE) * (getScreenHeight()
            -(HEADER_HEIGHT)
            -(ENTRY_BOX_HEIGHT*ENTRY_BOX_SCALE)
            -(TOPIC_BOX_HEIGHT*2*ENTRY_BOX_SCALE)
            -(BUTTON_SCALE*BUTTON_HEIGHT)
            -(8*ENTRY_BOX_VERT_MARGIN)
            -(BOTTOM_FRAME_TOP_MARGIN)
            -ERROR_MARGIN
        )
    }

    render() {
        if (this.state.fontLoading || this.state.journalLoading) return <AppLoading/>
        return (
                <StyledBase>
                    <View style = {newStyles.outerFrame}>
                        <View style = {newStyles.topFrame}>
                            <StyledInputBox
                                attrName='title'
                                title="Title your thoughts!"
                                value={this.state.title}
                                updateMasterState={this._updateMasterState}
                                scale = {ENTRY_BOX_SCALE}
                                width = '100%'
                                />
                            <StyledInputBox
                                attrName='text'
                                title='What are you thinking about?'
                                value={this.state.text}
                                updateMasterState={this._updateMasterState}
                                scale = {ENTRY_BOX_SCALE}
                                width='100%'
                                height = {this.getWriteBoxHeight()}
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
                                scale = {ENTRY_BOX_SCALE}
                                topicScale = {.62}
                                height = {TOPIC_BOX_HEIGHT}
                                width = '100%'
                                topics = {this.state.topics}
                                onTopicDelete = {this._onTopicDelete}
                                onTopicPress = {this._onTopicCreatorPress}
                                blurOnSubmit = {false}
                            />
                            <TopicBank
                                attrName='topicBank'
                                setName='topicBankCurr'
                                title="Select from tags you've used before:"
                                active = {this.state.topicBank.size > 0}
                                updateMasterState={this._updateMasterState}
                                scale = {ENTRY_BOX_SCALE}
                                topicScale = {.62}
                                topics = {this.state.topicBank}
                                width= '100%'
                                height={TOPIC_BOX_HEIGHT}
                                onTopicActivityChange={this._onTopicActivityChange}
                                activeTopicsName ={'activeTopics'}
                                activeTopics = {this.state.activeTopics}
                            />
                        </View>
                        <View style = {newStyles.bottomFrame}>
                            <CustomButton
                                text="Save"
                                scale = {BUTTON_SCALE}
                                marginTop={0}
                                style = {{width : 187.5}}
                                onPress={() => createOrSave(this.state, this.setEntryID)}
                            />
                            <CustomButton
                                text="Submit"
                                scale = {BUTTON_SCALE}
                                disabled={this.state.loading}
                                marginTop={0}
                                style = {{width : 187.5}}
                                onPress={() => {
                                    this.setState({loading : true})
                                    createOrSave(this.state, this.setEntryID, this.submit);
                                }}
                            />
                        </View>
                    </View>
                </StyledBase>
            );
        }
}

export const newStyles = StyleSheet.create({
    bottomFrame: {
        marginTop : BOTTOM_FRAME_TOP_MARGIN,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width : '100%',
    },
    topFrame:{
        width : '100%',
  },
    outerFrame:{
        flex : 1,
        marginTop : HEADER_HEIGHT,
        width : getScreenWidth() - 2*MARGIN_HORIZONTAL,
        marginHorizontal : MARGIN_HORIZONTAL
    }

});
