import Screen, {baseStyles} from "../Screen";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import StyledBase from "../StyledBase";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";
import {JournalContainerBox} from "../../../EntryBox/JournalBox/JournalContainerBox";

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
            topics : journal.topics
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
        this.setState({activeEntries : newActiveEntries})
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

    render() {
        let journalTitle = this._getJournalTitle()
        let {navigation} = this.props
        let {journal, topics, activeTopics, entries, activeEntries} = this.state
        return(
            <StyledBase>
                <View style = {[readStyles.outerFrame]}>
                    <View style = {readStyles.topFrame}>
                        <JournalContainerBox
                            attrName=''
                            title={journalTitle}
                            value=''
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            width = '100%'
                            height = '90%'
                            blurOnSubmit = {false}
                            active = {entries.size>0}
                            entries = {activeEntries}
                            journal = {journal}
                            navigation = {navigation}
                            />
                    </View>
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
    topFrame: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        height: '60%'
    },
    bottomFrame:{
    },
    leftFrame: {
    },
    rightFrame: {
    },
    outerFrame:{
        marginTop : 60,
        //flex: 1,
        marginHorizontal : 15,
        marginBottom : 10,
    }

});

