'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var original_helpers = require('./helpers.cjs');
var original_DOMException = require('./DOMException.cjs');
var original_EventTarget = require('./EventTarget.cjs');
require('./DOMExceptionImpl.cjs');
require('./EventTargetImpl.cjs');

/* eslint-disable func-name-matching */
const kAborted = Symbol('kAborted');
const kReason = Symbol('kReason');
const kOnAbort = Symbol('kOnAbort');
// eslint-disable-next-line @typescript-eslint/no-redeclare
const _AbortSignal = function AbortSignal() {
    const error = new TypeError('Illegal constructor');
    error.code = 'ERR_ILLEGAL_CONSTRUCTOR';
    throw error;
};
original_helpers.initClass(_AbortSignal, original_EventTarget.EventTarget);
Object.defineProperty(_AbortSignal.prototype, 'aborted', {
    get: function get() {
        original_helpers.assertThis(this, _AbortSignal);
        return this[kAborted];
    },
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AbortSignal.prototype, 'reason', {
    get: function get() {
        original_helpers.assertThis(this, _AbortSignal);
        return this[kReason];
    },
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AbortSignal.prototype, 'throwIfAborted', {
    value: function throwIfAborted() {
        original_helpers.assertThis(this, _AbortSignal);
        if (this.aborted) {
            const reason = this.reason;
            throw reason;
        }
    },
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AbortSignal.prototype, 'onabort', {
    get: function get() {
        return this[kOnAbort] || null;
    },
    set: function set(onabort) {
        // assertThis(this, __AbortSignal)
        if (this[kOnAbort] === onabort) {
            return;
        }
        if (this[kOnAbort]) {
            this.removeEventListener('abort', this[kOnAbort]);
        }
        this[kOnAbort] = onabort;
        if (this[kOnAbort]) {
            this.addEventListener('abort', this[kOnAbort]);
        }
    },
    enumerable: false,
    configurable: true,
});
function createAbortSignal() {
    const signal = new original_EventTarget.EventTarget();
    // eslint-disable-next-line new-cap
    Object.setPrototypeOf(signal, _AbortSignal.prototype);
    // ;(signal as any).constructor = EventTarget
    // ;(_AbortSignal.prototype as any).constructor = EventTarget
    signal[kAborted] = false;
    signal[kReason] = void 0;
    signal[kOnAbort] = null;
    return signal;
}
function abortSignalAbort(signal, reason) {
    if (typeof reason === 'undefined') {
        reason = new original_DOMException.DOMException('This operation was aborted', 'AbortError');
    }
    if (signal[kAborted]) {
        return;
    }
    signal[kReason] = reason;
    signal[kAborted] = true;
    signal.dispatchEvent(new Event('abort'));
    // typeof Event !== 'undefined'
    //   ? new Event('abort')
    //   : { type: 'abort' } as any)
}

exports.AbortSignalImpl = _AbortSignal;
exports.abortSignalAbort = abortSignalAbort;
exports.createAbortSignal = createAbortSignal;
