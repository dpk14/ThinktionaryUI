import Screen, {baseStyles} from "../Screen";
import {StyleSheet, Keyboard} from "react-native";
import {View} from "react-native";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import StyledBase from "../StyledBase";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {JournalContainerBox} from "../../../EntryBox/JournalBox/JournalContainerBox";
import {getScreenHeight, getScreenWidth, HEADER_HEIGHT} from "../../../utils/scaling";
import {SearchBar} from "../../../EntryBox/TextInputBox/SearchBar/SearchBar";
import {loginAndInitialize, saving} from "../functions/callBacks";
import {TOPIC_BOX_HEIGHT} from "./WriteScreen";
import {ENTRY_BOX_HEIGHT, ENTRY_BOX_VERT_MARGIN, NAVIGATOR_HEIGHT} from "../../../utils/baseStyles";
import {AsyncStorage} from "react-native-web";
import {SAVING} from "../../../../assets/config";
import LoadingScreen from "../../LoadingScreen";
import EntryHeader from "../../../EntryBox/JournalBox/EntryHeader";

let MARGIN_HORIZONTAL = 0
let MARGIN_BOTTOM = 30  //30
let BAR_SCALE = .6
let TOPIC_BANK_SCALE = .75
let BAR_HEIGHT = getScreenHeight() * .055
let JOURNAL_CONTAINER_SCALE = .85

export default class ReadScreen extends Screen {

    static DEFAULT_JOURNAL_TITLE = 'All entries:'
    static BASE_JOURNAL_TITLE = 'All entries about'

    constructor(props) {
        super(props);
        this.state = {
            ...this.state, ...{
                journalLoading: true,
                journalSaving: true,
                loading: false
            }
        }
    }

    initialize(journal) {
        return {
            activeTopics: new Set(),
            journal: journal,
            entries: journal.entries,
            activeEntries: journal.entries,
            topics: journal.topics,
            searched: '',
            journalLoading: false,
            journalSaving : false,
            initializing: true,
            entryIndex : journal.entries.size-1,
            lastLength : journal.entries.size,
            clearing : false
        }
    }

    clear(journal) {
        return {
            activeTopics: new Set(),
            journal: journal,
            entries: journal.entries,
            activeEntries: journal.entries,
            topics: journal.topics,
            searched: '',
            journalLoading: false,
            initializing: true,
            entryIndex : journal.entries.size-1,
            lastLength : journal.entries.size,
            clearing : true,
        }
    }

