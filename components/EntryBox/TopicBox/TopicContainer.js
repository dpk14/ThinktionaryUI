import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text, Keyboard } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "../TextInputBox/StyledTextInput";
import CustomButton from "../../CustomButton";
import {TOPIC_HEIGHT, TOPIC_WIDTH} from "../../strings";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import EntryBox from "../EntryBox";
import {basePropTypes} from "../baseProps";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import setType from 'es6-set-proptypes';
import {childrenWithProps} from "../../utils/general";

export default class TopicContainer extends Component {

    static defaultProps  = {
        ...StyledTextInput.propTypes,
        ...{
            topics : object.isRequired,
            topicScale : number,
            blurOnSubmit : bool,
            setName : string.isRequired,
            activeTopicStyle : object,
            onTopicActivityChange : func,
        }
    }

    static defaultProps = {
        ...StyledTextInput.defaultProps,
        ...{
            topics : {},
            multiline: false,
            blurOnSubmit: false,
            topicScale: 1,
            activeTopicStyle : {},
            onTopicActivityChange : ()=>{}
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            textLeftOffset: 0,
            activeTopics : new Set(),
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    _onTopicPress = (topic) =>
    {return () => {
        //this.props.updateContainerState(true)
        let {onTopicActivityChange} = this.props;
        let {activeTopics} = this.state;
        let newActiveTopics = new Set(activeTopics)
        this.props.updateContainerState(true)
        if (newActiveTopics.has(topic)){
            newActiveTopics.delete(topic)
            onTopicActivityChange(topic, false)
        }
        else{
            newActiveTopics.add(topic);
            onTopicActivityChange(topic, true)
        }
        this.setState({activeTopics: newActiveTopics})
    }
    }

    _onSubmitEditing = () => {
        const {attrName, setName, updateMasterState, value, topics} = this.props;
        if (value == '') {
            Keyboard.dismiss()
            return
        }
        let oldLength = topics.size
        const topicsNew = new Set()
        topics.forEach((topic) => topicsNew.add(topic))
        topicsNew.add(value)
        if (oldLength != topicsNew.size) {
            updateMasterState(setName, topicsNew)
        }
        updateMasterState(attrName, '');
    }

    renderTopicBoxes() {
        const TopicBoxes = []
        this.props.topics.forEach(topic => TopicBoxes.push(
            <CustomButton
                text={topic}
                scale={this.props.topicScale}
                alignItems="flex-start"
                onPress={this._onTopicPress(topic)}
                style ={this.state.activeTopics.has(topic) ? this.props.activeTopicStyle : {}}
            />));
        return TopicBoxes
    }

    _handleBlur = () => {
        if (this.props.active && !this.props.value && this.props.topics.size == 0) {
            this.props.updateContainerState(false)
        }
    }

    //a bunch of buttons in rows and columns with a text inpit on end. textbox is stretched til end of contaner.
    //if text length exceeds that of textbox, move to next line. "lines" can just be stacks of views.

    _onKeyPress = ({nativeEvent}) => {
        const {topics, activeTopics, activeTopicsName, updateMasterState} = this.props;
        if (nativeEvent.key === 'Backspace' && this.props.value == '' && topics.size > 0) {
            let endTopic = Array.from(topics).pop()
            topics.delete(endTopic)
            let newactiveTopics = new Set(activeTopics)
            newactiveTopics.delete(endTopic)
            newactiveTopics.size != activeTopics.size ? this.setState({activeTopics: newactiveTopics}) :
                this.setState({
                    topics: topics
                }
            )
        }
        //const { attrName, updateMasterState } = this.props;
        //updateMasterState(attrName, updatedValue);
    }

    render() {
        const children = //this.props.alwaysActive ? this.props.children :
            childrenWithProps(this.props.children, {
                onBlur : this._handleBlur,
                onSubmitEditing : this._onSubmitEditing,
                onKeyPress : this._onKeyPress,
                active : this.props.active,
                updateContainerState : this.props.updateContainerState
            })
        const TopicBoxes = this.renderTopicBoxes()
        return (
                <ScrollView
                    contentContainerStyle = {{flexGrow : 1}}
                    style = {{height : '100%', width : '100%',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        borderRadius : 10}}
                >
                    <View style={[addStyles.scrollView]}>
                        {TopicBoxes}
 <View style = {{ flex : 1 }} >
                            {children}
                        </View>
                    </View>
                </ScrollView>
        )
    }
}

const addStyles = StyleSheet.create({
    practiceView: {
        flex : 1,
        flexDirection : 'row',
        borderRadius: 20,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        width : 360,
        color : 'white',
        flexWrap : "wrap"
    },
    scrollView: {
        flex : 1,
        height : '100%',
        flexDirection : 'row',
        shadowOffset: { height: 4},
        shadowRadius: 20,
        width : '100%',
        flexWrap : "wrap",
        borderRadius : 10
    },
    textInput: {
        fontWeight: '400',
        fontFamily: HP_SIMPLIFIED,
        color: '#282828',
        width: '100%',
        height: 65,
        position: 'relative',
        borderRadius: 20,
        opacity: .9
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontWeight: '300',
        lineHeight: 24,
    }

})
