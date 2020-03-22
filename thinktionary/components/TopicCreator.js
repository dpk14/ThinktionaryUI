import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import EntryBox, {Styles} from "./EntryBox";
import CustomButton from "./CustomButton";
import {TOPIC_HEIGHT, TOPIC_WIDTH} from "./strings";
import {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {Keyboard} from "react-native-web";
const MULTILINE_TOPMARGIN_ADJUSTER = 4

export default class TopicCreator extends EntryBox {

    static defaultProps = {...EntryBox.defaultProps,
                        ...{
                            multiline : false,
                            blurOnSubmit : false,
                            topicScale : 1
                        }
                        };

    constructor(props) {
        super(props);
        this.state.topics = new Set()
    }

    renderTopicBoxes(){
        const TopicBoxes = []
        this.state.topics.forEach(topic => TopicBoxes.push(
            <CustomButton
                text = {topic}
                scale = {this.props.topicScale}
                alignItems="flex-start"
                onPress={()=>{}}
            />));
        TopicBoxes.push(this.renderTextInput({
            marginLeft: this.state.topics.size > 0 ? 10 : this.props.textMarginLeft,
            flex: 1,
        }))
        return TopicBoxes
    }

    _onSubmitEditing = () => {
        const { attrName, updateMasterState, value, textMarginLeft} = this.props;
        const {topics} = this.state
        let oldLength = topics.length
        topics.add(value)
        if (oldLength != topics.length) {
            this.setState({textLeftOffset : this.state.textLeftOffset + TOPIC_WIDTH,
                                topics : topics,
            })
        }
        updateMasterState(attrName, '');
        if(this.state.topics.size>0) updateMasterState('active', true);
    }

    //a bunch of buttons in rows and columns with a text inpit on end. textbox is stretched til end of contaner.
    //if text length exceeds that of textbox, move to next line. "lines" can just be stacks of views.

    _onKeyPress = ({nativeEvent}) => {
        const { topics } = this.state;
        if (nativeEvent.key === 'Backspace' && this.props.value == '' && topics.size>0) {
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
        /*
        const StyledTextInput = this.renderTextInput({
          marginLeft: this.state.topics.size > 0 ? 10 : this.props.textMarginLeft,
            flex: 1,
        })
        */
        const TopicBoxes = this.renderTopicBoxes()
        if (!this.loading) {
            return (
                <Animated.View style={[Styles.container, this._returnAnimatedContainerStyles(), this._returnBaseContainerStyles(), this._returnContainerMarginStyles()]}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                    <Animated.ScrollView
                                        contentContainerStyle = {{flexGrow : 1}}
                                         style={[addStyles.scrollView]}>
                    {TopicBoxes}
                    </Animated.ScrollView>
                </Animated.View>
            )
        }
        else return null;
    }

}

const addStyles = StyleSheet.create({
    scrollView: {
        flex : 1,
        flexDirection : 'row',
        borderRadius: 20,
        shadowOffset: { height: 4},
        shadowRadius: 20,
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
