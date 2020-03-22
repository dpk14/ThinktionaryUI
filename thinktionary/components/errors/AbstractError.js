import {ABSTRACT_CLASS, ABSTRACT_METHOD} from "../../configStrings";

export class AbstractMethodError extends Error{
    constructor(message="") {
        super("Must implement abstract method: " + message);
    }
}

export class AbstractClassError extends Error{
    constructor(message="") {
        super(ABSTRACT_CLASS + " " + message);
    }
}
