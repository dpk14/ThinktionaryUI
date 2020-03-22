import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {_scale} from "./utils/scaling";
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'

class customButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        width: PropTypes.number,
        fontSize: PropTypes.number,
        scale: PropTypes.number,
        alignItems : PropTypes.string,
    }

    static defaultProps = {
        fontSize : 25,
        width: 120,
        scale: 1,
        alignItems : 'center'
    }

    static defaultScalableStyles = {
        marginTop: 20,
        padding: 12,
        height: 56,
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

    getFontSpecs(){
        const {scale, fontSize} = this.props
        return {
            fontFamily : HP_SIMPLIFIED_BOLD,
            fontSize : _scale(fontSize, scale)
        }
    }

    render() {
        if (this.loading) return null;
        else {
            const {text, onPress} = this.props;
                return (
                    <View style = {[styles.container, this.customContainerStyles()]}>
                        <TouchableOpacity
                            style={[styles.buttonStyle, this.scaleToText()]}
                            onPress={() => onPress()}
                        >
                            <Text
                                style={[styles.textStyle, this.getFontSpecs()]}
                            >
                                {text}
                            </Text>
                        </TouchableOpacity>
                    </View>
            );
        }
    }

    customContainerStyles() {
        return {
            alignItems: this.props.alignItems,
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
