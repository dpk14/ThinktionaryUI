import {ABSTRACT_METHOD} from "./abstraction";

export function Override(props, propName, defaultFunc){
    return defaultFunc == ABSTRACT_METHOD ? props[propName] : defaultFunc
}

export function setOrDefault(current, _default, builtIn){
    return current == _default ? builtIn : current
}
