import {bool} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
import JournalContainer from "./JournalContainer";
import React, { Component } from 'react';

export class JournalContainerBox extends Component {
    static propTypes = {...JournalContainer.propTypes, ...{active: bool}}
    static defaultProps = {...JournalContainer.defaultProps, ...{active: false}}

    constructor(props) {
        super(props);
    }

    render() {
        const {
            title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, topicScale, editable, topics, setName, active, onTopicDelete,
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={height}
                          active={active}
            >
                <JournalContainer
                    attrName={attrName}
                    setName={setName}
                    value={value}
                    updateMasterState={updateMasterState}
                    width={width}
                    height="100%"
                    topicScale={topicScale}
                    topics={topics}
                    onTopicDelete={onTopicDelete}
                >
                </JournalContainer>
            </EntryBox>
        )
    }
}
