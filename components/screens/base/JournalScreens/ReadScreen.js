import Screen, {baseStyles} from "../Screen";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import StyledBase from "../StyledBase";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";

export default class ReadScreen extends Screen {

    static DEFAULT_JOURNAL_TITLE = 'All entries:'
    static BASE_JOURNAL_TITLE = 'All entries about '

    constructor(props) {
        super(props);
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
        this.state.activeTopics = new Set()
        this.journal = props.route.params.journal
        this.topics = this.journal.topics
    }

    _onTopicActivityChange = () => {

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
        return(
            <StyledBase>
                <View style = {[readStyles.outerFrame]}>
                    <View style = {readStyles.topFrame}>
                            <StyledInputBox
                                attrName='journal'
                                title={journalTitle}
                                value={''}
                                updateMasterState={this._updateMasterState}
                                scale = {.75}
                                width='100%'
                                height = '90%'
                                multiline = {true}
                                blurOnSubmit={false}
                                active = {true}
                                editable = {false}
                            />
                    </View>
                    <View style={readStyles.bottomFrame}>
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title='Select tags to search past entries!'
                            active = {this.topics.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            topics = {this.topics}
                            width= '100%'
                            height={1.5*TOPIC_HEIGHT}
                            onTopicActivityChange={this._onTopicActivityChange}
                            activeTopicsName ={'activeTopics'}
                            activeTopics = {this.state.activeTopics}
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

