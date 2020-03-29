import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "./StyledTextInput";
import CustomButton from "../CustomButton";
import {TOPIC_HEIGHT, TOPIC_WIDTH} from "../strings";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {Keyboard} from "react-native-web";
import EntryBox from "./EntryBox";
import {basePropTypes} from "./baseProps";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import setType from 'es6-set-proptypes';

export default class TopicCreator extends Component {

    static defaultProps  = {
        ...StyledTextInput.propTypes,
        ...{
            topics : object,
            topicScale : number,
            blurOnSubmit : bool,
        }
    }

    static defaultProps = {
        ...StyledTextInput.defaultProps,
        ...{
            topics : {},
            multiline: false,
            blurOnSubmit: false,
            topicScale: 1
        }
    };

    constructor(props) {
        super(props);
        console.log("SIYHYHE " + this.props.topics)
        const topics = new Set()
        Object.keys(this.props.topics).forEach((topic) => topics.add(topic))
        this.state = {
            loading : true,
            topics :topics,
            textLeftOffset : 0
        }
        //console.log(this.props.updateContainerState)
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    renderTopicBoxes() {
        const TopicBoxes = []
        this.state.topics.forEach(topic => TopicBoxes.push(
            <CustomButton
                text={topic}
                scale={this.props.topicScale}
                alignItems="flex-start"
                onPress={() => {
                }}
            />));
        return TopicBoxes
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            this.props.updateContainerState(true)
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value && this.state.topics.size == 0) {
            this.setState({ isFieldActive: false });
            this.props.updateContainerState(false)
        }
    }

    _onSubmitEditing = () => {
        const {attrName, updateMasterState, value} = this.props;
        const {topics} = this.state
        let oldLength = topics.length
        topics.add(value)
        if (oldLength != topics.length) {
            this.setState({
                textLeftOffset: this.state.textLeftOffset + TOPIC_WIDTH,
                topics: topics,
            })
        }
        updateMasterState(attrName, '');
    }

    //a bunch of buttons in rows and columns with a text inpit on end. textbox is stretched til end of contaner.
    //if text length exceeds that of textbox, move to next line. "lines" can just be stacks of views.

    _onKeyPress = ({nativeEvent}) => {
        const {topics} = this.state;
        if (nativeEvent.key === 'Backspace' && this.props.value == '' && topics.size > 0) {
            topics.delete(Array.from(topics).pop())
            this.setState({
                    topics: topics
                }
            )
        }
        //const { attrName, updateMasterState } = this.props;
        //updateMasterState(attrName, updatedValue);
    }

    render() {
        const {scale, width, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, editable}  = this.props
        console.log(this.state.topics.size)
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
                    <StyledTextInput     multiline = {multiline}
                                         attrName={attrName}
                                         returnKeyType = {returnKeyType}
                                         blurOnSubmit = {blurOnSubmit}
                                         value={value}
                                         keyboardType={keyboardType}
                                         autoCompletType = {false}
                                         updateMasterState={updateMasterState}
                                         height = "100%"
                                         scale = {scale}
                                         onFocus = {this._handleFocus}
                                         onBlur = {this._handleBlur}
                                         onSubmitEditing={this._onSubmitEditing}
                                         onKeyPress={this._onKeyPress}
                                         editable = {editable}
                                         active = {this.state.topics.size > 0}
                                         style = {{position : 'absolute', top : 0, left : -10}}

                    />
                        </View>
                    </View>
                </ScrollView>
        )
    }
}

export class TopicCreatorBox extends Component{
    static propTypes = {...TopicCreator.propTypes, ...{alwaysActive : bool}}
    static defaultProps = {...TopicCreator.defaultProps, ...{alwaysActive : false}}

    constructor(props) {
        super(props);
    }
    render() {
        const {title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, topicScale, editable, alwaysActive, topics}
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width = {width}
                          height = {height}
                          alwaysActive={alwaysActive}
            >
                <TopicCreator multiline = {multiline}
                              attrName={attrName}
                              returnKeyType = {returnKeyType}
                              blurOnSubmit = {blurOnSubmit}
                              value={value}
                              keyboardType={keyboardType}
                              autoCompletType = {false}
                              updateMasterState={updateMasterState}
                              width = {width}
                              height = "100%"
                              scale = {scale}
                              editable = {editable}
                              topicScale = {topicScale}
                              topics = {topics}
                />
            </EntryBox>
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
