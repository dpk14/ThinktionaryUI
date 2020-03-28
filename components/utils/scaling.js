import React, { Component } from 'react';
import {StyleSheet, View} from "react-native";
import {HP_SIMPLIFIED_BOLD} from "./FontUtils";

export function _scale(prop, scale){
    if(typeof prop == "string" && prop.includes("%")){
        return scalePercentage(prop, scale)
    }
    return(prop*scale)
}

export function invScale(prop, scale){
    return(prop*(1/scale))
}

export function scalePercentage(percentage, scale){
    return percentage
    /*
    let scaledInt = parseInt((percentage.substring(0, percentage.length-1)))*scale;
    return (scaledInt > 100 ? 100 : scaledInt) + "%"
    */
}
