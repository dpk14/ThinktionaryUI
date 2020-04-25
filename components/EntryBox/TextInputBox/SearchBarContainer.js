import EntryBox from "../EntryBox";
import StyledTextInput from "./StyledTextInput";
import React, {Component} from "react";
import {View, Image} from "react-native"
import {childrenWithProps} from "../../utils/general";

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
                <View style = {{flexDirection : 'row', flex : 1}}>
                    <Image style = {{flex : .06, height : "45%", marginLeft : "2%", marginTop : "3%"}}
                           source = {require("../../../assets/images/magnifying_glass.png")}
                    />
                    {children}
                </View>
        )
    }

}
