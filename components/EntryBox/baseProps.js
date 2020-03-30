

import { string, func, object, number, bool } from 'prop-types';
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
    height : 65,
    width : 275,
}
