import React, { Component} from 'react';
import {Alert, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import FontUtils, {HP_SIMPLIFIED, HP_SIMPLIFIED_BOLD} from "../../utils/FontUtils";
import {ORANGE, PURPLE, SOFT_ORANGE} from "../../utils/baseStyles";
import {string, func, object, number, bool, PropTypes} from 'prop-types';
import CustomButton from "../../Buttons/CustomButton";
import ScreenNames from "../../../navigation/ScreenNames"
import {_scale} from "../../utils/scaling";
import RemoveEntry from "../../../requestHandler/Requests/JournalCommands/RemoveEntry";
import {CustomButtonImg} from "../../Buttons/CustomButtonImg";

let MARGIN_BOTTOM = 10

export default class EntryHeader extends Component {

    static propTypes = {
        title: string.isRequired,
        created: string.isRequired,
        modified: string.isRequired,
        navigation: object.isRequired,
        entry: object.isRequired,
        journal: object.isRequired,
        onEntryRemoval: func.isRequired,
        width: number,
        height: number,
        scale: number,
        marginLeft: number,
        style: object,
    }

    static defaultProps = {
        width: 150,
        height: 50,
        scale: 1,
        marginLeft: 21,
        style: {}
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
            width: _scale(width, scale),
            height: _scale(height, scale)
        }
    }

    _textDimensions = () => {
        let {marginLeft, scale} = this.props
        return {
            marginLeft: _scale(marginLeft, scale)
        }
    }

    _editEntry = () => {
        let {navigation, journal, entry} = this.props
        navigation.navigate(ScreenNames.WRITE_SCREEN, {journal: journal, entry: entry})
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
        topics.forEach((topic) => str += topic + ", ")
        return str.substring(0, str.length - 2)
    }

    render() {
        let {scale, title, created, modified, style} = this.props
        return (
            <View
                style={[entryHeaderStyle.outerFrame, this._outerDimensions(), style, {height: EntryHeader.calculateEntryHeaderHeight()}]}>
                <View style={entryHeaderStyle.leftFrame}>
                    <Text numberOfLines={1}
                          style={[entryHeaderStyle.titleText, this._textDimensions()]}>
                        {title}
                    </Text>
                </View>
                <View style={entryHeaderStyle.rightFrame}>
                    <CustomButtonImg
                        source={require("../../../assets/images/pencil2.png")}
                        scale={_scale(.8, scale)}
                        style={{borderRadius: 5, alignItems: "flex-start", backgroundColor : SOFT_ORANGE, shadowRadius: 5, shadowOpacity: .1}}
                        imageStyle={{width: 20, height: 20, shadowRadius: 2, shadowOpacity: .1}}
                        onPress={this._editEntry}
                    />
                    <CustomButtonImg source={require("../../../assets/images/trashcan2.png")}
                                     imageStyle={{width: 20, height: 20, flex: 1, shadowRadius: 5, shadowOpacity: .1}}
                                     scale={_scale(.8, scale)}
                                     style={{borderRadius: 5, marginLeft: 15, backgroundColor : SOFT_ORANGE,  shadowRadius: 5, shadowOpacity: .2}}
                                     onPress={this._removeEntry}
                    />
                    <CustomButtonImg source={require("../../../assets/images/help.png")}
                                     imageStyle={{width: 20, height: 20, flex: 1, shadowRadius: 5, shadowOpacity: .1}}
                                     scale={_scale(.8, scale)}
                                     style={{borderRadius: 5, marginLeft: 15, marginRight:15, backgroundColor : SOFT_ORANGE,  shadowRadius: 5, shadowOpacity: .2}}
                                     onPress={() => Alert.alert("About", "Created on " + created + "\nLast modified on " + modified + "\n" + this.getTopicText())}
                    />
                </View>
            </View>
        )
    }

    static calculateEntryHeaderHeight() {
        return (entryHeaderStyle.titleText.marginTop +
            entryHeaderStyle.titleText.marginBottom +
            entryHeaderStyle.titleText.fontSize +
            (1 * (
                (entryHeaderStyle.dateText.marginVertical * 2) +
                entryHeaderStyle.dateText.fontSize
            )) + (2 * MARGIN_BOTTOM))
    }
}
    const entryHeaderStyle = StyleSheet.create({
    outerFrame: {
        flexDirection : 'row',
        backgroundColor: PURPLE,
        opacity : .95,
        shadowOffset: { height: 3,},
        shadowRadius: 3,
        shadowOpacity: .3,
        borderRadius : 3,
        marginBottom: 2
    },
    leftFrame: {
        marginRight : 15,
        flex : .8,
        justifyContent: 'center',
    },
    rightFrame: {
        flex : .55,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    titleText:{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginLeft : 10,
        marginTop : 7,
        marginBottom : 5,
        shadowOffset: { height: 1,},
        shadowRadius: 4,
        shadowOpacity: .3,
        opacity : .85,
        fontFamily: HP_SIMPLIFIED_BOLD
    },
    dateText:{
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white',
        shadowOffset: { height: 1,},
        shadowRadius: 2,
        shadowOpacity: .4,
        opacity : .85,
        marginVertical : 1
    },
})
