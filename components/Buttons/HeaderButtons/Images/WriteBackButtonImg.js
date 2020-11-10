import React, { Component } from 'react';
import {Image, View} from "react-native";
import BackButtonImg from "./BackButtonImg";

export default class WriteBackButtonImg extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{flex : 1, flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                <BackButtonImg/>
                <Image
                    style={{width : 20, height : 20, shadowRadius: 3, shadowOpacity: .05}}
                    source={require("../../../../assets/images/pencil2.png")}/>
            </View>)
    }


}
