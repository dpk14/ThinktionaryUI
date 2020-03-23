import React, { Component } from 'react';
import {StyleSheet, View} from "react-native";
import { string, func, object, number, bool } from 'prop-types';

export class ScalingView extends Component{

    static propTypes = {
        setWidth : bool,
        setHeight : bool,
        heightPadding : number,
        widthPadding : number,
        styles : object,
    }

    static defaultProps = {
        setWidth : true,
        setHeight : true,
        heightPadding : 0,
        widthPadding : 0,
        styles : {},
    }

    constructor(props) {
        super(props);
        this.state = {
            height : 0,
            width : 0,
        }
    }

    onLayout = (e) => {
        const {setWidth, setHeight} = this.props
        const toChange = {}
        if(setWidth) toChange.width = e.nativeEvent.layout.width
        if(setHeight) toChange.width = e.nativeEvent.layout.height
        this.setState({toChange})
    }

    render(){
        const childrenWithLayout = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                onLayout: this.onLayout
            });
        });

        return (<View style = {[this.props.styles]}>
            {childrenWithLayout}
        </View>)
    }

    autoScale() {
        const {width, height} = this.state
        return {
            width : width,
            height : height
        }
    }
}
