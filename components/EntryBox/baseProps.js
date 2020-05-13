

import { string, func, object, number, bool } from 'prop-types';
import {ENTRY_BOX_HEIGHT} from "../utils/baseStyles";
export const basePropTypes = {
    width : number | string,
    height : number | string,
    scale : number,
    textMarginLeft : number,
    textMarginRight : number,
    borderRadius : number,
}

export const basePropDefaults = {
    borderRadius: 20,
    textMarginLeft : 21,
    textMarginRight : 21,
    scale : 1,
    height : ENTRY_BOX_HEIGHT,
    width : 275,
}
