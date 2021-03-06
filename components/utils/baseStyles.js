import BackButtonImg from "../Buttons/HeaderButtons/Images/BackButtonImg";
import {HP_SIMPLIFIED_BOLD} from "./FontUtils";
import React from "react";
import {HEADER_HEIGHT} from "./scaling";

export const PURPLE = '#ae43ec';
export const ORANGE = '#E76F1F';
export const SOFT_ORANGE = '#FFB03F';
export const ENTRY_BOX_HEIGHT = 65
export const BUTTON_HEIGHT = 56
export const ENTRY_BOX_VERT_MARGIN = 6
export const NAVIGATOR_HEIGHT = 40
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
    },
    headerStyle : {
        height : HEADER_HEIGHT
    }
}
