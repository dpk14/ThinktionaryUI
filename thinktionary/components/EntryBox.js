import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';
const HP_SIMPLIFIED = "hp-simplified";
const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";

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
        marginTop : number,
        marginBottom : number,
        width : string,
        height : number,
    }

    static defaultProps = {
        height : 65,
        width : '70%',
        marginRight : 0,
        marginLeft : 0,
        marginTop : 12,
        marginBottom : 12,
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
                outputRange: [20, 4],
            }),
            fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
        }
    }

    _returnAnimatedInputStyles = () => {
        const { isFieldActive } = this.state;
        const {
            textInputActiveMargins, textInputInactiveMargins,
        } = this.props;

        return {
            marginTop : isFieldActive ? textInputActiveMargins.marginTop : textInputInactiveMargins.marginTop,
            marginBottom : isFieldActive ? textInputActiveMargins.marginBottom : textInputInactiveMargins.marginBottom,
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
            marginTop : this.props.marginTop,
            marginBottom : this.props.marginBottom,
            width : this.props.width,
            height : this.props.height,
        }
    }

    render() {
        if (!this.loading) {
            return (
                <Animated.View style={[Styles.container, this._returnAnimatedContainerStyles()]}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                    <TextInput
                        value={this.props.value}
                        style={[Styles.textInput, this._returnAnimatedInputStyles()]}
                        underlineColorAndroid='transparent'
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                        onChangeText={this._onChangeText}
                        keyboardType={this.props.keyboardType}
                        {...this.props.otherTextInputProps}
                    />
                </Animated.View>
            )
        }
        else return null;
    }
}

const Styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        position: 'relative',
        backgroundColor : "white",
        shadowOffset: { height: 4},
        shadowRadius: 20,
    },
    textInput: {
        fontSize: 20,
        fontWeight: '400',
        fontFamily: HP_SIMPLIFIED,
        color: '#282828',
        width: '100%',
        height: 65,
        position: 'relative',
        marginHorizontal: 25,
        borderRadius: 20,
        opacity: .9
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: HP_SIMPLIFIED_BOLD,
        left: 25,
        fontWeight: '300',
        lineHeight: 24,
    }

})