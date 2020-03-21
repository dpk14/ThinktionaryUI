import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../configStrings";
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
        onSubmitEditing : ()=> {return null}
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

    scale(prop){
        if(typeof prop == "string" && prop.includes("%")){
            return this.scalePercentage(prop, this.props.scale)
        }
        return(prop*this.props.scale)
    }

    invScale(prop){
        return(prop*(1/this.props.scale))
    }

    scalePercentage(percentage, scale){
        let scaledInt = parseInt((this.props.width.substring(0, this.props.width.length-1)))*scale;
        return (scaledInt > 100 ? 100 : scaledInt) + "%"
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

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
        } = this.props;

        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [this.scale(20), this.scale(4)],
            }),
            fontSize: this.scale(isFieldActive ? titleActiveSize : titleInActiveSize),
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
            marginLeft: this.scale(this.props.textMarginLeft),
            marginRight: this.scale(this.props.textMarginRight),
        }
    }

    _returnAnimatedInputStyles = () => {
        const { isFieldActive } = this.state;
        const {
            textInputActiveMargins, textInputInactiveMargins,
        } = this.props;

        let marginTop = this.scale(isFieldActive ? textInputActiveMargins.marginTop : textInputInactiveMargins.marginTop)
        return {
            marginTop : this.props.multiline ? MULTILINE_TOPMARGIN_ADJUSTER*marginTop : marginTop,
            marginBottom : this.invScale(isFieldActive ? textInputActiveMargins.marginBottom : textInputInactiveMargins.marginBottom),
            fontSize : this.scale(this.props.fontSize),
            marginLeft: this.scale(this.props.textMarginLeft) + this.state.textLeftOffset,
            marginRight : this.scale(this.props.textMarginRight),
            paddingRight : this.scale(this.props.textMarginRight)*1.5,
            borderRadius : this.scale(this.props.borderRadius),
            height : this.scale(this.props.height),
        }
    }

    _returnAnimatedContainerStyles = () => {
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
            width : this.scale(this.props.width),
            height : this.scale(this.props.height),
            borderRadius : this.scale(this.props.borderRadius)
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
            onSubmitEditing = {this.state.onSubmitEditing == undefined ? this.props.onSubmitEditing : this.state.onSubmitEditing}
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
