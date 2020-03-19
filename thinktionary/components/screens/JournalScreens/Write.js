
import { StyleSheet, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EntryBox from "../../EntryBox";
import Screen, {styles} from "../Screen";
import React from "react";
import View from "react-native-web/dist/exports/View";
import {HP_SIMPLIFIED_BOLD} from "../../../configStrings";

export default class Write extends Screen {

    constructor(props) {
        super(props);
    }

    fillBody() {
        return (
                    <LinearGradient colors={['#ae43ec', '#E76F1F']} end={[1, 0]}
                                    start={[0, 1]} style={style.linearGradient}>

                    </LinearGradient>
            );
        }
}

export const newStyles = StyleSheet.create({
    frame: {
        flex: 1,
        margin : "15%",
        color : "#FFFFFF",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient :{
        flex : 2,
        height : "100%",
        width : "100%",
        alignItems : 'center'
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 150,
        marginVertical: 30,
        color : '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: { height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    },

});
