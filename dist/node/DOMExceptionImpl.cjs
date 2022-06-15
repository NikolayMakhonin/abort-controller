'use strict';

class DOMException extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
}

exports.DOMException = DOMException;
