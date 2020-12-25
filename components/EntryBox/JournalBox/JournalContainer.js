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
import {ENTRY_BOX_HEIGHT, NAVIGATOR_HEIGHT} from "../../utils/baseStyles";
import RichEditorInput from "../TextInputBox/RichTextInput/RichEditorInput";
import ReadScreen from "../../screens/base/JournalScreens/ReadScreen";

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
            textLeftOffset: 0
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

    _pageRight = () => {
        let {entryIndex, updateMasterState} = this.props
        if (entryIndex > 0){
            updateMasterState('entryIndex' , entryIndex - 1)
        }

    }

    _pageLeft = () => {
        let {entryIndex, updateMasterState} = this.props
        if(entryIndex < Array.from(this.props.entries).length - 1){
            updateMasterState('entryIndex' , entryIndex + 1)
        }
    }


    /*
    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.entryIndex && prevState.entryIndex != this.state.entryIndex)) {
            this.state.richTextEditor.setContentHTML(Array.from(this.props.entries)[this.state.entryIndex].text)
        }
    }

     */

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let {lastLength, active, updateContainerState} = this.props
        if (nextProps.entries.size != lastLength) {
            if(nextProps.entries.size == 0 && active) updateContainerState(false)
            else if (nextProps.entries.size > 0 && !active) updateContainerState(true)
            //return false;
        }
        return true;
    }

    getTextInputHeight(){
        let ttl_height = this.props.style.height == undefined ? this.props.height : this.props.style.height
        return ttl_height
    }

    updateRichTextEditor = (richTextEditor) => {
        if (richTextEditor != this.state.richTextEditor) {
            this.setState({richTextEditor: richTextEditor})
        }
    }

    render() {
        let {navigation, journal, scale, style, onEntryRemoval, entryIndex, entries, currentEntry} = this.props
        if (entries.size == 0 || !currentEntry) return (<View/>)
        return(
            <View style={[journalContainerStyles.outerFrame, this._outerDimensions(), style]}>
                    <RichEditorInput
                        multiline={true}
                        attrName={''}
                        value={currentEntry.text}
                        updateMasterState={() => {
                        }}
                        style={{height: '107.5%', marginTop: 7}}
                        scale={scale}
                        editable={false}
                        updateRichTextEditor={this.updateRichTextEditor}/>
                    <RightLeftNavigator onLeftPress={this._pageLeft}
                                        onRightPress={this._pageRight}
                                        style={{flex : 1, position : 'absolute', top : _scale(ReadScreen.getJournalContainerHeight(), scale) + (NAVIGATOR_HEIGHT / 2)}}
                                        height={NAVIGATOR_HEIGHT}
                                        minimum={1}
                                        maximum={entries.size}
                                        current={entries.size - entryIndex}
                                        />
            </View>
        )
    }
}

const journalContainerStyles = StyleSheet.create({
    outerFrame : {
        flex : 1,
        //marginVertical : 15,
        alignItems: 'center'
        //justifyContent : 'space-between'
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
