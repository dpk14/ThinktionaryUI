import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {_scale, invScale, scalePercentage} from "../../utils/scaling";
import {Override, setOrDefault} from "../../utils/defaultHandling";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {ABSTRACT_METHOD} from "../../utils/abstraction";
import EntryBox from "../EntryBox";
const MULTILINE_TOPMARGIN_ADJUSTER = 1

export default class StyledTextInput extends Component {
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
    }

    static defaultProps = {
        secureTextEntry : false,
        style : {},
        borderRadius: 20,
        textMarginLeft: 21,
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
            loading : true,
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
    }

    _handleBlur = () => {
        if (!this.props.value) {
            this.props.updateContainerState(false)
        }
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

        let marginTop = _scale(active ? textInputActiveMargins.marginTop : textInputInactiveMargins.marginTop, scale)

        return {
            marginVertical : multiline ? _scale(10, scale) + marginTop : marginTop,
            //marginBottom : 20,//multiline ? _scale(100, scale) : marginTop,
            fontSize : _scale(this.props.fontSize, scale),
            marginLeft: _scale(this.props.textMarginLeft, scale),
            marginRight : _scale(this.props.textMarginRight, scale),
            paddingRight : _scale(this.props.textMarginRight, scale)*1.5,
            borderRadius : _scale(this.props.borderRadius, scale),
            height : typeof this.props.height === 'string' ? scalePercentage(this.props.height, .93) : _scale(this.props.height, scale)*(.93),
        }
    }

    render() {
            const{secureTextEntry, multiline, returnKeyType, blurOnSubmit, value, style,
                 onFocus, onBlur, keyboardType, onKeyPress, onSubmitEditing, editable} = this.props
                return (<TextInput
                    editable = {editable}
                    secureTextEntry = {secureTextEntry}
                    multiline = {multiline}
                    returnKeyType = {returnKeyType}
                    blurOnSubmit = {blurOnSubmit}
                    value={value}
                    style={[TextInputStyles.baseStyles, this._returnAnimatedInputStyles(), style]}
                    underlineColorAndroid='transparent'
                    onFocus={setOrDefault(onFocus, StyledTextInput.defaultProps.onFocus, this._handleFocus)}
                    onBlur={setOrDefault(onBlur, StyledTextInput.defaultProps.onBlur, this._handleBlur)}
                    onChangeText={this._onChangeText}
                    keyboardType={keyboardType}
                {...this.props.otherTextInputProps}
                    onKeyPress = {setOrDefault(onKeyPress, StyledTextInput.defaultProps.onKeyPress, this._onKeyPress)}
                    onSubmitEditing = {setOrDefault(onSubmitEditing, StyledTextInput.defaultProps.onSubmitEditing, this._onSubmitEditing) }
                    autoCorrect = {false}
                    spellCheck = {true}
                />)
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
        flexWrap : "wrap",
    },

})
