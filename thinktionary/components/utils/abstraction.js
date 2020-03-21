import {AbstractClassError, AbstractMethodError} from "../errors/AbstractError";

export const ABSTRACT_CLASS = () => {
    throw new AbstractClassError()
}

export const ABSTRACT_METHOD = () => {
    throw new AbstractMethodError()
}