    async componentDidMount() {
        setTimeout(() => this.tryLoad(), 50);
        this._focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            Keyboard.dismiss()
            setTimeout(() => this.tryLoad(), 50);
        })
        this._blurUnsubscribe = this.props.navigation.addListener('blur', () => {
            this.props.navigation.setParams({entryHeader : undefined})
            this.setState(this.clear(this.state.journal))
            setTimeout(() => this.setState({journalSaving: true}), 10)
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let {lastLength} = this.state
        if (nextState.activeEntries && nextState.activeEntries.size != lastLength) {
            this.setState({lastLength : nextState.activeEntries.size, entryIndex: nextState.activeEntries.size == 0 ? 0 : nextState.activeEntries.size-1})
        }
        return true;
    }


    async tryLoad() {
        this.setState()
        saving().then((saving) => {
            if (saving) {
                this.tryLoad()
            } else {
                //this.setState({journalSaving: false})
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
            this.setState({initializing: false})
        }
    }

    _onTopicActivityChange = (topic, isActive) => {
        let {entries, activeTopics} = this.state
        this.setState({activeEntries: this._getEntriesWithTopics(entries, activeTopics)})
    }

    _getEntriesWithTopics = (entries, activeTopics) => {
        let newActiveEntries = new Set();
        for (let entry of entries) {
            let hasAllTopics = true;
            for (let topic of activeTopics) {
                if (!entry.topics.has(topic)) {
                    hasAllTopics = false;
                    break;
                }
            }
            if (hasAllTopics) newActiveEntries.add(entry)
        }
        return newActiveEntries
    }

    _onEntryRemoval = (entry) => {
        let {entries, activeEntries} = this.state
        entries.delete(entry)
        activeEntries.delete(entry)
        this.setState({activeEntries: activeEntries, entries: entries})
    }

    _getJournalTitle = () => {
        let {activeTopics, searched} = this.state
        //if (activeTopics.size == 0 ) return ReadScreen.DEFAULT_JOURNAL_TITLE
        let journalTitle = ReadScreen.BASE_JOURNAL_TITLE
        let activeTopicsArray = Array.from(activeTopics)
        if (activeTopicsArray.length == 0) {
            if (searched.length == 0) {
                return ReadScreen.DEFAULT_JOURNAL_TITLE
            } else {
               return journalTitle + " " + searched + ":";
            }
        } else if (activeTopicsArray.length == 1) {
            journalTitle += " " + activeTopicsArray[0];
            if (searched.length > 0) {
                journalTitle += " and " + searched
            }
            return journalTitle + ":"
        } else if (activeTopicsArray.length == 2) {
            if (searched.length == 0) {
                return journalTitle + " " + activeTopicsArray[0] + " and " + activeTopicsArray[1] + ":";
            } else {
                return journalTitle + " " + activeTopicsArray[0] + ", " + activeTopicsArray[1] + ", and " + searched + ":";
            }
        } else {
            if (searched.length > 0) {
                journalTitle += " " + searched + ","
            }
            for (let i = 0; i < activeTopicsArray.length; i++) {
                if (i == (activeTopicsArray.length - 1)) {
                    return journalTitle + " and " + activeTopicsArray[i] + ":";
                } else {
                    journalTitle += " " + activeTopicsArray[i] + ","
                }
            }
        }
        return ReadScreen.DEFAULT_JOURNAL_TITLE
    }

    _search = (searched) => {
        let {entries, activeTopics} = this.state
        let activeSet = this._getEntriesWithTopics(entries, activeTopics)
        let newActiveSet = new Set()
        let searchedCaseInsens = searched.toLowerCase()
        for (let entry of activeSet) {
            if (entry.text.toLowerCase().includes(searchedCaseInsens) ||
                entry.title.toLowerCase().includes(searchedCaseInsens) ||
                entry.topics.has(searchedCaseInsens) ||
                entry.topics.has(searched)) {
                newActiveSet.add(entry)
            }
        }
        this.setState({activeEntries: newActiveSet})
    }

    static getJournalContainerHeight = () => {
        return (getScreenHeight() -
            HEADER_HEIGHT -
            EntryHeader.calculateEntryHeaderHeight()
            - NAVIGATOR_HEIGHT / 2 - 15 //(15 is margin added between navigation bar and searchbar
            - MARGIN_BOTTOM -
            (TOPIC_BANK_SCALE * 1.5 * TOPIC_BOX_HEIGHT) -
            (BAR_HEIGHT * BAR_SCALE)
            - (6 * ENTRY_BOX_VERT_MARGIN)
        )
    }

    render() {
        if (this.state.fontLoading || this.state.journalLoading || this.state.journalSaving) return <LoadingScreen/>
        let journalTitle = this._getJournalTitle()
        let {navigation, scale} = this.props
        let {journal, topics, activeTopics, entries, activeEntries, searched, journalLoading, entryIndex, clearing} = this.state
        let currentEntry = Array.from(activeEntries)[entryIndex]
        if (!clearing && (!this.props.route || !this.props.route.params || !this.props.route.params.entryHeader || currentEntry != this.props.route.params.entryHeader.currentEntry)) {
            this.props.navigation.setParams({
                entryHeader: {
                    currentEntry : currentEntry,
                    journal : journal,
                    scale : JOURNAL_CONTAINER_SCALE,
                    journalScale : .8,
                    onEntryRemoval : this._onEntryRemoval
                }
            })
        }
        return (
            <StyledBase>
                <View style={[readStyles.outerFrame]}>
                    <JournalContainerBox
                        title={journalTitle}
                        updateMasterState={this._updateMasterState}
                        scale={JOURNAL_CONTAINER_SCALE}
                        width={'100%'}
                        style={{height: ReadScreen.getJournalContainerHeight(), borderRadius: 0, marginTop : 0, marginBottom : (NAVIGATOR_HEIGHT / 2) + 10}}
                        blurOnSubmit={false}
                        active={entries.size > 0}
                        entries={activeEntries}
                        journal={journal}
                        navigation={navigation}
                        onEntryRemoval={this._onEntryRemoval}
                        value={''}
                        updateRichTextEditor={this.updateRichTextEditor}
                        entryIndex={this.state.entryIndex}
                        currentEntry={currentEntry}
                        lastLength={this.state.lastLength}
                    />
                    <View style={{marginHorizontal : 15, alignItems:'center'}}>
                        <SearchBar attrName={'searched'}
                                   value={searched}
                                   title={'Search'}
                                   width={'100%'}
                                   updateMasterState={this._updateMasterState}
                                   style={{height: BAR_HEIGHT}}
                                   scale={BAR_SCALE}
                                   onChangeText={this._search}
                        />
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title='Look up your thoughts in the Thinktionary!'
                            active={topics.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale={TOPIC_BANK_SCALE}
                            topicScale={.62}
                            topics={topics}
                            width='98%'
                            height={1.5 * TOPIC_BOX_HEIGHT}
                            onTopicActivityChange={this._onTopicActivityChange}
                            activeTopicsName={'activeTopics'}
                            activeTopics={activeTopics}
                            value={''}
                            //style={'marginLeft'}
                            reset={this.state.initializing}
                        />
                    </View>
                </View>
            </StyledBase>
        )
    }
}

export const readStyles = StyleSheet.create({
    bottomFrame: {
        flex: .15,
        //justifyContent: 'center',
        alignItems : 'center',
        //marginHorizontal: 15//MARGIN_HORIZONTAL
    },
    leftFrame: {},
    rightFrame: {},
    outerFrame: {
        marginTop: HEADER_HEIGHT + EntryHeader.calculateEntryHeaderHeight(),
        height: getScreenHeight() - HEADER_HEIGHT - MARGIN_BOTTOM,
        width: getScreenWidth() - 2 * MARGIN_HORIZONTAL,
        marginHorizontal: MARGIN_HORIZONTAL,
        marginBottom: MARGIN_BOTTOM,
        //justifyContent: 'center',
        alignItems : 'center',
    }

});

