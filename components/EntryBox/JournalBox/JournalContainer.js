import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, ScrollView, Text, Keyboard } from 'react-native';
import { string, func, object, number, bool, PropTypes } from 'prop-types';
import StyledTextInput, {Styles} from "../TextInputBox/StyledTextInput";
import CustomButton from "../../Buttons/CustomButton";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
const MULTILINE_TOPMARGIN_ADJUSTER = 4
import {childrenWithProps} from "../../utils/general";
import EntryHeader from "./EntryHeader";
import EntryBox from "../EntryBox";
import {_scale} from "../../utils/scaling";
import RightLeftNavigator from "../../Buttons/RightLeftNavigator";

export default class JournalContainer extends Component {

    static propTypes  = {
        journal : object.isRequired,
        entries : object.isRequired,
        navigation : object.isRequired,
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
        this.state = {
            loading: true,
            textLeftOffset: 0,
            lastLength : entries.length,
            entryIndex : entries.length == 0 ? 0 : entries.length-1,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let {lastLength} = this.state
        let entries = Array.from(nextProps.entries)
        if (entries.length != lastLength) {
            this.setState({lastLength : entries.length, entryIndex : entries.length == 0 ? 0 : entries.length-1})
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
        if(entryIndex > 0){
            this.setState({entryIndex : entryIndex-1})
        }

    }

    _pageLeft = () => {
        let {entryIndex} = this.state
        if( entryIndex < Array.from(this.props.entries).length - 1){
            this.setState({entryIndex : entryIndex+1})
        }
    }

    render() {
        let entries = Array.from(this.props.entries)
        let {entryIndex} = this.state
        let {navigation, journal, scale, style} = this.props
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
                    style = {{flex : .20}}
                    width = '100%'
                    scale = {_scale(.8, scale)}
                />
                <View style = {{flex : .68}}>
                <StyledTextInput
                    multiline = {true}
                    attrName = {''}
                    value = {currentEntry.text}
                    updateMasterState = {()=>{}}
                    width={"100%"}
                    height={"100%"}
                    style = {{marginTop : 5}}
                    scale = {_scale(.8, scale)}
                    editable = {false}
                />
                </View>
                    <View style={journalContainerStyles.bottomFrame}>
                    <RightLeftNavigator onLeftPress={this._pageLeft}
                                        onRightPress={this._pageRight}
                                        width={200}
                                        height={40}
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
        marginVertical : 15
    },
    middleFrame:{
        //height : '75%',
        width : '100%'
    },
    bottomFrame:{
        //width: '100%',
        flex : .1,
        //justifyContent : 'center',
        alignItems : 'center'
    }

})
