
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EntryBox from "../../EntryBox";
import Screen, {styles} from "../Screen";
import React from "react";
import {HP_SIMPLIFIED_BOLD} from "../../../configStrings";
import CustomButton from "../../CustomButton";
import Login from "../../../requestHandler/Requests/AccountRequests/Login";

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
                                    width={210}
                                />
                                <EntryBox
                                    attrName='date'
                                    title='Date'
                                    value={this.state.date}
                                    updateMasterState={this._updateMasterState}
                                    scale = {0.8}
                                    width={210}
                                />
                            </View>
                            <View style = {newStyles.bottomFrame}>
                                <EntryBox
                                    attrName='topics'
                                    title='Topics'
                                    value={this.state.topics}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    width={450}
                                />
                                <EntryBox
                                    attrName='text'
                                    title='Text'
                                    value={this.state.text}
                                    updateMasterState={this._updateMasterState}
                                    scale = {.8}
                                    width={450}
                                    height = {450}
                                    multiline = {true}

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
        marginTop : 80,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bottomFrame:{
        flex:1,
        marginTop : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerFrame:{
        flex : 1,
        marginHorizontal : 15
    }

});
