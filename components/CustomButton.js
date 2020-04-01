import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {_scale} from "./utils/scaling";
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'
import {ScalingView} from "./ScalingView";
import {invScale} from "../DONT_USE_THIS/thinktionary/components/utils/scaling";

class customButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        width: PropTypes.number,
        fontSize: PropTypes.number,
        scale: PropTypes.number,
        alignItems : PropTypes.string,
        marginTop: PropTypes.number,
        padding : PropTypes.number,
        height: PropTypes.number,
    }

    static defaultProps = {
        fontSize : 25,
        width: 120,
        scale: 1,
        alignItems : 'center',
        marginTop: 0,
        padding: 12,
        height: 56,
        marginLeft : 0,
    }

    static defaultScalableStyles = {
        borderRadius: 20,
        shadowRadius: 15,
    }

    constructor(props) {
        super(props);
        console.log(this.props.text)
        this.state = {loading: true,
            textWidth : 0};
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading: false})
    }

    customContainerStyles() {
        const {scale, alignItems, height} = this.props
        return {
            alignItems: alignItems,
            height: _scale(height, scale),
        }
    }

    getButtonStyles(){
        const {width, scale, alignItems, height, marginTop, padding} = this.props
            let ret = {
                height : _scale(height, scale),
                marginTop : _scale(marginTop, scale),
                padding : _scale(padding, scale),
                borderRadius : _scale(customButton.defaultScalableStyles.borderRadius, scale),
                shadowRadius : _scale(customButton.defaultScalableStyles.shadowRadius, scale)
            }
        if(width != customButton.defaultProps.width) {
            ret.width = width
        }
        return ret
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

            console.log("onLayout " + this.props.onLayout)
            const {text, onPress} = this.props;
                return (
                    <ScalingView
                        style = {[styles.container, this.customContainerStyles()]}>
                        <TouchableOpacity
                            style={[styles.buttonStyle, this.getButtonStyles()]}
                            onPress={() => onPress()}
                        >
                            <Text
                                onLayout = {this.props.onLayout}
                                    style={[styles.textStyle, this.getFontSpecs()]}
                            >
                                {text}
                            </Text>
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
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        flex : 1
    },
    buttonStyle: {
        backgroundColor: '#FFB03F',
        alignItems : 'center',
        justifyContent : 'center',
        opacity : .95,
        shadowRadius: 15,
    }
});

export default customButton;
