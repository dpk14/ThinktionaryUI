import EntryBox from "../EntryBox";
import StyledTextInput from "./StyledTextInput";
import React, {Component} from "react";
import {View, Image} from "react-native"
import {SearchBarContainer} from "./SearchBarContainer";

export class SearchBar extends Component{
    static propTypes = StyledTextInput.propTypes
    static defaultProps = StyledTextInput.defaultProps

    constructor(props) {
        super(props);
    }
    render() {
        const {title, scale, width, height, multiline, attrName, returnKeyType, blurOnSubmit,
            value, keyboardType, updateMasterState, secureTextEntry, editable, onChangeText, style}  = this.props
        return (
            <EntryBox title = {''}
                      scale = {scale}
                      width = {style.flexDirection == 'row' ? '100%' : width}
                      height = {style.flex == undefined ? style.height == undefined ? '100%' : style.height : '100%'}
                      style = {{...style, ...{justifyContent : 'center', alignItems : 'center'}}}
                      value = {value}
            >
            <SearchBarContainer>
                <StyledTextInput multiline = {multiline}
                                 attrName = {attrName}
                                 returnKeyType = {returnKeyType}
                                 blurOnSubmit = {blurOnSubmit}
                                 value = {value}
                                 keyboardType = {keyboardType}
                                 autoCompleteType = {false}
                                 updateMasterState = {updateMasterState}
                                 style = {{flex : 1, alignItems: 'center', justifyContent : 'center'}}
                                 //height = {'100%'}
                                 scale = {scale}
                                 secureTextEntry = {secureTextEntry}
                                 editable = {editable}
                                 onChangeText = {onChangeText}
                />
            </SearchBarContainer>
            </EntryBox>
        )
    }

}
