import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {_scale} from "../utils/scaling";
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'
import {ScalingView} from "../ScalingView";
import {invScale} from "../../DONT_USE_THIS/thinktionary/components/utils/scaling";

class customButton extends Component {

    static propTypes = {
        onLeftPress: PropTypes.func.isRequired,
        onRightPress: PropTypes.func.isRequired,
        width: PropTypes.number,
        fontSize: PropTypes.number,
        scale: PropTypes.number,
        padding : PropTypes.number,
        height: PropTypes.number,
        style : PropTypes.object,
    }

    static defaultProps = {
        onPress : ()=>{},
        fontSize : 25,
        width: 120,
        scale: 1,
        height: 56,
        padding: 12,
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

    getCustomContainerStyles() {
        const {scale, width, height} = this.props
        return {
            width : _scale(width, scale),
            height: _scale(height, scale),
            borderRadius : _scale(customButton.defaultScalableStyles.borderRadius, scale),
            shadowRadius : _scale(customButton.defaultScalableStyles.shadowRadius, scale),
        }
    }

    getButtonStyles(){
        const {width, scale, alignItems, height, padding} = this.props
        let ret = {
            height : _scale(height, scale),
            padding : _scale(padding, scale),
            borderRadius : _scale(customButton.defaultScalableStyles.borderRadius, scale),
            shadowRadius : _scale(customButton.defaultScalableStyles.shadowRadius, scale)
        }
        /*
        if(width != customButton.defaultProps.width) {
            ret.width = width
        }
        */
        return ret
    }

    getCustomSeparatorStyle(){
        let {scale, width, height} = this.props
        let borderRadius = _scale(customButton.defaultScalableStyles.borderRadius, scale)
        return {
            left : _scale(width, scale) - borderRadius,
            height: _scale(height, scale),
            width: 2*borderRadius
        }
    }

    getFontSpecs(){
        const {scale, fontSize} = this.props
        return {
            fontFamily : HP_SIMPLIFIED_BOLD,
            fontSize : _scale(fontSize, scale)
        }
    }

    //TODO: get views to LOCK in a width = to the width of the children
    render() {
        if (this.loading) return null;
        else {

            const {onLeftPress, onRightPress, style} = this.props;
            return (
                <View
                    style = {[styles.container, this.getCustomContainerStyles(), style]}>
                    <TouchableOpacity
                        style={[styles.buttonStyle, this.getButtonStyles(), styles.leftStyle]}
                        onPress={() => onLeftPress}
                    >
                        <Text
                            onLayout = {this.props.onLayout}
                            style={[styles.textStyle, this.getFontSpecs()]}
                        >
                            {"<"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonStyle, this.getButtonStyles(), styles.rightStyle]}
                        onPress={() => onRightPress}
                    >
                        <Text
                            onLayout = {this.props.onLayout}
                            style={[styles.textStyle, this.getFontSpecs()]}
                        >
                            {">"}
                        </Text>
                    </TouchableOpacity>
                    <View style={[styles.separator, this.getCustomSeparatorStyle()]}/>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
        flexDirection: 'row',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        flex : 1,
        shadowRadius: 2,
        shadowOpacity : .25,
        shadowOffset: { height: 1},
    },
    buttonStyle: {
        backgroundColor: '#FFB03F',
        alignItems : 'center',
        justifyContent : 'center',
        opacity : .95,
        shadowRadius: 15,
        shadowOpacity : .1,
        shadowOffset: { height: 4},
    },
    leftStyle: {
       justifyContent : 'flex-start'
    },
    rightStyle: {
        justifyContent : 'flex-end'
    },
    connector : {
        position : 'absolute'
    }

});

export default customButton;
