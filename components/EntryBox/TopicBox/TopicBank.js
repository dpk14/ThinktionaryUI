import {bool} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
import TopicContainer from "./TopicContainer";
import React, { Component } from 'react';
import {Keyboard} from "react-native";

export class TopicBank extends Component {
    static propTypes = {...TopicContainer.propTypes, ...{alwaysActive: bool}}
    static defaultProps = {...TopicContainer.defaultProps, ...{alwaysActive: false}}

    constructor(props) {
        super(props);
        this.state = {
            activeTopics : new Set()
        }
    }

    _onTopicPress = (topic) => {
        return () => {
            let {activeTopics} = this.state;
            let {topics, attrName, updateMasterState} = this.props;
            let newActiveTopics = new Set(activeTopics)
            let newTopics = new Set(topics)
            newActiveTopics.has(topic) ? newTopics.remove(topic).then(newActiveTopics.remove(topic)) :
                newTopics.add(topic).then(newActiveTopics.add(topic))
            this.setState({activeTopics : newActiveTopics})
            updateMasterState(attrName, newTopics)
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
                    onTopicPress={this._onTopicPress}
                    activeSet={this.state.activeTopics}
                    activeStyle = {{borderColor : 'purple'}}
                />
            </EntryBox>
        )
    }
}
