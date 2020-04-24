import EntryBox from "../EntryBox";
import StyledTextInput from "./StyledTextInput";
import React, {Component} from "react";
import {View, Image} from "react-native"
import {childrenWithProps} from "../../utils/general";

export class SearchBarContainer extends Component{
    static propTypes = StyledTextInput.propTypes
    static defaultProps = StyledTextInput.defaultProps

    constructor(props) {
        super(props);
    }
    render() {
        const {title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, secureTextEntry, editable, onChangeText, style}  = this.props
        let children = childrenWithProps(this.props.children, this.props.updateContainerState)
        return (<EntryBox title={title}
                          scale={scale}
                          width={width}
                          height={style.flex == undefined ? height : '100%'}
                          style = {style}
            >
                <View style={{flexDirection : 'row'}}>
                    <Image style = {{flex : .15, height : "100%"}}
                           source = {"../../../assets/images/magnifying_glass.png"}
                    />
                    {children}
                </View>
            </EntryBox>
        )
    }

}
