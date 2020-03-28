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

export default class StyledTextInput extends Component {
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        textInputInactiveMargins : object,
        textInputActiveMargins : object,
        textInputStyles: object,
        otherTextInputProps: object,
        marginRight : number,
        marginLeft : number,
        marginVertical : number,
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
    }

    static defaultProps = {
        borderRadius: 20,
        textMarginLeft : 21,
        textMarginRight : 21,
        fontSize: 20,
        scale : 1,
        height : 65,
        width : 275,
        marginRight : 0,
        marginLeft : 0,
        marginVertical : 6,
        keyboardType: 'default',
        titleActiveSize: 13,
        titleInActiveSize: 15,
        titleActiveColor: '#512da8',
        titleInactiveColor: 'black',
        textInputInactiveMargins: {
            marginTop : 0,
            marginBottom : 0,
        },
        textInputActiveMargins: {
            marginTop : 6,
            marginBottom : 8,
        },
        textInputStyles : {},
        otherTextInputAttributes: {},
        multiline : false,
        onSubmitEditing : ()=> {},
        onKeyPress : ()=>{},
        blurOnSubmit : true,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            isFieldActive: false,
        }
        this.position = new Animated.Value(this.state.isFieldActive? 1 : 0);
        this.shadow = new Animated.Value(this.state.isFieldActive ? 1 : 0);
        this.state.textLeftOffset = 0;
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

    render() {return (<TextInput
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

export class StyledInputBox extends Component{
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        textInputInactiveMargins : object,
        textInputActiveMargins : object,
        textInputStyles: object,
        otherTextInputProps: object,
        marginRight : number,
        marginLeft : number,
        marginVertical : number,
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
    }

    static defaultProps = {
        borderRadius: 20,
        textMarginLeft : 21,
        textMarginRight : 21,
        fontSize: 20,
        scale : 1,
        height : 65,
        width : 275,
        marginRight : 0,
        marginLeft : 0,
        marginVertical : 6,
        keyboardType: 'default',
        titleActiveSize: 13,
        titleInActiveSize: 15,
        titleActiveColor: '#512da8',
        titleInactiveColor: 'black',
        textInputInactiveMargins: {
            marginTop : 0,
            marginBottom : 0,
        },
        textInputActiveMargins: {
            marginTop : 6,
            marginBottom : 8,
        },
        textInputStyles : {},
        otherTextInputAttributes: {},
        multiline : false,
        onSubmitEditing : ()=> {},
        onKeyPress : ()=>{},
        blurOnSubmit : true,
    }

    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.value)
        return (<EntryBox title={this.props.title}
                          scale={this.props.scale}>
                <StyledTextInput                 multiline = {this.props.multiline}
                                                 attrName={this.props.attrName}
                                                 returnKeyType = {this.props.returnKeyType}
                                                 blurOnSubmit = {this.props.blurOnSubmit}
                                                 value={this.props.value}
                                                 keyboardType={this.props.keyboardType}
                                                 autoCompletType = {false}
                                                    updateMasterState={this.props.updateMasterState}/>
            </EntryBox>
        )
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
