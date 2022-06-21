import { c as createAbortSignal, a as abortSignalAbort } from './AbortSignalImpl.mjs';
import { a as assertThis } from './helpers2.mjs';

/* eslint-disable @typescript-eslint/no-redeclare */
const kSignal = Symbol('kSignal');
const _AbortController = class AbortController {
    constructor() {
        this[kSignal] = createAbortSignal();
    }
    get signal() {
        assertThis(this, AbortController);
        return this[kSignal];
    }
    abort(reason) {
        assertThis(this, AbortController);
        abortSignalAbort(this.signal, reason);
    }
};

export { _AbortController as _ };
