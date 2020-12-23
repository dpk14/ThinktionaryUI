import EntryBox from "../EntryBox";
import StyledTextInput from "./StyledTextInput";
import React, {Component} from "react";
import {View} from "react-native";
import RichEditorInput from "./RichEditorInput";

export class RichEditorBox extends Component{
    static propTypes = RichEditorInput.propTypes
    static defaultProps = RichEditorInput.defaultProps

    constructor(props) {
        super(props);
    }

    render() {
        const {title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, secureTextEntry, editable, onChangeText, style, reset, updateRichTextEditor, barUpdated}  = this.props
        return (<View>
                <EntryBox title={title}
                          scale={scale}
                          width={style.flex == undefined ? width : '100%' }
                          height={style.flex == undefined ? height : '100%'}
                          style = {style}
                          value = {value}
                          reset = {reset}
                >
                    <RichEditorInput multiline = {multiline}
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
                                     updateRichTextEditor={updateRichTextEditor}
                                     barUpdated = {barUpdated}
                    />
                </EntryBox>
            </View>
        )
    }

}
