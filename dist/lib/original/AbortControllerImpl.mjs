import { createAbortSignal, abortSignalAbort } from './AbortSignalImpl.mjs';
import { assertThis } from './helpers.mjs';
import './DOMException.mjs';
import './DOMExceptionImpl.mjs';
import './EventTarget.mjs';
import './EventTargetImpl.mjs';

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

export { _AbortController as AbortControllerImpl };
