'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortController_fast_AbortSignalFast = require('./AbortSignalFast.cjs');
var abortController_fast_AbortError = require('./AbortError.cjs');

class AbortControllerFast {
    constructor() {
        this.signal = new abortController_fast_AbortSignalFast.AbortSignalFast();
    }
    abort(reason) {
        if (this.signal.aborted) {
            return;
        }
        if (typeof reason === 'undefined') {
            reason = new abortController_fast_AbortError.AbortError('Aborted with no reason', reason);
            reason._internal = true;
        }
        this.signal.abort(reason);
    }
}

exports.AbortControllerFast = AbortControllerFast;
