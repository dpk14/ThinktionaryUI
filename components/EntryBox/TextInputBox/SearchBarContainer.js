import EntryBox from "../EntryBox";
import StyledTextInput from "./StyledTextInput";
import React, {Component} from "react";
import {View, Image} from "react-native"
import {childrenWithProps} from "../../utils/general";
import {getScreenHeight, getScreenWidth} from "../../utils/scaling";

export class SearchBarContainer extends Component{

    constructor(props) {
        super(props);
    }
    render() {
        let children = childrenWithProps(this.props.children, {
            active : this.props.active,
            updateContainerState : this.props.updateContainerState,
        })
        return (
                <View style = {{flexDirection : 'row', justifyContent: 'center', alignItems: 'center', flex : 1}}>
                    <Image resizeMethod='scale'
                            resizeMode='contain'
                            style = {{height : "80%", width : "7.5%", marginLeft : "2%"}}
                           source = {require("../../../assets/images/magnifying_glass.png")}
                    />
                    {children}
                </View>
        )
    }

}
