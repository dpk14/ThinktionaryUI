import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {_scale} from "./utils/scaling";
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'
import {ScalingView} from "./ScalingView";

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
        height: 56,
    }

    static defaultProps = {
        fontSize : 25,
        width: 120,
        scale: 1,
        alignItems : 'center'
        marginTop: 20,
        padding: 12,
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
        const {width, scale, alignItems, height, marginTop, padding} = this.props
        const ret = {
            alignItems: alignItems,
            height : _scale(height, scale)
            marginTop : _scale(marginTop, scale)
            padding : _scale(padding, scale)
        }
        if(this.props.width != customButton.defaultProps.width) {
            ret.width = width
        }
        return ret
    }

    /*
    scaleToText(){
        let ret = {}
        let defStyle = customButton.defaultScalableStyles
        for (const prop in defStyle) {
            ret[prop] = _scale(defStyle[prop], this.props.scale)
        }
        if(this.props.width != customButton.defaultProps.width) {
            ret.width = this.props.width
        }
        return ret
    }
    */

    getFontSpecs(){
        const {scale, fontSize} = this.props
        return {
            fontFamily : HP_SIMPLIFIED_BOLD,
            fontSize : _scale(fontSize, scale)
        }
    }

    /*
    componentDidMount() {
        if(!this.state.autoScaled){
            this.setState({
                autoScaled : true,
                viewWidth : this.props.view
            })
        }
    }
     */

    //TODO: get views to LOCK in a width = to the width of the children
    render() {
        if (this.loading) return null;
        else {
            const {text, onPress} = this.props;
                return (
                    <ScalingView
                        style = {[styles.container, this.customContainerStyles()]}>
                        <TouchableOpacity
                            style={[styles.buttonStyle, this.scaleToText()]}
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
        opacity : .95,
        shadowRadius: 15,
    }
});

export default customButton;
