import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {_scale, invScale} from "../utils/scaling";
import {Override, setOrDefault} from "../utils/defaultHandling";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {ABSTRACT_METHOD} from "../utils/abstraction";
import EntryBox from "./EntryBox";
const MULTILINE_TOPMARGIN_ADJUSTER = -1

export default class StyledTextInput extends Component {
    static propTypes = {
        attrName: string.isRequired,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        textInputInactiveMargins : object,
        textInputActiveMargins : object,
        textInputStyles: object,
        otherTextInputProps: object,
        width : number | string,
        height : number,
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
    }

    static defaultProps = {
        secureTextEntry : false,
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
            isFieldActive: this.props.active ? true : false,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            this.props.updateContainerState(true)
            //this._animateFocus()
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            this.props.updateContainerState(false)
            //this._animateBlur()
        }
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _onKeyPress = () => {}
    _onSubmitEditing = () => {}

    _returnAnimatedInputStyles = () => {
        const { isFieldActive } = this.state;
        const {
            textInputActiveMargins, textInputInactiveMargins, scale
        } = this.props;

        let marginTop = _scale(isFieldActive ? textInputActiveMargins.marginTop : textInputInactiveMargins.marginTop, scale)

        return {
            marginTop : this.props.multiline ? MULTILINE_TOPMARGIN_ADJUSTER*marginTop : marginTop,
            fontSize : _scale(this.props.fontSize, scale),
            marginLeft: _scale(this.props.textMarginLeft, scale),
            marginRight : _scale(this.props.textMarginRight, scale),
            paddingRight : _scale(this.props.textMarginRight, scale)*1.5,
            borderRadius : _scale(this.props.borderRadius, scale),
            height : _scale(this.props.height, scale),
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
                autoCompletType = {false}
                />)

            }

}

export class StyledInputBox extends Component{
    static propTypes = StyledTextInput.propTypes
    static defaultProps = StyledTextInput.defaultProps

    constructor(props) {
        super(props);
    }
    render() {
        const {title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
                value, keyboardType, updateMasterState, secureTextEntry, editable}  = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width = {width}
                          height = {height}
                        >
                <StyledTextInput                 multiline = {multiline}
                                                 attrName={attrName}
                                                 returnKeyType = {returnKeyType}
                                                 blurOnSubmit = {blurOnSubmit}
                                                 value={value}
                                                 keyboardType={keyboardType}
                                                 autoCompletType = {false}
                                                 updateMasterState={updateMasterState}
                                                 width = {width}
                                                 height = "100%"
                                                 scale = {scale}
                                                secureTextEntry={secureTextEntry}
                                                editable={editable}/>
            </EntryBox>
        )
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
        opacity: .9
    },

})
