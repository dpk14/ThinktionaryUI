import {bool} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
import TopicContainer from "./TopicContainer";
import React, { Component } from 'react';

export class TopicCreatorBox extends Component {
    static propTypes = {...TopicContainer.propTypes, ...{alwaysActive: bool}}
    static defaultProps = {...TopicContainer.defaultProps, ...{alwaysActive: false}}

    constructor(props) {
        super(props);
    }

    render() {
        const {
            title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, topicScale, editable, alwaysActive, topics, setName
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={height}
                          alwaysActive={alwaysActive}
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
                >
                    <StyledTextInput multiline={multiline}
                                     attrName={attrName}
                                     returnKeyType={returnKeyType}
                                     blurOnSubmit={blurOnSubmit}
                                     value={value}
                                     keyboardType={keyboardType}
                                     autoCompletType={false}
                                     updateMasterState={updateMasterState}
                                     height="100%"
                                     scale={scale}
                                     editable={editable}
                                     //active={this.props.topics.size > 0}
                                     style={{position: 'absolute', top: 0, left: -10}}
                    />
                </TopicContainer>
            </EntryBox>
        )
    }
}
