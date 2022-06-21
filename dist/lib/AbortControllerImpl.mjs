import { c as createAbortSignal, a as abortSignalAbort } from './AbortSignalImpl.mjs';
import { a as assertThis } from './helpers2.mjs';

const kSignal = Symbol('kSignal');
class AbortController {
    constructor() {
        // @ts-expect-error
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
}

export { AbortController as A };
