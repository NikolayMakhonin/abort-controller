declare class DOMException extends Error {
    readonly name: string;
    constructor(message?: string, name?: string);
}
export { DOMException as DOMExceptionImpl };
