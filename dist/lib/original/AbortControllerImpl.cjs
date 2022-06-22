'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var original_AbortSignalImpl = require('./AbortSignalImpl.cjs');
var original_helpers = require('./helpers.cjs');
require('./DOMException.cjs');
require('./DOMExceptionImpl.cjs');
require('./EventTarget.cjs');
require('./EventTargetImpl.cjs');

/* eslint-disable @typescript-eslint/no-redeclare */
const kSignal = Symbol('kSignal');
const _AbortController = class AbortController {
    constructor() {
        this[kSignal] = original_AbortSignalImpl.createAbortSignal();
    }
    get signal() {
        original_helpers.assertThis(this, AbortController);
        return this[kSignal];
    }
    abort(reason) {
        original_helpers.assertThis(this, AbortController);
        original_AbortSignalImpl.abortSignalAbort(this.signal, reason);
    }
};

exports.AbortControllerImpl = _AbortController;
