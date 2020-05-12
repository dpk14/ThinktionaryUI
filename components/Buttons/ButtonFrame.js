import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {_scale} from "../utils/scaling";
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'
import {ScalingView} from "../ScalingView";
import {SOFT_ORANGE} from "../utils/baseStyles";
class customButton extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        scale: PropTypes.number,
        style : PropTypes.object,
    }

    static defaultProps = {
        scale : 1,
        style : {}
    }

    static defaultScalableStyles = {
        borderRadius: 20,
        shadowRadius: 15,
    }

    constructor(props) {
        super(props);
        this.state = {loading: true,
            textWidth : 0};
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading: false})
    }

    customContainerStyles() {
        const {scale, height, style} = this.props
        let ret = {}
        ret.alignItems = _scale(style.alignItems == undefined ? 'stretch' : style.alignItems, scale)
        ret.height = _scale(style.height == undefined ? 56 : style.height, scale)
        return ret
    }

    getButtonStyles(){
        let ret = {}
        const {style, scale} = this.props
        ret.height = _scale(style.height == undefined ? 56 : style.height, scale)
        ret.marginTop = _scale(style.marginTop == undefined ? 0 : style.marginTop, scale)
        ret.padding = _scale(style.padding == undefined ? 12 : style.padding, scale)
        ret.marginLeft = _scale(style.marginLeft == undefined ? 0 : style.marginLeft, scale)
        ret.borderRadius = _scale(customButton.defaultScalableStyles.borderRadius, scale)
        ret.shadowRadius = _scale(customButton.defaultScalableStyles.shadowRadius, scale)
        if (style.width != undefined) ret.width = _scale(125)
        return ret
    }

    //TODO: get views to LOCK in a width = to the width of the children
    render() {
        if (this.loading) return null;
        else {

            const {onPress, style, disabled} = this.props;
            return (
                <ScalingView
                    style = {[styles.container, this.customContainerStyles()]}>
                    <TouchableOpacity
                        style={[styles.buttonStyle, this.getButtonStyles(), style]}
                        onPress={() => onPress()}
                        disabled={disabled}
                    >
                        {this.props.children}
                    </TouchableOpacity>
                </ScalingView>
            );
        }
    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
    },
    buttonStyle: {
        backgroundColor: SOFT_ORANGE,
        alignItems : 'center',
        justifyContent : 'center',
        opacity : .95,
        shadowRadius: 15,
        shadowOpacity : .1,
        shadowOffset: { height: 4},
    }
});

export default customButton;
