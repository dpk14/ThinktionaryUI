import React, { Component } from 'react';
import {Image, View} from "react-native";
import FwdButtonImg from "./FwdButtonImg";

export default class WriteBackButtonImg extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{flex : 1, flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                <Image
                    style={{width : 20, height : 20, shadowRadius: 2, shadowOpacity: .1}}
                    source={require("../../../../assets/images/read.png")}/>
                <FwdButtonImg/>
            </View>)
    }


}
