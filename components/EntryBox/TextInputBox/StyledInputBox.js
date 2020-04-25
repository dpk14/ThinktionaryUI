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
            value, keyboardType, updateMasterState, secureTextEntry, editable, onChangeText, style}  = this.props
        return (<EntryBox title={title}
                          scale={scale}
                          width={style.flex == undefined ? width : '100%' }
                          height={style.flex == undefined ? height : '100%'}
                          style = {style}
            >
                    <StyledTextInput multiline = {multiline}
                                 attrName={attrName}
                                 returnKeyType = {returnKeyType}
                                 blurOnSubmit = {blurOnSubmit}
                                 value={value}
                                 keyboardType={keyboardType}
                                 autoCompleteType = {false}
                                 updateMasterState={updateMasterState}
                                 width = {'100%'}
                                 height = {'100%'}
                                 scale = {scale}
                                 secureTextEntry={secureTextEntry}
                                 editable={editable}
                                 onChangeText={onChangeText}
                                />
            </EntryBox>
        )
    }

}
