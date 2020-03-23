
export default class fetchError extends Error{
    constructor(message, status, response) {
        super(message);
        this.status = status;
        this.response = response;
    }
}
