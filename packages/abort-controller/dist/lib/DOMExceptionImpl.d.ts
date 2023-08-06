/// <reference types="node" />
declare type _DOMException = DOMException;
declare const _DOMException: {
    new (message?: string, name?: string): {
        name: string;
        message: string;
        stack?: string | undefined;
        cause?: Error | undefined;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
export { _DOMException as DOMExceptionImpl };
