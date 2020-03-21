import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../configStrings";
import EntryBox, {Styles} from "./EntryBox";
import CustomButton from "./CustomButton";
import {TOPIC_HEIGHT, TOPIC_WIDTH} from "./strings";
const MULTILINE_TOPMARGIN_ADJUSTER = 4

export default class TopicCreator extends EntryBox {

    static defaultProps = {...EntryBox.defaultProps,
                        ...{
                            multiline : true
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
                onPress={()=>{}}
            />));
        return TopicBoxes
    }

    _onSubmitEditing = () => {
        const { attrName, updateMasterState, value } = this.props;
        const {topics} = this.state
        let oldLength = topics.length
        this.state.topics.add(value)
        updateMasterState(attrName, '');
        if (oldLength != topics.length) {
            this.setState({textLeftOffset : state.textLeftOffset+=TOPIC_WIDTH})
        }
    }

    _onKeyPress = (event) => {
        //if (event.key === 'Backspace' && this.props.value == '')
        //const { attrName, updateMasterState } = this.props;
        //updateMasterState(attrName, updatedValue);
    }

    render() {
        const StyledTextInput = this.renderTextInput()
        const TopicBoxes = this.renderTopicBoxes()
        if (!this.loading) {
            return (
                <Animated.ScrollView contentContainerStyle = {{flexGrow : 1}}
                                     style={[Styles.container, addStyles.container, this._returnAnimatedContainerStyles()]}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                    {TopicBoxes}
                    {StyledTextInput}
                </Animated.ScrollView>
            )
        }
        else return null;
    }

}

const addStyles = StyleSheet.create({
    container: {
        flexGrow : 1,
        flexDirection : 'row',
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
