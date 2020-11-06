import {bool, object, func} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
import TopicContainer from "./TopicContainer";
import React, { Component } from 'react';
import {Keyboard} from "react-native";
import {PURPLE} from "../../utils/baseStyles";

export class TopicBank extends Component {
    static propTypes = {...TopicContainer.propTypes,
        ...{alwaysActive: bool,
            onTopicActivityChange : func}
    }
    static defaultProps = {...TopicContainer.defaultProps,
        ...{alwaysActive: false,
            onTopicActivityChange : ()=>{}}}

    constructor(props) {
        super(props);
    }

    _onTopicPress = (topic) =>
    {return async () => {
        let {onTopicActivityChange, activeTopics, updateMasterState, activeTopicsName} = this.props;
        let newActiveTopics = new Set(activeTopics)
        let topicActive = false
        if (newActiveTopics.has(topic)) {
            newActiveTopics.delete(topic)
            topicActive = false
        } else {
            newActiveTopics.add(topic);
            topicActive = true
        }
        await updateMasterState(activeTopicsName, newActiveTopics)
        onTopicActivityChange(topic, topicActive)
    }
    }

    render() {
        const {
            title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, topicScale, editable, alwaysActive, topics, setName, active, reset
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={height}
                          active={active}
                          value={value}
                          reset={reset}
            >
                <TopicContainer
                    attrName={attrName}
                    setName={setName}
                    value={value}
                    updateMasterState={updateMasterState}
                    width={width}
                    height="100%"
                    topicScale={topicScale}
                    topics={new Set(Array.from(topics).sort(function (a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    }))}
                    alphabetize = {true}
                    activeTopicStyle = {{backgroundColor : PURPLE}}
                    activeTopics = {this.props.activeTopics}
                    onTopicActivityChange = {this.props.onTopicActivityChange}
                    onTopicPress = {this._onTopicPress}
                    onTopicDelete = {this.props.onTopicDelete}
                />
            </EntryBox>
        )
    }
}
