import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text, Keyboard } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "../TextInputBox/StyledTextInput/StyledTextInput";
import CustomButton from "../../Buttons/CustomButton";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import {childrenWithProps} from "../../utils/general";
import EntryHeader from "./EntryHeader";
import EntryBox from "../EntryBox";
import {_scale} from "../../utils/scaling";
import RightLeftNavigator from "../../Buttons/RightLeftNavigator";
import {ENTRY_BOX_HEIGHT} from "../../utils/baseStyles";
import RichEditorInput from "../TextInputBox/RichTextInput/RichEditorInput";

const TEXT_BOX_SCALE = .8
const NAVIGATOR_HEIGHT = 40
const MARGIN_VERTICAL = 15
const SCALE =  .8

export default class JournalContainer extends Component {

    static propTypes  = {
        journal : object.isRequired,
        entries : object.isRequired,
        navigation : object.isRequired,
        onEntryRemoval : func.isRequired,
        style : object,
        width : number,
        height : number,
        scale : number,
    }

    static defaultProps = {
        style : {},
        scale : 1,
        width : 360,
        height : 600,
    };

    constructor(props) {
        super(props);
        let entries = Array.from(props.entries)
        let entryIndex = entries.length == 0 ? 0 : entries.length-1
        this.state = {
            loading: true,
            textLeftOffset: 0,
            lastLength : entries.length,
            entryIndex : entryIndex,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let {lastLength} = this.state
        let {active, updateContainerState} = this.props
        let entries = Array.from(nextProps.entries)
        if (entries.length != lastLength) {
            this.setState({lastLength : entries.length,
                                entryIndex : entries.length == 0 ? 0 : entries.length-1})
            if(entries.length == 0 && active) updateContainerState(false)
            else if (entries.length > 0 && !active) updateContainerState(true)
            return false;
        }
        return true;
    }

    _outerDimensions = () => {
        let {width, height, scale} = this.props
        return {
            width : _scale(width, scale),
            height : _scale(height, scale)
        }
    }

    _pageRight = () => {
        let {entryIndex} = this.state
        if (entryIndex > 0){
            this.setState({entryIndex : entryIndex - 1})
        }

    }

    _pageLeft = () => {
        let {entryIndex} = this.state
        if(entryIndex < Array.from(this.props.entries).length - 1){
            this.setState({entryIndex : entryIndex + 1})
        }
    }


    /*
    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.entryIndex && prevState.entryIndex != this.state.entryIndex)) {
            this.state.richTextEditor.setContentHTML(Array.from(this.props.entries)[this.state.entryIndex].text)
        }
    }

     */

    getTextInputHeight(){
        let ttl_height = this.props.style.height == undefined ? this.props.height : this.props.style.height
        return ttl_height - ENTRY_BOX_HEIGHT - EntryHeader.calculateEntryHeaderHeight()
    }

    updateRichTextEditor = (richTextEditor) => {
        if (richTextEditor != this.state.richTextEditor) {
            this.setState({richTextEditor: richTextEditor})
        }
    }

    render() {
        let entries = Array.from(this.props.entries)
        let {entryIndex} = this.state
        let {navigation, journal, scale, style, onEntryRemoval} = this.props
        if (entries.length == 0) return (<View/>)
        let currentEntry = entries[entryIndex]

        return(
            <View style={[journalContainerStyles.outerFrame, this._outerDimensions(), style]}>
                <EntryHeader
                    title = {currentEntry.title}
                    created = {currentEntry.created}
                    modified = {currentEntry.modified}
                    navigation = {navigation}
                    entry = {currentEntry}
                    journal = {journal}
                    width = '100%'
                    scale = {_scale(scale, SCALE)}
                    onEntryRemoval = {onEntryRemoval}
                />
                <View style = {{height : this.getTextInputHeight()}}>
                    <RichEditorInput
                        multiline={true}
                        attrName={''}
                        value={currentEntry.text}
                        updateMasterState={() => {
                        }}
                        style={{marginTop: 5, height: this.getTextInputHeight()}}
                        scale={_scale(TEXT_BOX_SCALE, scale)}
                        editable={false}
                        updateRichTextEditor={this.updateRichTextEditor}/>
                </View>
                    <View style={journalContainerStyles.bottomFrame}>
                    <RightLeftNavigator onLeftPress={this._pageLeft}
                                        onRightPress={this._pageRight}
                                        style={{flex : 1, marginTop: 5}}
                                        height={NAVIGATOR_HEIGHT}
                                        minimum={1}
                                        maximum={entries.length}
                                        current={entries.length - this.state.entryIndex}
                                        />
                </View>
            </View>
        )
    }
}

const journalContainerStyles = StyleSheet.create({
    outerFrame : {
        flex : 1,
        marginVertical : 15,
        justifyContent : 'space-between'
    },
    middleFrame:{
        width : '100%'
    },
    bottomFrame:{
        height : ENTRY_BOX_HEIGHT,
        alignItems : 'center',
        marginBottom: 15
    }

})
