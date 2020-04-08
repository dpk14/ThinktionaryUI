import Screen, {baseStyles} from "../Screen";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import {TopicCreatorBox} from "../../../EntryBox/TopicBox/TopicContainer";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledTextInput";
import StyledBase from "../StyledBase";

export default class ReadScreen extends Screen {

    constructor(props) {
        super(props);
        this.state.journal = props.route.params.journal
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
        this.state.topics = ''
        this.state.topicBank = ''
    }

    render() {
        return(
            <StyledBase>
                <View style = {baseStyles.container}>
            <View style={readStyles.outerFrame}>
                <View style={readStyles.leftFrame}>
                    <StyledInputBox
                        attrName='entries'
                        title='Entries'
                        value={''}
                        updateMasterState={this._updateMasterState}
                        scale = {.75}
                        width='100%'
                        height = {600}
                        multiline = {true}
                        blurOnSubmit={false}
                        alwaysActive = {true}
                        editable = {false}
                    />
                </View>
                <View style={readStyles.leftFrame}>
                    <StyledInputBox
                        attrName='journal'
                        title='Journal'
                        value={''}
                        updateMasterState={this._updateMasterState}
                        scale = {.75}
                        width='100%'
                        height = {600}
                        multiline = {true}
                        blurOnSubmit={false}
                        alwaysActive = {true}
                        editable = {false}
                    />
                </View>
            </View>
                <TopicCreatorBox
                    attrName='topicBank'
                    title='Topic Bank'
                    alwaysActive = {true}
                    editable = {false}
                    value={this.state.topicBank}
                    updateMasterState={this._updateMasterState}
                    scale = {.75}
                    topicScale = {.65}
                    topics = {this.state.journal.topics}
                    width= '100%'
                    height={1.5*TOPIC_HEIGHT}
                />
                </View>
            </StyledBase>
        )
    }
}

export const readStyles = StyleSheet.create({
    leftFrame: {
        flex: 1,
        width : '20%',
        height : '80%'
    },
    rightFrame: {
        flex: 1,
        width : '80%',
        height : '80%'
    },
    outerFrame:{
        marginTop : 60,
        flex: 1,
        flexDirection : 'row',
        marginHorizontal : 15
    }

});

