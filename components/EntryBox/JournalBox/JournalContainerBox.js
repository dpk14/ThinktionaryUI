import {bool, string} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput/StyledTextInput";
import JournalContainer from "./JournalContainer";
import React, { Component } from 'react';
import {_scale} from "../../utils/scaling";

export class JournalContainerBox extends Component {
    static propTypes = {...JournalContainer.propTypes, ...{active: bool, attrName: string, value : string}}
    static defaultProps = {...JournalContainer.defaultProps, ...{active: false, attrName : '', value : ''}}

    constructor(props) {
        super(props);
    }

    getJournalContainerHeight(style, scale){
        let top_margin = _scale(EntryBox.defaultProps.titleActivePos + EntryBox.defaultProps.titleActiveSize, scale)

        if (style.flex == undefined && style.height != undefined){
            return style.height - top_margin
        }
            else return "100%"
    }

    render() {
        const {
            title, scale, width, active, journal, entries, navigation,
            style, onEntryRemoval, value, clearRichText, updateMasterState, entryIndex, currentEntry
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={style.flex == undefined ? style.height != undefined ? style.height : '100%' : undefined}
                          active={active}
                          style={style}
                          value={value}
            >
                <JournalContainer
                    width = {"100%"}
                    height = {"100%"}
                    scale = {scale}
                    journal = {journal}
                    entries = {entries}
                    navigation = {navigation}
                    onEntryRemoval = {onEntryRemoval}
                    clearRichText = {clearRichText}
                    updateMasterState={updateMasterState}
                    entryIndex={entryIndex}
                    currentEntry={currentEntry}
                    lastLength={this.props.lastLength}
                />
            </EntryBox>
        )
    }
}
