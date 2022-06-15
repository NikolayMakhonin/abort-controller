'use strict';

var AbortSignalImpl = require('./AbortSignalImpl.cjs');
var helpers = require('./helpers2.cjs');

const kSignal = Symbol('kSignal');
class AbortController {
    constructor() {
        // @ts-expect-error
        this[kSignal] = AbortSignalImpl.createAbortSignal();
    }
    get signal() {
        helpers.assertThis(this, AbortController);
        return this[kSignal];
    }
    abort(reason) {
        helpers.assertThis(this, AbortController);
        AbortSignalImpl.abortSignalAbort(this.signal, reason);
    }
}

exports.AbortController = AbortController;
