class DOMException extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
}

export { DOMException as D };
