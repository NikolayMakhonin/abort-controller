// eslint-disable-next-line @typescript-eslint/no-redeclare
const _DOMException = class DOMException extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
};

export { _DOMException as _ };
