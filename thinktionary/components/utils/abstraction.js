import {AbstractClassError, AbstractMethodError} from "../errors/AbstractError";

export const ABSTRACT_CLASS = (message="") => {
    throw new AbstractClassError(message)
}

export const ABSTRACT_METHOD = (message="") => {
    throw new AbstractMethodError(message)
}
