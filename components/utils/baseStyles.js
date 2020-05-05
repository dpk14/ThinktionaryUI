import BackButtonImg from "../Buttons/HeaderButtons/Images/BackButtonImg";
import {HP_SIMPLIFIED_BOLD} from "./FontUtils";
import React from "react";

export const PURPLE = '#ae43ec';
export const ORANGE = '#E76F1F';
export const SOFT_ORANGE = '#FFB03F';
export let HEADER_STYLES = {
    headerTitle: "Thinktionary",
    headerBackTitle: " ",
    headerBackImage: () => {
        return <BackButtonImg/>
    },
    headerTransparent: true,
    gestureResponseDistance: {horizontal: 600},
    headerTitleStyle: {
        color: '#FFFFFF',
        fontFamily: HP_SIMPLIFIED_BOLD,
        shadowOffset: {height: 4},
        shadowRadius: 20,
        shadowOpacity: .5
    }
}
