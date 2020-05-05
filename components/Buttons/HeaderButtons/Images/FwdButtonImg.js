import React, { Component } from 'react';
import {Image} from "react-native";

export default class FwdButtonImg extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(<Image
            style={{width : 20, height : 20, marginRight : 10, shadowRadius: 5, shadowOpacity: .2}}
            source={require("../../../../assets/images/fwd_button.png")}/>)
    }


}
