import Screen, {baseStyles} from "../Screen";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import StyledBase from "../StyledBase";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import {JournalContainerBox} from "../../../EntryBox/JournalBox/JournalContainerBox";
import {getScreenHeight, getScreenWidth} from "../../../utils/scaling";
import {SearchBar} from "../../../EntryBox/TextInputBox/SearchBar";

let MARGIN_HORIZONTAL = 15
export default class ReadScreen extends Screen {

    static DEFAULT_JOURNAL_TITLE = 'All entries:'
    static BASE_JOURNAL_TITLE = 'All entries about '

    constructor(props) {
        super(props);
        this.state = {
            ...this.state, ...this.initialize()
        }
    }

    initialize(){
        let {journal} = this.props.route.params
        return {
            activeTopics : new Set(),
            journal : journal,
            entries : journal.entries,
            activeEntries : journal.entries,
            topics : journal.topics,
            searched : ''
        }
    }

    componentDidMount() {
        this._focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState(this.initialize())
        });
    }

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

    render() {
        let journalTitle = this._getJournalTitle()
        let {navigation} = this.props
        let {journal, topics, activeTopics, entries, activeEntries, searched} = this.state
        return(
            <StyledBase>
                <View style = {[readStyles.outerFrame]}>
                    <SearchBar attrName={'searched'}
                               value={searched}
                               title = {'Search'}
                               width = {'100%'}
                               updateMasterState={this._updateMasterState}
                               style = {{flex : .065}}
                               scale = {.60}
                               onChangeText={this._search}
                    />
                    <JournalContainerBox
                            title={journalTitle}
                            updateMasterState={this._updateMasterState}
                            scale = {.85}
                            width = {'100%'}
                            style = {{flex : .75}}
                            blurOnSubmit = {false}
                            active = {entries.size>0}
                            entries = {activeEntries}
                            journal = {journal}
                            navigation = {navigation}
                            onEntryRemoval = {this._onEntryRemoval}
                            />
                    <View style={readStyles.bottomFrame}>
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title='Select tags to search past entries!'
                            active = {topics.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            topics = {topics}
                            width= '100%'
                            height={1.5*TOPIC_HEIGHT}
                            onTopicActivityChange={this._onTopicActivityChange}
                            activeTopicsName ={'activeTopics'}
                            activeTopics = {activeTopics}
                        />
                    </View>
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
        marginTop : 60,
        height : getScreenHeight() - 70,
        width : getScreenWidth() - 2*MARGIN_HORIZONTAL,
        marginHorizontal : MARGIN_HORIZONTAL,
        marginBottom : 10,
    }

});

