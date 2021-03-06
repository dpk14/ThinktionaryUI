import {StyleSheet, View, Keyboard} from 'react-native';

import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledTextInput/StyledInputBox";
import Screen from "../Screen";
import React from "react";
import {TOPIC_HEIGHT} from "../../../strings";
import {TopicCreatorBox} from "../../../EntryBox/TopicBox/TopicCreatorBox";
import BuildEntry from "../../../../requestHandler/Requests/JournalCommands/BuildEntry";
import {_onCreate, declareSaving, loginAndInitialize, save, saving} from "../functions/callBacks";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../utils/scaling";
import {ENTRY_BOX_HEIGHT, ENTRY_BOX_VERT_MARGIN} from "../../../utils/baseStyles";
import LoadingScreen from "../../LoadingScreen";
import {RichEditorBox} from "../../../EntryBox/TextInputBox/RichTextInput/RichEditorBox";
import StyledBaseRichText from "../StyledBaseRichText";

const MARGIN_HORIZONTAL = 15
export const TOPIC_BOX_HEIGHT = 1.5 * TOPIC_HEIGHT
const ENTRY_BOX_SCALE = .75
const BUTTON_SCALE = .8
const BOTTOM_FRAME_TOP_MARGIN = 7.5

export default class WriteScreen extends Screen {

    constructor(props) {
        super(props);
        this.state = {
        ...this.state, ...{journalLoading : true, saving : false, initializing : false}}
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    initialize(journal, entry = this.state.entry) {
        let entryID = entry == undefined ? undefined : entry.entryID
        return {
            journal : journal,
            entry : entry,
            entryID : entryID,
            title : entry == undefined ? '' : entry.title,
            text : entry == undefined ? '' : entry.text,
            date : entry == undefined ? '' : entry.date,
            currTopic : '',
            topics : entry == undefined || entry.topics == null? new Set() : entry.topics,
            topicBank : journal.topics,
            activeTopics : new Set(),
            journalLoading : false,
            loading : false,
            entryMade : entryID != undefined,
            initializing : true,
            clearRichText : false,
            richTextEditor : undefined
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
            topicBank: this.state.journal.topics,
            activeTopics: new Set(),
            saving : false,
            clearRichText : true,
            richTextEditor : undefined
        }
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.autoSave(nextState)
        return true
    }

    async componentDidMount() {
        this._blurUnsubscribe = this.props.navigation.addListener('blur', async () => {
            if (this.state.text != '' || this.state.title != '' || this.state.topics.size > 0) {
                this.props.navigation.setParams({saving : false})
                save(this.state,
                    () => {declareSaving(false).then(() => this.setState(this.clear()))})
            } else {
                this.setState(this.clear());
            }
        })
        this._focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            Keyboard.dismiss()
            if (this.props.route.params && this.props.route.params.journal) {
                this.setState(this.initialize(this.props.route.params.journal, this.props.route.params.entry));
                this.props.navigation.setParams({journal : undefined, entry : undefined})
            } else {
                loginAndInitialize((journal) => {
                    this.setState(this.initialize(journal))
                })
            }
        })
    }

    componentWillUnmount() {
        this._blurUnsubscribe()
        this._focusUnsubscribe()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.initializing) {
            this.setState({initializing : false})
        }
    }

    _onTopicDelete = (topic) => {
        let {activeTopics} = this.state
        let newActiveTopics = new Set(activeTopics)
        newActiveTopics.delete(topic)
        if (newActiveTopics.size != activeTopics.size) this.setState({activeTopics: newActiveTopics})
    }

    _onTopicCreatorPress = (topic) => {
        return () => {
            let {activeTopics, topics} = this.state
            activeTopics.delete(topic)
            topics.delete(topic)
            this.setState({topics: topics, activeTopics: activeTopics})
        }
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

    updateRichTextEditor = (richTextEditor) => {
            this.setState({richTextEditor: richTextEditor})
    }

    getWriteBoxHeight() {
        let ERROR_MARGIN = 20
        return (1 / ENTRY_BOX_SCALE) * (getScreenHeight()
            -(HEADER_HEIGHT)
            -(ENTRY_BOX_HEIGHT*ENTRY_BOX_SCALE)
            -(TOPIC_BOX_HEIGHT*2.5*ENTRY_BOX_SCALE)
            //-(BUTTON_SCALE*BUTTON_HEIGHT)
            -(8*ENTRY_BOX_VERT_MARGIN)
            -(BOTTOM_FRAME_TOP_MARGIN)
            -ERROR_MARGIN
        )
    }

    async autoSave(nextState) {
        let {journal, text, title, topics, entryID, entryMade} = this.state
        if (journal != undefined && (title != nextState.title || text != nextState.text || topics.size != nextState.topics.size) && !nextState.initializing) {
            if (!entryMade) {
                nextState.entryMade = true
                new BuildEntry(this.state.journal.userID, title == '' ? "Untitled" : title, text, topics, undefined).fetchAndExecute(_onCreate(this.setEntryID))
            } else if (entryID != undefined && !this.state.saving) {
                nextState.saving = true
                this.props.navigation.setParams({saving : true})
                save(this.state, () =>
                    setTimeout(() => {
                        this.props.navigation.setParams({saving : false})
                        this.setState({saving : false})
                        declareSaving(false);
                    }, 3000))
            }
        }
    }

    render() {
        let {initializing} = this.state
        if (this.state.fontLoading || this.state.journalLoading) return <LoadingScreen/>
        let RichText = this.state.clearRichText ?
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
                reset = {initializing}
                autoCorrect={true}
                editable={false}
            />
            : (
            <RichEditorBox
                attrName='text'
                title='What are you thinking about?'
                value={this.state.text}
                updateMasterState={this._updateMasterState}
                scale = {ENTRY_BOX_SCALE}
                width='100%'
                height = {this.getWriteBoxHeight()}
                multiline = {true}
                blurOnSubmit={false}
                reset = {initializing}
                autoCorrect={true}
                updateRichTextEditor={this.updateRichTextEditor}
            />)
        return (
            <StyledBaseRichText
                richTextEditor = {this.state.richTextEditor}
            >
                    <View style = {newStyles.outerFrame}>
                        <View style = {newStyles.topFrame}>
                            <StyledInputBox
                                attrName='title'
                                title="Title your thoughts!"
                                value={this.state.title}
                                updateMasterState={this._updateMasterState}
                                scale = {ENTRY_BOX_SCALE}
                                width = '100%'
                                reset = {initializing}
                                />
                            {RichText}
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
                                reset = {initializing}
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
                                height={TOPIC_BOX_HEIGHT*1.5}
                                onTopicActivityChange={this._onTopicActivityChange}
                                activeTopicsName ={'activeTopics'}
                                activeTopics = {this.state.activeTopics}
                                value = {''}
                                reset = {initializing}
                            />
                        </View>
                    </View>
            </StyledBaseRichText>
            );
        }
}

export const newStyles = StyleSheet.create({
    bottomFrame: {
        justifyContent: 'center',
        flexDirection: 'row',
        width : '100%',
        marginTop : BOTTOM_FRAME_TOP_MARGIN
    },
    topFrame:{
        width : '100%',
  },
    outerFrame:{
        marginTop: HEADER_HEIGHT,
        flex : 1,
        width : getScreenWidth() - 2*MARGIN_HORIZONTAL,
        marginHorizontal : MARGIN_HORIZONTAL
    }

});
