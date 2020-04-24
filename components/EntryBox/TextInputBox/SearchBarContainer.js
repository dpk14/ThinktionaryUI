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
        console.log("Splurg")
        console.log(this.props.updateContainerState)
        let children = childrenWithProps(this.props.children, {
            active : this.props.active,
            updateContainerState : this.props.updateContainerState,
        })
        return (
                <View style={{flexDirection : 'row'}}>
                    <Image style = {{flex : .15, height : "100%"}}
                           source = {"../../../assets/images/magnifying_glass.png"}
                    />
                    {children}
                </View>
        )
    }

}
