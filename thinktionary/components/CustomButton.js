import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {_scale} from "./utils/scaling";

class customButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        width: PropTypes.number,
        fontSize: PropTypes.number,
        scale: PropTypes.number
    }

    static defaultProps = {
        fontSize : 25,
        width: 120,
        scale: 1
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
        this.state = {loading: true,
            textWidth : 0};
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading: false})
    }

    onLayout = (e) => {
        console.log(e.nativeEvent.layout.width)
        this.setState({
            textWidth: e.nativeEvent.layout.width,
        })
    }

    customizeText = () => {
        const {fontSize, scale} = this.props
        return {
            fontSize : _scale(fontSize, scale)
        }
    }

    scaleToText = () => {
        let ret = {}
        let defStyle = customButton.defaultScalableStyles
        for (const prop in defStyle) {
            ret[prop] = _scale(defStyle[prop], this.props.scale)
        }
        ret.width = this.state.textWidth + 2*ret.padding
        return ret
    }

    render() {
        if (this.loading) return null;
        else {

            const {text, onPress} = this.props;
            const TextComp = (<View onLayout={this.onLayout}>
                                <Text
                                style={[styles.textStyle, this.customizeText(), {width:'100%'}]}
                                >
                                    {text}
                                </Text>
                            </View>)
                return (
                <TouchableOpacity
                    style={[styles.buttonStyle, {width: this.props.width}, this.scaleToText()]}
                    onPress={() => onPress()}
                >
                    {TextComp}
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontWeight: 'bold'
    },

    buttonStyle: {
        backgroundColor: '#FFB03F',
        opacity : .95,
        shadowRadius: 15,
    }
});

export default customButton;
