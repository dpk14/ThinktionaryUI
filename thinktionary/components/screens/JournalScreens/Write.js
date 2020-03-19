
import { StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EntryBox from "../../EntryBox";
import Screen, {styles} from "../Screen";
import React from "react";
import {HP_SIMPLIFIED_BOLD} from "../../../configStrings";

export default class Write extends Screen {

    constructor(props) {
        super(props);
    }

    fillBody() {
        return (
                    <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                    start={[0, 1]} style={styles.linearGradient}>
                        <View style = {newStyles.frame}>
                            <EntryBox
                                attrName='title'
                                title='Title'
                                value={this.state.title}
                                updateMasterState={this._updateMasterState}
                                scale = {0.7}
                            />
                            <EntryBox
                                attrName='date'
                                title='Date'
                                value={this.state.date}
                                updateMasterState={this._updateMasterState}
                            />
                        </View>

                    </LinearGradient>
            );
        }
}

export const newStyles = StyleSheet.create({
    frame: {
        flex: 1,
        margin : 80,

        color : "#FFFFFF",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});
