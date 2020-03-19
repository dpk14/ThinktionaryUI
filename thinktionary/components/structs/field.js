import EntryBox from "../EntryBox";
import React from "react";


class Field {
    constructor(attrName, title, value) {

        for(let attrName in this.props.fields){
            let title = this.props[attrName].title;
            let value = this.props[attrName].value;
            const entry = <EntryBox
                attrName = {attrName}
                title = {title}
                value = {value}
                updateMasterState = {this._updateMasterState}
            />;
            arr.push(entry);
        }
    }
}
