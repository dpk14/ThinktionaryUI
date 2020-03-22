import React, { Component } from 'react';
import { string, func, object, number, bool } from 'prop-types';
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "./utils/FontUtils";
import {View} from "react-native-web";
import {StyleSheet} from "react-native";

export default class TextAutoSizer extends Component {
    static propTypes = {
        text : string.isRequired,
        style : object
    }

    static defaultProps = {
        style : {}
    }

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
        }
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading : false})
    }

}

export const Styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor : "white",
        shadowOffset: { height: 4},
        shadowRadius: 20,
    },
    textInput: {
        fontWeight: '400',
        fontFamily: HP_SIMPLIFIED,
        color: '#282828',
        width: '100%',
        height: 65,
        position: 'relative',
        borderRadius: 20,
        opacity: .9
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontWeight: '300',
        lineHeight: 24,
    }

})


