import {ABSTRACT_METHOD} from "./abstraction";

export function Override(props, propName, defaultFunc){
    return defaultFunc == ABSTRACT_METHOD ? props[propName] : defaultFunc
}

export function setOrDefault(props, attrName, defaultFunc){
    return props[attrName] == StyledInput.defaultProps[attrName] ? defaultFunc : props[attrName]
}
