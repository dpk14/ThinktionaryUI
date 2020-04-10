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
        this.state = {
            activeTopics : new Set()
        }
    }

    _onTopicPress = (topic) =>
    {return () => {
        let {onTopicActivityChange} = this.props;
        let {activeTopics} = this.state;
        let newActiveTopics = new Set(activeTopics)
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
                    activeStyle = {{}}
                />
            </EntryBox>
        )
    }
}
