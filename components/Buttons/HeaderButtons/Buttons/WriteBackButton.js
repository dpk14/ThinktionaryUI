import {object} from "prop-types"
import React, {Component} from "react"
import {TouchableOpacity} from "react-native";
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
                    title={""}
                    style={{flex : 1, width : "100%", height:"100%"}}>
                <WriteBackButtonImg/>
            </TouchableOpacity>
        )

    }

}
