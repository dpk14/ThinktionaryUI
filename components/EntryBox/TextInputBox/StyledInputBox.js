import EntryBox from "../EntryBox";
import StyledTextInput from "./StyledTextInput";
import React, {Component} from "react";

export class StyledInputBox extends Component{
    static propTypes = StyledTextInput.propTypes
    static defaultProps = StyledTextInput.defaultProps

    constructor(props) {
        super(props);
    }
    render() {
        const {title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, secureTextEntry, editable}  = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width = {width}
                          height = {height}
            >
                    <StyledTextInput multiline = {multiline}
                                 attrName={attrName}
                                 returnKeyType = {returnKeyType}
                                 blurOnSubmit = {blurOnSubmit}
                                 value={value}
                                 keyboardType={keyboardType}
                                 autoCompletType = {false}
                                 updateMasterState={updateMasterState}
                                 width = {'100%'}
                                 height = {'100%'}
                                 scale = {scale}
                                 secureTextEntry={secureTextEntry}
                                 editable={editable}/>
            </EntryBox>
        )
    }

}
