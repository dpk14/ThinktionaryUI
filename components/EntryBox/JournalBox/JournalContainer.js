import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text, Keyboard } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "../TextInputBox/StyledTextInput";
import CustomButton from "../../CustomButton";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import {childrenWithProps} from "../../utils/general";
import EntryHeader from "./EntryHeader";

export default class JournalContainer extends Component {

    static defaultProps  = {
        journal : object.isRequired,
        entries : object.isRequired,
    }

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.entries = Array.from(props.entries)
        this.state = {
            loading: true,
            textLeftOffset: 0,
            entryIndex : 0,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    render() {
        let {entryIndex, entries} = this.state
        let {navigation, journal, entry} = this.props
        let currentEntry = entries(entryIndex)
        return (
            <View style={journalContainerStyles.outerFrame}>
                <EntryHeader>
                    title = {currentEntry.title},
                    created = {currentEntry.created},
                    modified = {currentEntry.created}
                    navigation : {navigation}
                    entry : {entry}
                    journal : {journal}
                    width : {'100%'},
                    height : {'15%'},
                    scale : {.8},
                </EntryHeader>
                <View style={journalContainerStyles.middleFrame}>
                    <ScrollView
                        contentContainerStyle = {{flexGrow : 1}}
                        style = {{height : '100%', width : '100%',
                            marginHorizontal: 10,
                            marginVertical: 10,
                            borderRadius : 10}}
                    >
                        <View style={[addStyles.scrollView]}>
                            {TopicBoxes}
                            <View style = {{ flex : 1 }} >
                                {children}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const journalContainerStyles = StyleSheet.create({
    outerFrame : {
        flex : 1
    },
    middleFrame:{
        height : '70%',
        width : '100%'
    }

})
