import {ABSTRACT_CLASS, ABSTRACT_METHOD} from "../../configStrings";

export class AbstractMethodError extends Error{
    constructor() {
        super(ABSTRACT_METHOD);
    }
}

export class AbstractClassError extends Error{
    constructor() {
        super(ABSTRACT_CLASS);
    }
}
