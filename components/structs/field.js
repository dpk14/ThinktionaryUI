import StyledInput from "../EntryBox/TextInputBox/StyledTextInput/StyledTextInput";
import React from "react";


export class Field {
    constructor(attrName, title, value) {
        this.attrName = attrName
        this.title = title
        this.value = value
        }
}

export class FieldMap {
    constructor(fieldList) {
        this.myMap = new Map();
        fieldList.forEach(field => {
            if(!(field instanceof Field)) {
                throw Error("Arguments must all be of type 'Field'");
            }
            this.myMap.set(field.attrName, field);
        })
    }

    getEntry(attrName){
        return this.myMap.get(attrName);
    }

    entries(){
        return this.myMap.entries();
    }

}
