import React, { Component } from 'react';
import {Image, View} from "react-native";

export default class LoadingScreen extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View
                style = {{flex : 1, 'alignItems' : 'center'}}
            >
                <Image
                    style={{width : "100%", height : "100%"}}
                    source={require("../../assets/images/splash.png")}/>
            </View>
        )
    }

}


