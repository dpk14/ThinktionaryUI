import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {_scale, invScale} from "./utils/scaling";
import {Override} from "./utils/defaultHandling";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {ABSTRACT_METHOD} from "./utils/abstraction";
import EntryBox from "./EntryBox";
const MULTILINE_TOPMARGIN_ADJUSTER = 4

export default class StyledInput extends EntryBox {

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.parallel([
                Animated.timing(this.position, {
                    toValue: 1,
                    duration: 200,
                }),
                Animated.timing(this.shadow, {
                    toValue: 1,
                    duration: 300,
                })
            ]).start()
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            this._animateBlur()
        }
    }

    _animateBlur(){
        Animated.parallel([
            Animated.timing(this.position, {
                toValue: 0,
                duration: 200,
            }),
            Animated.timing(this.shadow, {
                toValue: 0,
                duration: 300,
            })
        ]).start()
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _onKeyPress = ABSTRACT_METHOD
    _onSubmitEditing = ABSTRACT_METHOD

    _returnAnimatedInputStyles = () => {
        const { isFieldActive } = this.state;
        const {
            textInputActiveMargins, textInputInactiveMargins, scale
        } = this.props;

        let marginTop = _scale(isFieldActive ? textInputActiveMargins.marginTop : textInputInactiveMargins.marginTop, scale)

        return {
            marginTop : this.props.multiline ? MULTILINE_TOPMARGIN_ADJUSTER*marginTop : marginTop,
            marginBottom : invScale(isFieldActive ? textInputActiveMargins.marginBottom : textInputInactiveMargins.marginBottom, scale),
            fontSize : _scale(this.props.fontSize, scale),
            marginLeft: _scale(this.props.textMarginLeft, scale),
            marginRight : _scale(this.props.textMarginRight, scale),
            paddingRight : _scale(this.props.textMarginRight, scale)*1.5,
            borderRadius : _scale(this.props.borderRadius, scale),
            height : _scale(this.props.height, scale),
        }
    }

    renderBody() {
            return () => (<TextInput
                multiline = {this.props.multiline}
                returnKeyType = {this.props.returnKeyType}
                blurOnSubmit = {this.props.blurOnSubmit}
                value={this.props.value}
                style={[Styles.textInput, this._returnAnimatedInputStyles()]}
                underlineColorAndroid='transparent'
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                onChangeText={this._onChangeText}
                keyboardType={this.props.keyboardType}
                {...this.props.otherTextInputProps}
                onKeyPress = {Override(this.props,'onKeyPress', this._onKeyPress) }
                onSubmitEditing = {Override(this.props,'onSubmitEditing', this._onSubmitEditing) }
                autoCompletType = {false}
            />)
        }

}

export const Styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor : "white",
        shadowOffset: { height: 4},
        shadowRadius: 20,
    },
    textInput: {
        fontWeight: '400',
        fontFamily: HP_SIMPLIFIED,
        color: '#282828',
        width: '100%',
        height: 65,
        position: 'relative',
        borderRadius: 20,
        opacity: .9
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontWeight: '300',
        lineHeight: 24,
    }

})
