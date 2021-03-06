import {bool} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput/StyledTextInput";
import TopicContainer from "./TopicContainer";
import React, { Component } from 'react';

export class TopicCreatorBox extends Component {
    static propTypes = {...TopicContainer.propTypes, ...{active: bool}}
    static defaultProps = {...TopicContainer.defaultProps, ...{active: false}}

    constructor(props) {
        super(props);
    }

    render() {
        const {
            title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit, onTopicPress,
            value, keyboardType, updateMasterState, topicScale, editable, topics, setName, active, onTopicDelete, reset
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
                                topics={topics}
                                onTopicDelete={onTopicDelete}
                                onTopicPress={onTopicPress}
                >
                    <StyledTextInput multiline={multiline}
                                     attrName={attrName}
                                     returnKeyType={returnKeyType}
                                     blurOnSubmit={blurOnSubmit}
                                     value={value}
                                     keyboardType={keyboardType}
                                     autoCompleteType={false}
                                     updateMasterState={updateMasterState}
                                     height="100%"
                                     scale={scale}
                                     editable={editable}
                                     style={{position: 'absolute', top: 0, left: -10}}
                    />
                </TopicContainer>
            </EntryBox>
        )
    }
}
