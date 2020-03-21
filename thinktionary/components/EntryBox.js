import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {ABSTRACT_METHOD, HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../configStrings";
import {_scale, invScale} from "./utils/scaling";
import {AbstractClassError, AbstractMethodError} from "./errors/AbstractError";
import {Override} from "./utils/defaultHandling";
const MULTILINE_TOPMARGIN_ADJUSTER = 4

export default class EntryBox extends Component {
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
        onKeyPress : ()=>{}
    }

    constructor(props) {
        super(props);
        const { value } = this.props;
        this.position = new Animated.Value(value ? 1 : 0);
        this.shadow = new Animated.Value(value ? 1 : 0);
        this.state = {
            loading : true,
            isFieldActive: false,
        }
        this.state.textLeftOffset = 0;
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../assets/fonts/hp-simplified.ttf'),
        });
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
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _onKeyPress = ABSTRACT_METHOD
    _onSubmitEditing = ABSTRACT_METHOD

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize, scale
        } = this.props;

        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [_scale(20, scale), _scale(4, scale)],
            }),
            fontSize: _scale(isFieldActive ? titleActiveSize : titleInActiveSize, scale),
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
            marginLeft: _scale(this.props.textMarginLeft, scale),
            marginRight: _scale(this.props.textMarginRight, scale),
        }
    }

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
            marginLeft: _scale(this.props.textMarginLeft, scale) + this.state.textLeftOffset,
            marginRight : _scale(this.props.textMarginRight, scale),
            paddingRight : _scale(this.props.textMarginRight, scale)*1.5,
            borderRadius : _scale(this.props.borderRadius, scale),
            height : _scale(this.props.height, scale),
        }
    }

    _returnAnimatedContainerStyles = () => {
        const {scale} = this.props
        return {
            opacity: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [.3, .9]}
            ),
            shadowOpacity: this.shadow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, .2]}
            ),
            marginRight : this.props.marginRight,
            marginLeft : this.props.marginLeft,
            marginVertical : this.props.marginVertical,
            width : _scale(this.props.width, scale),
            height : _scale(this.props.height, scale),
            borderRadius : _scale(this.props.borderRadius, scale)
        }
    }

    renderTextInput(){
        return (<TextInput
            multiline = {this.props.multiline}
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
        />)
    }

    render() {
        const StyledTextInput = this.renderTextInput()
        if (!this.loading) {
            return (
                <Animated.View style={[Styles.container, this._returnAnimatedContainerStyles()]}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                    {StyledTextInput}
                </Animated.View>
            )
        }
        else return null;
    }
}

export const Styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        position: 'relative',
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
