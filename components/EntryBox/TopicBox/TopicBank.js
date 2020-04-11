import {bool, object, func} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
import TopicContainer from "./TopicContainer";
import React, { Component } from 'react';
import {Keyboard} from "react-native";

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
    {return () => {
        let {onTopicActivityChange, activeTopics, updateMasterState, activeTopicsName} = this.props;
        let newActiveTopics = new Set(activeTopics)
        if (newActiveTopics.has(topic)){
            newActiveTopics.delete(topic)
            onTopicActivityChange(topic, false)
        }
        else{
            newActiveTopics.add(topic);
            onTopicActivityChange(topic, true)
        }
        updateMasterState(activeTopicsName, newActiveTopics)
    }
    }

    render() {
        const {
            title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, topicScale, editable, alwaysActive, topics, setName, active
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={height}
                          active={active}
            >
                <TopicContainer
                    attrName={attrName}
                    setName={setName}
                    value={value}
                    updateMasterState={updateMasterState}
                    width={width}
                    height="100%"
                    topicScale={topicScale}
                    topics={topics}
                    activeTopicStyle = {{backgroundColor : '#ae43ec'}}
                    activeTopics = {this.props.activeTopics}
                    onTopicActivityChange = {this.props.onTopicActivityChange}
                    onTopicPress = {this._onTopicPress}
                    onTopicDelete = {this.props.onTopicDelete}
                />
            </EntryBox>
        )
    }
}
