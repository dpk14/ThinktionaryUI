import React, { Component } from 'react';
import {Image} from "react-native";

export default class BackButtonImg extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(<Image
            style={{width : 20, height : 20, marginLeft : 10, shadowRadius: 5, shadowOpacity: .2}}
            source={require("../../../assets/images/back_button.png")}/>)
    }


}
