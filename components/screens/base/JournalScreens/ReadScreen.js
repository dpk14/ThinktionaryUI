import Screen, {baseStyles} from "../Screen";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import StyledBase from "../StyledBase";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {JournalContainerBox} from "../../../EntryBox/JournalBox/JournalContainerBox";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../utils/scaling";
import {SearchBar} from "../../../EntryBox/TextInputBox/SearchBar";
import AppLoading from "expo/build/launch/AppLoadingNativeWrapper";
import {loginAndInitialize} from "../functions/callBacks";
import {Header} from "../../../Headers/Header";
import {TOPIC_BOX_HEIGHT} from "./WriteScreen";
import {ENTRY_BOX_HEIGHT} from "../../../utils/baseStyles";

let MARGIN_HORIZONTAL = 15
let MARGIN_BOTTOM = 30
let BAR_SCALE = .6
let TOPIC_BANK_SCALE = .75
let BAR_HEIGHT = getScreenHeight()*.055
let JOURNAL_CONTAINER_SCALE = .85

export default class ReadScreen extends Screen {

    static DEFAULT_JOURNAL_TITLE = 'All entries:'
    static BASE_JOURNAL_TITLE = 'All entries about '

    constructor(props) {
        super(props);
        this.state = {
            ...this.state, ...{journalLoading : true, loading : false}
        }
    }

    initialize(journal){
        return {
            activeTopics : new Set(),
            journal : journal,
            entries : journal.entries,
            activeEntries : journal.entries,
            topics : journal.topics,
            searched : '',
            journalLoading : false,
        }
    }

    async componentDidMount() {
        await loginAndInitialize((journal) => this.setState(this.initialize(journal)))
        this._focusUnsubscribe = this.props.navigation.addListener('focus', ()=>loginAndInitialize((journal) => this.setState(this.initialize(journal))))    }

    componentWillUnmount() {
        this._focusUnsubscribe()
    }

    _onTopicActivityChange = (topic, isActive) => {
        let {entries, activeTopics} = this.state
        this.setState({activeEntries : this._getEntriesWithTopics(entries, activeTopics)})
    }

    _getEntriesWithTopics = (entries, activeTopics) => {
        let newActiveEntries = new Set();
        for(let entry of entries){
            let hasAllTopics = true;
            for(let topic of activeTopics) {
                if (!entry.topics.has(topic)){
                    hasAllTopics = false;
                    break;
                }
            }
            if(hasAllTopics) newActiveEntries.add(entry)
        }
        return newActiveEntries
    }

    _onEntryRemoval = (entry) =>
    {
        let {entries, activeEntries} = this.state
        entries.delete(entry)
        activeEntries.delete(entry)
        this.setState({activeEntries : activeEntries, entries : entries})
    }

    _getJournalTitle = () => {
        let {activeTopics} = this.state
        if (activeTopics.size == 0) return ReadScreen.DEFAULT_JOURNAL_TITLE
        else {
            let journalTitle = ReadScreen.BASE_JOURNAL_TITLE
            activeTopics.forEach((topic) => journalTitle += topic + ", ")
            return journalTitle.substring(0, journalTitle.length-2) + ":"
        }
    }

    _search = (searched) => {
        let {entries, activeTopics} = this.state
        let activeSet = this._getEntriesWithTopics(entries, activeTopics)
        let newActiveSet = new Set()
        for(let entry of activeSet){
            if (entry.text.includes(searched) || entry.title.includes(searched)){
                newActiveSet.add(entry)
            }
        }
        this.setState({activeEntries : newActiveSet})
    }

    getJournalContainerHeight(){
        return (getScreenHeight() -
            HEADER_HEIGHT -
            MARGIN_BOTTOM -
            (TOPIC_BANK_SCALE * TOPIC_BOX_HEIGHT) -
            (BAR_HEIGHT / BAR_SCALE)
        ) / JOURNAL_CONTAINER_SCALE

    }

    render() {
        if (this.state.fontLoading || this.state.journalLoading) return <AppLoading/>
        let journalTitle = this._getJournalTitle()
        let {navigation} = this.props
        let {journal, topics, activeTopics, entries, activeEntries, searched, loading, journalLoading} = this.state
        return(
            <StyledBase>
                <View style = {[readStyles.outerFrame]}>
                    <SearchBar attrName={'searched'}
                               value={searched}
                               title = {'Search'}
                               width = {'100%'}
                               updateMasterState={this._updateMasterState}
                               style = {{height : BAR_HEIGHT}}
                               scale = {BAR_SCALE}
                               onChangeText={this._search}
                    />
                    <JournalContainerBox
                            title={journalTitle}
                            updateMasterState={this._updateMasterState}
                            scale = {JOURNAL_CONTAINER_SCALE}
                            width = {'100%'}
                            //style = {{flex : .75}}
                            height = {this.getJournalContainerHeight()}
                            blurOnSubmit = {false}
                            active = {entries.size > 0}
                            entries = {activeEntries}
                            journal = {journal}
                            navigation = {navigation}
                            onEntryRemoval = {this._onEntryRemoval}
                            />
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title='Look up your thoughts in the Thinktionary!'
                            active = {topics.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale = {TOPIC_BANK_SCALE}
                            topicScale = {.62}
                            topics = {topics}
                            width = '100%'
                            height = {TOPIC_BOX_HEIGHT}
                            onTopicActivityChange = {this._onTopicActivityChange}
                            activeTopicsName = {'activeTopics'}
                            activeTopics = {activeTopics}
                        />
                </View>
            </StyledBase>
        )
    }
}

export const readStyles = StyleSheet.create({
    bottomFrame:{
        flex : .15,
    },
    leftFrame: {
    },
    rightFrame: {
    },
    outerFrame:{
        marginTop : HEADER_HEIGHT,
        height : getScreenHeight() - HEADER_HEIGHT - MARGIN_BOTTOM,
        width : getScreenWidth() - 2*MARGIN_HORIZONTAL,
        marginHorizontal : MARGIN_HORIZONTAL,
        marginBottom : MARGIN_BOTTOM,
    }

});

