import {object} from "prop-types"
import React, {Component} from "react"
import {TouchableOpacity, View} from "react-native";
import WriteBackButtonImg from "../Images/WriteBackButtonImg";
import screenNames from "../../../../navigation/ScreenNames";
export class WriteBackButton extends Component {

    static propTypes = {
        navigation : object.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(screenNames.WRITE_SCREEN)}
                    style={{flex : 1}}>
                <WriteBackButtonImg/>
            </TouchableOpacity>
        )

    }

}
