import React, { Component } from 'react';
import {Image} from "react-native";

export default class Icon extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(<Image
            style={{width : 22, height : 20, marginLeft : 10, shadowRadius: 5, shadowOpacity: .2}}
            source={this.props.source}/>)
    }


}
