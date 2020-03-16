import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const HP_SIMPLIFIED = 'hp-simplified';

class customButton extends Component {

    constructor(props) {
        super(props);
        this.state = {loading : true};
    }

    async componentWillMount() {
        await Font.loadAsync({
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
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: HP_SIMPLIFIED,
        fontWeight: 'bold',
    },

    buttonStyle: {
        marginTop: 10,
        padding: 10,
        height: 56,
        width : '30%',
        backgroundColor: '#FFB03F',
        opacity : .95,
        borderRadius: 20
    }
});

export default customButton;
