import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text, Keyboard } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "../TextInputBox/StyledTextInput";
import CustomButton from "../../CustomButton";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import {childrenWithProps} from "../../utils/general";
import EntryHeader from "./EntryHeader";
import EntryBox from "../EntryBox";
import {_scale} from "../../../DONT_USE_THIS/thinktionary/components/utils/scaling";

export default class JournalContainer extends Component {

    static propTypes  = {
        journal : object.isRequired,
        entries : object.isRequired,
        navigation : object.isRequired,
        width : number,
        height : number,
        scale : number,
    }

    static defaultProps = {
        scale : 1,
        width : 360,
        height : 600,
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

    _outerDimensions = () => {
        let {width, height, scale} = this.props
        return {
            width : _scale(width, scale),
            height : _scale(height, scale)
        }
    }

    render() {
        let {entryIndex} = this.state
        let {navigation, journal, scale} = this.props
        let currentEntry = this.entries[entryIndex]
        return (
            <View style={[journalContainerStyles.outerFrame, this._outerDimensions()]}>
                <EntryHeader>
                    title = {currentEntry.title},
                    created = {currentEntry.created},
                    modified = {currentEntry.modified}
                    navigation = {navigation}
                    entry = {currentEntry}
                    journal = {journal}
                    width = {'100%'},
                    height = {'15%'},
                    scale = {_scale(.8, scale)},
                </EntryHeader>
                <StyledTextInput
                     multiline = {true}
                     attrName = {''}
                     value = {currentEntry.text}
                     updateMasterState = {()=>{}}
                     width = {'100%'}
                     height = {'75%'}
                     scale = {_scale(.8, scale)}
                     editable = {false}
                />
                <View style={journalContainerStyles.bottomFrame}>
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
    },
    bottomFrame:{
        width : '15%',
        justifyContent : 'center',
    }

})
