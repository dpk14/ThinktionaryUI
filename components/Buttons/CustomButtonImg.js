import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import FontUtils, {HP_SIMPLIFIED_BOLD} from "../utils/FontUtils";
import {_scale} from "../utils/scaling";
import ButtonFrame from "./ButtonFrame";

export class CustomButtonImg extends Component {

    static propTypes = {
        source: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        scale: PropTypes.number,
        style: PropTypes.object,
        imageStyle: PropTypes.object,
    }

    static defaultProps = {
        scale: 1,
        imageStyle: {},
        style: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            textWidth: 0
        };
    }

    async componentWillMount() {
        await FontUtils.loadFonts()
        this.setState({loading: false})
    }

    //TODO: get views to LOCK in a width = to the width of the children
    render() {
        if (this.loading) return null;
        else {
            const {onPress, scale, style, imageStyle, source} = this.props;
            return (
                <ButtonFrame
                    onPress={onPress}
                    scale={scale}
                    style={style}>
                    <Image
                        style={imageStyle}
                        source={source}
                    />
                </ButtonFrame>
            );
        }
    }
}
