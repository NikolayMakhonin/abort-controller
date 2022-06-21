'use strict';

var AbortSignalImpl = require('./AbortSignalImpl.cjs');
var helpers = require('./helpers2.cjs');

/* eslint-disable @typescript-eslint/no-redeclare */
const kSignal = Symbol('kSignal');
const _AbortController = class AbortController {
    constructor() {
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
};

exports._AbortController = _AbortController;
