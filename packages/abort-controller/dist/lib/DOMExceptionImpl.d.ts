/// <reference types="node" />
declare type _DOMException = DOMException;
declare const _DOMException: {
    new (message?: string, name?: string): {
        name: string;
        message: string;
        stack?: string;
        cause?: Error;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
    stackTraceLimit: number;
};
export { _DOMException as DOMExceptionImpl };
