import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text, Keyboard } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "../TextInputBox/StyledTextInput";
import CustomButton from "../../Buttons/CustomButton";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import {childrenWithProps} from "../../utils/general";
import {TouchableOpacity} from "react-native"

export default class TopicContainer extends Component {

    static defaultProps  = {
        ...StyledTextInput.propTypes,
        ...{
            topics : object.isRequired,
            topicScale : number,
            blurOnSubmit : bool,
            setName : string.isRequired,
            activeTopicStyle : object,
            activeTopics : object,
            onTopicActivityChange : func,
            onTopicDelete : func,
            onTopicPress : func,
            alphabetized : bool
        }
    }

    static defaultProps = {
        ...StyledTextInput.defaultProps,
        ...{
            topics : {},
            multiline: false,
            blurOnSubmit: false,
            alphabetize : false,
            topicScale: 1,
            activeTopicStyle : {},
            activeTopics : new Set(),
            onTopicActivityChange : ()=>{},
            onTopicDelete : ()=>{},
            onTopicPress : ()=>{},
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            textLeftOffset: 0,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
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
        if (this.props.topics.size > 0  && !this.props.active) this.props.updateContainerState(true)
        this.props.topics.forEach(topic =>  TopicBoxes.push(
            <CustomButton
                text={topic}
                scale={this.props.topicScale}
                onPress={this.props.onTopicPress(topic)}
                style ={this.props.activeTopics.has(topic) ? {...this.props.activeTopicStyle, ...{alignItems : "flex-start"}} : {}}
            />));
        return TopicBoxes
    }

    renderAlphabetizedTopicBoxes() {
        const TopicBoxes = []
        const lettersUsed = new Set()
        let currentChar = "A";
        if (this.props.topics.size > 0  && !this.props.active) this.props.updateContainerState(true)
        this.props.topics.forEach(topic => {
            while (!(currentChar === topic.substring(0, 1) || currentChar.toLowerCase() === topic.substring(0, 1))
                && currentChar.toLowerCase() != 'z' + 1) {
                currentChar = String.fromCharCode(currentChar.charCodeAt() + 1);
            }
            if (!lettersUsed.has(currentChar)) {
                TopicBoxes.push(
                    <View style={{width : this.props.width, marginTop: TopicBoxes.length == 0 ? 2 : 0}}>
                        <Text style = {addStyles.alphabetText} >
                            {currentChar}
                        </Text>
                    </View>
                )
                lettersUsed.add(currentChar)
            }
            TopicBoxes.push(
            <CustomButton
                text={topic}
                scale={this.props.topicScale}
                onPress={this.props.onTopicPress(topic)}
                style ={this.props.activeTopics.has(topic) ? {...this.props.activeTopicStyle, ...{alignItems : "flex-start"}} : {}}
            />)});
        return TopicBoxes
    }

    _handleBlur = () => {
        if (!this.props.value && this.props.topics.size == 0) {
            this.props.updateContainerState(false)
        }
    }

    _onKeyPress = ({nativeEvent}) => {
        const {topics, setName, updateContainerState} = this.props;
        if (nativeEvent.key === 'Backspace' && this.props.value == '' && topics.size > 0) {
            let endTopic = Array.from(topics).pop()
            topics.delete(endTopic)
            this.props.updateMasterState(setName, topics)
            this.props.onTopicDelete(endTopic);
        }
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
        const TopicBoxes = this.props.alphabetize ? this.renderAlphabetizedTopicBoxes() : this.renderTopicBoxes()
        return (
                <ScrollView
                    contentContainerStyle = {{flexGrow : 1}}
                    keyboardShouldPersistTaps = {'handled'}
                    style = {{height : '100%', width : '100%',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        borderRadius : 10}}
                >
                    <TouchableOpacity
                        activeOpacity = {.9}
                        style={[addStyles.scrollView]}>
                        {TopicBoxes}
                        <View style = {{ flex : 1}} >
                            {children}
                        </View>
                    </TouchableOpacity>
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
    alphabetText: {
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontSize : 13,
        color: '#512da8',
        position: 'relative',
        borderRadius: 20,
        opacity: .9
    }
})
