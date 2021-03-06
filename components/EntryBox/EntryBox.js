import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number, bool } from 'prop-types';
import {_scale, invScale} from "../utils/scaling";
import {Override} from "../utils/defaultHandling";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {ABSTRACT_METHOD} from "../utils/abstraction";
import {basePropDefaults, basePropTypes} from "./baseProps";
import {childrenWithProps} from "../utils/general";
import {ENTRY_BOX_VERT_MARGIN} from "../utils/baseStyles";
const MULTILINE_TOPMARGIN_ADJUSTER = 4

export default class EntryBox extends Component {
    static propTypes = {...basePropTypes, ...{
        title: string.isRequired,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        marginRight : number,
        marginLeft : number,
        marginVertical : number,
        active : bool,
            titleActivePos : number,
            titleInactivePos : number,
        },
        style : object,
        reset : bool
    }

    static defaultProps = {
        ...basePropDefaults, ...{
            marginRight: 0,
            marginLeft: 0,
            marginVertical: ENTRY_BOX_VERT_MARGIN,
            titleActiveSize: 13,
            titleInActiveSize: 15,
            titleActiveColor: '#512da8',
            titleInactiveColor: 'black',
            active: false,
            titleActivePos : 4,
            titleInactivePos : 20,
            style : {},
            reset : false
        }
    }

    constructor(props) {
        super(props);
        const { value } = this.props;
        let isFieldActive = !(this.props.value === "") || (this.props.value === "" && this.props.active) ? true : false
        this.state = {
            loading : true,
            isFieldActive: isFieldActive,
            justInactivated : false,
        }
        this.position = new Animated.Value(value || isFieldActive? 1 : 0);
        this.shadow = new Animated.Value(value || isFieldActive? 1 : 0);
        this.state.textLeftOffset = 0;
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize, scale,
            titleActivePos, titleInactivePos, textMarginLeft, textMarginRight,
        } = this.props;
        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [_scale(titleInactivePos, scale),
                             _scale(titleActivePos, scale)],
            }),
            fontSize: _scale(isFieldActive ? titleActiveSize : titleInActiveSize, scale),
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
            marginLeft: _scale(textMarginLeft, scale),
            marginRight: _scale(textMarginRight, scale),
        }
    }

    _animateFocus(){
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

    _returnAnimatedContainerStyles = () => {
        return {
            opacity: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [.3, .8]}
            ),
            shadowOpacity: this.shadow.interpolate({
                inputRange: [0, 1],
                outputRange: [0, .3]}
            ),
        }
    }

    _returnBaseContainerStyles = () => {
        const {scale} = this.props
        return {
            width: _scale(this.props.width, scale),
            height: _scale(this.props.height, scale),
            borderRadius: _scale(this.props.borderRadius, scale)
        }
    }

    _returnInnerViewStyles = () => {
        const {scale, width, height, borderRadius, titleActivePos, titleActiveSize, title} = this.props
        const {isFieldActive} = this.state
        const innerViewOffset = !isFieldActive || title.length == 0? 0 : _scale(titleActivePos + titleActiveSize, scale)
        return {
            width: _scale(width, scale),
            height: _scale(typeof height == "string" ? height : height - innerViewOffset, scale),
            borderRadius: _scale(borderRadius, scale),
            marginTop : innerViewOffset + 1,
            alignItems : this.props.style.alignItems == undefined ? 'flex-start' : this.props.style.alignItems,
        }
    }

    _returnContainerMarginStyles = () => {
        return {
            marginRight: this.props.marginRight,
            marginLeft: this.props.marginLeft,
            marginVertical: this.props.marginVertical,
        }
    }

    returnAllContainerStyles(additionalStyle={}){
        return [Styles.container, this._returnAnimatedContainerStyles(), this._returnBaseContainerStyles(), this._returnContainerMarginStyles(), additionalStyle]
    }

    updateContainerState = (isActive) => {
        //if(!this.props.alwaysActive) {
            this.setState({isFieldActive : isActive})
            isActive ? this._animateFocus() : this._animateBlur()
        //}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.inactivateIfScreenReset(prevProps);
        if (this.props.value && !this.state.isFieldActive) {
            this.setState({
                isFieldActive: true,
            })
            this._animateFocus()
        }
    }

    inactivateIfScreenReset(prevProps) {
        if (this.props.reset) {
            this.setState({
                isFieldActive: false,
                justInactivated: true
            })
            this._animateBlur()
        } else if (this.state.justInactivated) {
            this.setState({
                justInactivated: false
            })
        }
    }


    render() {
        const childrenWithLayout = //this.props.alwaysActive ? this.props.children :
            childrenWithProps(this.props.children, {
                updateContainerState: this.updateContainerState,
                active : this.state.isFieldActive
            });
        if (!this.loading) {
            return (
                <Animated.View style={this.returnAllContainerStyles(this.props.style)}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                    <View style = {this._returnInnerViewStyles()}>
                    {childrenWithLayout}
                    </View>
                </Animated.View>
            )
        }
        else return null;
    }
}

export const Styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor : "white",
        shadowOffset: { height: 4},
        shadowRadius: 20,
        flexWrap : 'wrap'
    },
    titleStyles: {
        position: 'absolute',
        flexWrap : 'wrap',
        fontFamily: HP_SIMPLIFIED_BOLD,
        //fontWeight: '300',
        fontWeight: 'bold',
        lineHeight: 24,
    }

})
