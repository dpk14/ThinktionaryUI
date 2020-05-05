import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {_scale} from "../utils/scaling";

import ButtonFrame from "./ButtonFrame";

class customButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        fontSize: PropTypes.number,
        scale: PropTypes.number,
        style : PropTypes.object,
    }

    static defaultProps = {
        fontSize : 25,
        scale: 1,
        style : {}
    }

    constructor(props) {
        super(props);
        this.state = {loading: true,
            textWidth : 0};
    }

    async componentDidMount() {
        await FontUtils.loadFonts()
        this.setState({loading: false})
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
        if (this.state.loading) return (<View/>);
            const {text, onPress, scale, style} = this.props;
                return (
                    <ButtonFrame
                        onPress={onPress}
                        scale={scale}
                        style={style}>
                            <Text
                                onLayout = {this.props.onLayout}
                                    style={[styles.textStyle, this.getFontSpecs()]}
                            >
                                {text}
                            </Text>
                    </ButtonFrame>
            );
        }

}

const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        flex : 1,
        shadowRadius: 2,
        shadowOpacity : .25,
        shadowOffset: { height: 1},
    },
});

export default customButton;
