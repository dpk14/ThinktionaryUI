import React, { Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {ORANGE, PURPLE} from "../../utils/baseStyles";
import {string, func, object, number, bool, PropTypes} from 'prop-types';
import CustomButton from "../../Buttons/CustomButton";
import ScreenNames from "../../../navigation/ScreenNames"
import {_scale} from "../../utils/scaling";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../../screens/base/StyledBase";
import {StackActions, NavigationActions} from "react-navigation";
import { CommonActions } from '@react-navigation/native';
import RemoveEntry from "../../../requestHandler/Requests/JournalCommands/RemoveEntry";


export default class EntryHeader extends Component{

    static propTypes = {
        title : string.isRequired,
        created : string.isRequired,
        modified : string.isRequired,
        navigation : object.isRequired,
        entry : object.isRequired,
        journal : object.isRequired,
        onEntryRemoval : func.isRequired,
        width : number,
        height : number,
        scale : number,
        marginLeft : number,
        style : object,
    }

    static defaultProps = {
        width : 150,
        height : 30,
        scale : 1,
        marginLeft : 21,
        style : {}
    }

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await FontUtils.loadFonts();
        this.setState({loading: false})
    }

    _outerDimensions = () => {
        let {width, height, scale} = this.props
        return {
            width : _scale(width, scale),
            height : _scale(height, scale)
        }
    }

    _textDimensions = () => {
        let {marginLeft, scale} = this.props
        return {
            marginLeft : _scale(marginLeft, scale)
        }
    }

    _editEntry = () => {
        let {navigation, journal, entry} = this.props
        navigation.navigate(ScreenNames.WRITE_SCREEN, {journal : journal, entry : entry})
    }

    _removeEntry = () => {
        let {journal, entry, onEntryRemoval} = this.props
        new RemoveEntry(journal.userID, entry.entryID).fetchAndExecute()
        onEntryRemoval(entry)
    }

    getTopicText = () => {
        let {topics} = this.props.entry
        if (topics.size == 0) return "No tags used"
        let str = "Tags used: "
        topics.forEach((topic) => str+=topic+", ")
        return str.substring(0, str.length-2)
    }

    render() {
        let {scale, title, created, modified, style} = this.props
        return (
                <View style = {[entryHeaderStyle.outerFrame, this._outerDimensions(), style]}>
                    <View style = {entryHeaderStyle.leftFrame}>
                        <Text numberOfLines = {1}
                              style = {[entryHeaderStyle.titleText, this._textDimensions()]}>
                            {title}
                        </Text>
                        <Text numberOfLines = {1}
                              style = {[entryHeaderStyle.dateText, this._textDimensions()]}>
                            {"Created on " + created}
                        </Text>
                        <Text numberOfLines = {1}
                              style = {[entryHeaderStyle.dateText, this._textDimensions()]}>
                            {"Last modified on " + modified}
                        </Text>
                        <Text numberOfLines = {1}
                              style = {[entryHeaderStyle.dateText, this._textDimensions(), {marginBottom : 10}]}>
                            {this.getTopicText()}
                        </Text>
                    </View>
                    <View style = {entryHeaderStyle.rightFrame}>
                        <CustomButton
                            text="Edit"
                            scale={_scale(.8, scale)}
                            alignItems="flex-start"
                            onPress={this._editEntry}
                        />
                        <CustomButton text={"X"}
                                      //height={50}
                                      scale={_scale(.8, scale)}
                                      style = {{borderRadius : 5, marginLeft : 15}}
                                      onPress={this._removeEntry}
                        />
                    </View>
            </View>
        )
    }

}

const entryHeaderStyle = StyleSheet.create({
    outerFrame: {
        flex : 1,
        flexDirection : 'row',
        backgroundColor: PURPLE,
        opacity : .95,
        shadowOffset: { height: 3,},
        shadowRadius: 15,
        shadowOpacity: .3,
        borderRadius : 3,
    },
    leftFrame: {
        flex : .8,
        justifyContent: 'flex-start'
    },
    rightFrame: {
        flex : .3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    titleText:{
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontSize: 20,
        color: 'white',
        marginLeft : 10,
        marginTop : 7,
        marginBottom : 5,
        shadowOffset: { height: 1,},
        shadowRadius: 4,
        shadowOpacity: .3,
        opacity : .85
    },
    dateText:{
        fontFamily: HP_SIMPLIFIED_BOLD,
        fontSize: 13,
        color: 'white',
        shadowOffset: { height: 1,},
        shadowRadius: 2,
        shadowOpacity: .4,
        opacity : .85,
        marginVertical : 1
    },
})
