//export const ABSTRACT_CLASS = "Cannot instantiate abstract class ";
//export const ABSTRACT_METHOD = "Cannot call abstract method ";

import {AbstractClassError, AbstractMethodError} from "../errors/AbstractError";

export const ABSTRACT_CLASS = (message="") => {
    throw new AbstractClassError(message)
}

export const ABSTRACT_METHOD = (message="") => {
    throw new AbstractMethodError(message)
}
