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
                    style={{width : 20, height : 20, shadowRadius: 2, shadowOpacity: .1}}
                    source={require("../../../../assets/images/pencil1.png")}/>
            </View>)
    }


}
