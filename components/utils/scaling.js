import React, { Component } from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {HP_SIMPLIFIED_BOLD} from "./FontUtils";
export const HEADER_HEIGHT = 80

export function _scale(prop, scale){
    if(typeof prop == "string" && prop.includes("%")){
        return prop
    }
    return(prop*scale)
}

export function invScale(prop, scale){
    return(prop*(1/scale))
}

export function scalePercentage(percentage, scale){
    let scaledInt = parseInt((percentage.substring(0, percentage.length-1)))*scale;
    return (scaledInt > 100 ? 100 : scaledInt) + "%"
}

export function getScreenWidth(){
    return Math.round(Dimensions.get('window').width)
}

export function getScreenHeight(){
    return Math.round(Dimensions.get('window').height)
}


