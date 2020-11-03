import {bool, string} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
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
            style, onEntryRemoval, value
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
                    style = {{height : this.getJournalContainerHeight(style, scale) -
                        _scale(EntryBox.defaultProps.titleActivePos
                        + EntryBox.defaultProps.titleActiveSize, scale)}}
                    scale = {1}
                    journal = {journal}
                    entries = {entries}
                    navigation = {navigation}
                    onEntryRemoval = {onEntryRemoval}
                />
            </EntryBox>
        )
    }
}
