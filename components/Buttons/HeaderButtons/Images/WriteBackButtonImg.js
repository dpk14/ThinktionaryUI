import React, { Component } from 'react';
import {Image, View} from "react-native";

export default class WriteBackButtonImg extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{flex : 1, flexDirection : 'row'}}>
                <Image
                style={{width : 20, height : 20, marginLeft : 10, shadowRadius: 5, shadowOpacity: .2}}
                source={require("../../../../assets/images/back_button.png")}/>
                <Image
                    style={{width : 20, height : 20, shadowRadius: 2, shadowOpacity: .1}}
                    source={require("../../../../assets/images/pencil1.png")}/>
            </View>)
    }


}
