'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fast_AbortSignalFast = require('./AbortSignalFast.cjs');
var fast_AbortError = require('./AbortError.cjs');

class AbortControllerFast {
    constructor() {
        this.signal = new fast_AbortSignalFast.AbortSignalFast();
    }
    abort(reason) {
        if (this.signal.aborted) {
            return;
        }
        if (typeof reason === 'undefined') {
            reason = new fast_AbortError.AbortError('Aborted with no reason', reason);
            reason._internal = true;
        }
        this.signal.abort(reason);
    }
}

exports.AbortControllerFast = AbortControllerFast;
