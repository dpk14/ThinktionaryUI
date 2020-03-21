import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import {HP_SIMPLIFIED_BOLD} from "../configStrings";

class customButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        width : PropTypes.number
    }

    static defaultProps = {
        width : 100,
    }

    constructor(props) {
        super(props);
        this.state = {loading : true};
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    render() {
        if (this.loading) return null;
        else {
            const {text, onPress} = this.props;
            return (
                <TouchableOpacity style={[styles.buttonStyle, {width: this.props.width}]}
                                  onPress={() => onPress()}
                >
                    <Text style={styles.textStyle}>{text}</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontWeight: 'bold',
    },

    buttonStyle: {
        marginTop: 20,
        padding: 12,
        height: 56,
        backgroundColor: '#FFB03F',
        opacity : .95,
        borderRadius: 20,
        shadowOffset: { height: 4},
        shadowRadius: 15,
    }
});

export default customButton;
