import React from 'react';
import styled from "styled-react-native";
import {View, TextInput, Text} from 'react-native';
const HP_SIMPLIFIED = "HP Simplified";

function isLocked(locked, active){
    return locked ? active : active
}

function isActive(locked, active){
    return locked && !active
}

let Label = styled(Text)((locked, active) => {
    let base = styles.labelAdjInput;
    return isActive(locked, active)? base.merge(styles.activeLabelAdjInput) : base;
});

let Field = styled(View)((locked, active) => {
    let base = styles.field;
    base.merge(isActive(locked, active) ? base.merge(styles.fieldActive) : {});
    base.merge(isLocked(locked, active) ? base.merge(styles.fieldLocked) : {});
    return base;
});

const FieldInput = styled(TextInput)((locked, active) => {
    let base = styles.field_Input;
    return isActive(locked, active) ? base.merge(styles.inputActive) : base;
});

const styles = StyleSheet.create({
    field: {
        width: "50%",
        height: "56px",
        borderRadius: "15px",
        margin: "10%",
        position: "relative",
        backgroundColor: "#FFFFFF",
        transition: "0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out",
    },

    fieldHover: {
        backgroundColor: "#FFFFFF",
        shadowColor: 'rgba(0,0,0, 0.05)', // IOS
        shadowOffset: {height: 0, width: 4}, // IOS
        shadowOpacity: 20, // IOS
        shadowRadius: 0, //IOS
    },

    //if fieldActive
    fieldActive: {
        backgroundColor: "#FFFFFF",
        shadowColor: 'rgba(0,0,0, 0.2)', // IOS
        shadowOffset: {height: 0, width: 4}, // IOS
        shadowOpacity: 20, // IOS
        shadowRadius: 0, //IOS
    },

    //if input and below active field
    inputActive: {
        paddingTop: 24,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
    },

    //if label is adjacent to

    activeLabelAdjInput: {
        top: 4,
        opacity: 1,
        color: "#512da8",
        fontFamily: HP_SIMPLIFIED,
    },

    fieldLocked: {
        pointerEvents: "",
    },

    field_Input: {
        width: "100%",
        height: 56,
        //position: relative,
        paddingVertical: 0,
        paddingHorizontal: 16,
        //       border: none,
        borderRadius: 15,
        fontFamily: HP_SIMPLIFIED,
        fontSize: 16,
        fontWeight: 400,
        //lineHeight: normal;
        backgroundColor: 'rgba(0, 0, 0, 1.0)',
        color: '#282828',
        //outline: none;
        shadowColor: 'rgba(0,0,0, 0)', // IOS
        shadowOffset: {height: 0, width: 4}, // IOS
        shadowOpacity: 20, // IOS
        shadowRadius: 0, //IOS
        transition: '0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out'
    },

    /*
    .field input::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    .field input::-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    .field input:-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    .field input:-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    */

    labelAdjInput: {
        //position: absolute;
        top: 24,
        left: 16,
        fontFamily: HP_SIMPLIFIED,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 24,
        color: '#ffffff',
        opacity: 0,
        //pointer-events: none;
        transition: "0.1s all ease-in-out",
    },

    labelAdjInputError: {
        color: "#ec392f"
    },

    field_pPredicted: {
        //position: absolute;
        top: 8,
        left: 16,
        fontFamily: HP_SIMPLIFIED,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24,
        color: '#e0e0e0',
        opacity: 1,
        //pointer-events: none;
    },
});

export {Label, Field, FieldInput};
