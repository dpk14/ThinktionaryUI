
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
    _onSubmit,
    loginAndInitialize,
    parseOrAlert,
    reloadJournalAndInitialize
} from "../functions/callBacks";
import ScreenNames from "../../../../navigation/ScreenNames";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {getScreenWidth} from "../../../utils/scaling";
import JSONParser from "../../../../requestHandler/Utils/JSONParser";
import FontUtils from "../../../utils/FontUtils";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {AsyncStorage} from "react-native"
import {JOURNAL_KEY, PWD, USER_KEY} from "../../../../assets/config";
import AppLoading from "expo/build/launch/AppLoading";

const MARGIN_HORIZONTAL = 15

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

    async loginAndInitialize(){
        try {
            let username = await AsyncStorage.getItem(USER_KEY)
            let pwd = await AsyncStorage.getItem(PWD)
            if(username == null || pwd == null) alert("error loading async user info")
            new Login(username, pwd).
            fetchAndExecute((journal) => this.setState(this.initialize(journal)))
        }
        catch(e){
            alert("Could not retrieve user data")
            console.warn(e)
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

    createOrSave = (onSave=()=>{}) => {
        const {title, text, topics} = this.state
        this.state.entryID == undefined ?
            new BuildEntry(this.state.journal.userID, title=='' ? "Untitled" : title, text, topics, undefined).
            fetchAndExecute([_onCreate(this.setEntryID), onSave]) :
            this.save(onSave)
    }

    setEntryID = (entryID) =>{
        this.setState({entryID : entryID})
    }

    save = (onSave=()=>{}) => {
        const {title, text, date, topics} = this.state
        new ModifyEntry(this.state.journal.userID, this.state.entryID, title=='' ? "Untitled" : title, text, topics).
        fetchAndExecute(onSave())
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

    render() {
        if (this.state.loading || this.state.journalLoading) return <AppLoading/>
        return (
            <GestureRecognizer
                onSwipeLeft={(state) => {
                    _onSubmit(this.props.navigation)(this.state.journal)
                }}
                style = {{width: "100%", height: "100%", flex : 1}}
                config={{directionalOffsetThreshold:50000}}
            >
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
                                onTopicPress = {this._onTopicCreatorPress}
                                blurOnSubmit = {false}
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
                                style = {{width : 187.5}}
                                onPress={() => this.createOrSave()}
                            />
                            <CustomButton
                                text="Submit"
                                scale = {.8}
                                marginTop={0}
                                style = {{width : 187.5}}
                                onPress={() => {
                                    this.createOrSave(this.submit);
                                }}
                            />
                        </View>
                    </View>
                </StyledBase>
            </GestureRecognizer>
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
        //flex: 1,
        marginTop : 7.5,
        justifyContent: 'space-between',
        //alignItems: 'center',
        flexDirection: 'row',
        width : '100%'
    },
    topFrame:{
        width : '100%',
    },
    outerFrame:{
        marginTop : 60,
        width : getScreenWidth() - 2*MARGIN_HORIZONTAL,
        marginHorizontal : MARGIN_HORIZONTAL
    }

});
