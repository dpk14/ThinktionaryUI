import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const HP_SIMPLIFIED = 'hp-simplified';
const HP_SIMPLIFIED_BOLD = 'hp-simplified-bold';

class customButton extends Component {

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
                <TouchableOpacity style={styles.buttonStyle}
                                  onPress={() => onPress()}
                >
                    <Text style={styles.textStyle}>{text}</Text>
                </TouchableOpacity>
            );
        }
    }
}

customButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

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
        padding: 10,
        height: 56,
        width : '30%',
        backgroundColor: '#FFB03F',
        opacity : .95,
        borderRadius: 20,
        shadowOffset: { height: 4},
        shadowRadius: 15,
    }
});

export default customButton;
