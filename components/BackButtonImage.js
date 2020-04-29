import React, {Component} from 'react'
import {Button} from "react-native-web";
import Image from "react-native";

export default class BackButtonImage extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
                <Image
                    style={{width : 40, height : 40}}
                    source={require("../assets/images/back_button.png")}/>

        )

    }

}
