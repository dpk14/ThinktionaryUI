import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput, ScrollView } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {_scale, invScale, scalePercentage} from "../../utils/scaling";
import {Override, setOrDefault} from "../../utils/defaultHandling";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {ABSTRACT_METHOD} from "../../utils/abstraction";
import EntryBox from "../EntryBox";
import RichToolbar from "react-native-pell-rich-editor/src/RichToolbar";
import RichEditor from "react-native-pell-rich-editor/src/RichEditor";
import {ORANGE} from "../../utils/baseStyles";

let font = "https://drive.google.com/file/d/1o9xwKQLlcEKup-PTRGGWJuFqrjiksCqY/view?usp=sharing"

export default class RichEditorInput extends Component {
    static propTypes = {
        attrName: string.isRequired,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        textInputInactiveMargins : object,
        textInputActiveMargins : object,
        textInputStyles: object,
        style : object,
        otherTextInputProps: object,
        width : number | string,
        height : number | string,
        scale : number,
        fontSize: number,
        textMarginLeft : number,
        textMarginRight : number,
        borderRadius : number,
        multiline : bool,
        onSubmitEditing : func,
        onKeyPress : func,
        blurOnSubmit : bool,
        returnKeyType : string,
        updateContainerState : func,
        onBlur : func,
        onFocus : func,
        secureTextEntry : bool,
        editable : bool,
        active : bool,
        onChangeText : func,
        autoCorrect : bool
    }

    static defaultProps = {
        autoCorrect : false,
        secureTextEntry : false,
        style : {},
        borderRadius: 20,
        textMarginLeft: 7,
        textMarginRight: 21,
        fontSize: 20,
        scale: 1,
        height: 65,
        width: 275,
        marginRight: 0,
        marginLeft: 0,
        keyboardType: 'default',
        textInputInactiveMargins: {
            marginTop: 0,
            marginBottom: 0,
        },
        textInputActiveMargins: {
            marginTop: 0,
            marginBottom: 0,
        },
        textInputStyles: {},
        otherTextInputAttributes: {},
        multiline: false,
        onSubmitEditing: () => {
        },
        onKeyPress: () => {
        },
        onChangeText: () => {},
        blurOnSubmit: true,
        updateContainerState: () => {},
        onFocus: () => {},
        onBlur: () => {},
        editable : true,
        active : false,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState, onChangeText} = this.props;
        updateMasterState(attrName, updatedValue);
        onChangeText(updatedValue)
    }

    _handleFocus = () => {
        this.props.updateContainerState(true)
        this.props.updateRichTextEditor(this.state.richTextEditor)
    }

    _handleBlur = () => {
        if (!this.props.value) {
            this.props.updateContainerState(false)
        }
        this.props.updateRichTextEditor(undefined)
    }

    /*
        componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.active != this.props.active) {
                if (this.props.active)
            }
        }
    */

    _onKeyPress = () => {}
    _onSubmitEditing = () => {}

    _returnAnimatedInputStyles = () => {
        const {
            textInputActiveMargins, textInputInactiveMargins, scale, active, multiline
        } = this.props;

        let marginTop = _scale(active ? textInputActiveMargins.marginTop + (this.props.fontSize / 2): textInputInactiveMargins.marginTop + 45, scale)
        return {
            marginTop : marginTop,
            //marginBottom : 20,//multiline ? _scale(100, scale) : marginTop,
            //marginTop : marginTop,
            fontSize : _scale(this.props.fontSize, scale),
            marginLeft: _scale(this.props.textMarginLeft, scale),
            //marginRight : _scale(this.props.textMarginRight, scale),
            paddingRight : _scale(this.props.textMarginRight, scale)*1.5,
            borderRadius : _scale(this.props.borderRadius, scale),
            height : typeof this.props.height === 'string' ? scalePercentage(this.props.height, .90) : _scale(this.props.height, scale)*(.90) - marginTop,
        }
    }

    render() {
        const{secureTextEntry, multiline, returnKeyType, blurOnSubmit, value, style,
            onFocus, onBlur, keyboardType, onKeyPress, onSubmitEditing, editable, autoCorrect} = this.props
        return (<View style = {[TextInputStyles.baseStyles, this._returnAnimatedInputStyles(), style]}>
            <ScrollView
                contentContainerStyle = {{flexGrow : 1}}
                //keyboardShouldPersistTaps = {'handled'}
                style = {{height : '100%', width : '100%'}}>
            <RichEditor
                ref={(r) => {
                    if (!this.state.richTextEditor) {
                        this.setState({richTextEditor: r})
                    }
                }}
                initialContentHTML = {value}
                initialHeight = "100%"
                scrollEnabled = 'true'
                useContainer='true'
                editorStyle = {{
                    fontFamily: HP_SIMPLIFIED_BOLD,
                    cssText: "@font-face{ font-family: HP Simplified; src: url('" + font + "'); } div{font-family: Arial; color: #282828; font-size: " + _scale(this.props.fontSize, this.props.scale) + "px;}"}}
                onFocus={setOrDefault(onFocus, RichEditorInput.defaultProps.onFocus, this._handleFocus)}
                onBlur={setOrDefault(onBlur, RichEditorInput.defaultProps.onBlur, this._handleBlur)}
                onChange={this._onChangeText}
            />
            </ScrollView>
        </View>)
    }
}

export const TextInputStyles = StyleSheet.create({
    baseStyles: {
        fontWeight: '400',
        fontFamily: HP_SIMPLIFIED,
        color: '#282828',
        width: '100%',
        height: 65,
        position: 'relative',
        borderRadius: 20,
        opacity: .9,
        //flexWrap : "wrap",
        flexDirection : "column"
    },

})
