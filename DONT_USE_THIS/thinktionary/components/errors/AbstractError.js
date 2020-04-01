
export class AbstractMethodError extends Error{
    constructor(message="") {
        super("Must implement abstract method: " + message);
    }
}

export class AbstractClassError extends Error{
    constructor(message="") {
        super("Cannot instantiate abstract class: " + message);
    }
}
