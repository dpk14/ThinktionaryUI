import {object} from "prop-types"
import React, {Component} from "react"
import {TouchableOpacity, View} from "react-native";
import WriteBackButtonImg from "../Images/WriteBackButtonImg";
import screenNames from "../../../../navigation/ScreenNames";
import ReadFwdImg from "../Images/ReadFwdImg";
export class ReadFwdButton extends Component {

    static propTypes = {
        navigation : object.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(screenNames.READ_SCREEN)}
                              style={{flex : 1}}>
                <ReadFwdImg/>
            </TouchableOpacity>
        )

    }

}
