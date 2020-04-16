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
            title, scale, width, height, active, journal, entries, navigation,
        }
            = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={height}
                          active={active}
            >
                <JournalContainer
                    width="100%"
                    height="100%"
                    scale = {1}
                    journal = {journal}
                    entries = {entries}
                    navigation = {navigation}
                />
            </EntryBox>
        )
    }
}
