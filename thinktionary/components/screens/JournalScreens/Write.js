
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EntryBox from "../../EntryBox";
import Screen, {styles} from "../Screen";
import React from "react";
import {HP_SIMPLIFIED_BOLD} from "../../../configStrings";
import CustomButton from "../../CustomButton";
import Login from "../../../requestHandler/Requests/AccountRequests/Login";
import {TOPIC_HEIGHT} from "./strings";

export default class Write extends Screen {

    constructor(props) {
        super(props);
    }

    fillBody() {
        return (
            <View style = {styles.container}>
                        <View style = {newStyles.outerFrame}>
                            <View style = {newStyles.topFrame}>
                                <EntryBox
                                    attrName='title'
                                    title='Title'
                                    value={this.state.title}
                                    updateMasterState={this._updateMasterState}
                                    scale = {0.8}
                                    width={218}
                                />
                                <EntryBox
                                    attrName='date'
                                    title='Date'
                                    value={this.state.date}
                                    updateMasterState={this._updateMasterState}
                                    scale = {0.8}
                                    width={218}
                                />
                            </View>
                            <View style = {newStyles.bottomFrame}>
                                <EntryBox
                                    attrName='text'
                                    title='Text'
                                    value={this.state.text}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    width={450}
                                    height = {400}
                                    multiline = {true}

                                />
                                <EntryBox
                                    attrName='topics'
                                    title='Topics'
                                    value={this.state.topics}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    height= {TOPIC_HEIGHT}
                                    width={450}
                                />
                                <EntryBox
                                    attrName='topics'
                                    title='Topic Bank'
                                    value={this.state.topics}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    width={450}
                                    height={1.5*TOPIC_HEIGHT}
                                />
                                <CustomButton
                                    text="Save"
                                    onPress={() => {}}
                                />
                            </View>

                        </View>

                </View>
            );
        }
}

export const newStyles = StyleSheet.create({
    topFrame: {
        marginTop : 60,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative'
    },
    bottomFrame:{
        flex: 1,
        position: 'relative'
    },
    outerFrame:{
        flex: 1,
        position:'relative',
        marginHorizontal : 15
    }

});
