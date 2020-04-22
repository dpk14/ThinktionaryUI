import {bool, string} from "prop-types";
import EntryBox from "../EntryBox";
import StyledTextInput from "../TextInputBox/StyledTextInput";
import JournalContainer from "./JournalContainer";
import React, { Component } from 'react';

export class JournalContainerBox extends Component {
    static propTypes = {...JournalContainer.propTypes, ...{active: bool, attrName: string, value : string}}
    static defaultProps = {...JournalContainer.defaultProps, ...{active: false, attrName : '', value : ''}}

    constructor(props) {
        super(props);
    }

    render() {
        const {
            title, scale, width, height, active, journal, entries, navigation,
            style,
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={style.flex == undefined ? width : '100%' }
                          height={style.flex == undefined ? height : '100%'}
                          active={active}
                          style={style}
            >
                <JournalContainer
                    width = {"100%"}
                    height = {"100%"}
                    style = {{flex : 1}}
                    scale = {1}
                    journal = {journal}
                    entries = {entries}
                    navigation = {navigation}
                />
            </EntryBox>
        )
    }
}
