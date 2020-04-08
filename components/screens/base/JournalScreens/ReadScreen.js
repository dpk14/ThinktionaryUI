import Screen, {baseStyles} from "../Screen";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import {TOPIC_HEIGHT} from "../../../strings";
import React from "react";
import StyledBase from "../StyledBase";
import {TopicBank} from "../../../EntryBox/TopicBox/TopicBank";
import {StyledInputBox} from "../../../EntryBox/TextInputBox/StyledInputBox";

export default class ReadScreen extends Screen {

    constructor(props) {
        super(props);
        console.log(props.route.params.journal)
        this.state.journal = props.route.params.journal
        this.state.title = ''
        this.state.text = ''
        this.state.date = ''
    }

    render() {
        return(
            <StyledBase>
                <View style = {[readStyles.outerFrame]}>
                    <View style = {readStyles.topFrame}>
                            <StyledInputBox
                                attrName='entries'
                                title='Entries'
                                value={''}
                                updateMasterState={this._updateMasterState}
                                scale = {.75}
                                width='25%'
                                height = '90%'
                                multiline = {true}
                                blurOnSubmit={false}
                                alwaysActive = {true}
                                editable = {false}
                            />
                            <StyledInputBox
                                attrName='journal'
                                title='Journal'
                                value={''}
                                updateMasterState={this._updateMasterState}
                                scale = {.75}
                                width='70%'
                                height = '90%'
                                multiline = {true}
                                blurOnSubmit={false}
                                active = {true}
                                editable = {false}
                            />
                    </View>
                    <View style={readStyles.bottomFrame}>
                        <TopicBank
                            attrName='topicBank'
                            setName='topicBankCurr'
                            title='Topic Bank'
                            active = {this.state.journal.topics.size > 0}
                            updateMasterState={this._updateMasterState}
                            scale = {.75}
                            topicScale = {.62}
                            topics = {this.state.journal.topics}
                            width= '100%'
                            height={1.5*TOPIC_HEIGHT}
                        />
                    </View>
                </View>
            </StyledBase>
        )
    }
}

export const readStyles = StyleSheet.create({
    topFrame: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        height: '60%'
    },
    bottomFrame:{
    },
    leftFrame: {
    },
    rightFrame: {
    },
    outerFrame:{
        marginTop : 60,
        //flex: 1,
        marginHorizontal : 15,
        marginBottom : 10,
    }

});

