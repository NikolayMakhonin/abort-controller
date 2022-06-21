'use strict';

var AbortSignalFast = require('./AbortSignalFast.cjs');
var AbortError = require('./AbortError.cjs');

class AbortControllerFast {
    constructor() {
        this.signal = new AbortSignalFast.AbortSignalFast();
    }
    abort(reason) {
        if (this.signal.aborted) {
            return;
        }
        if (typeof reason === 'undefined') {
            reason = new AbortError.AbortError('Aborted with no reason', reason);
            reason._internal = true;
        }
        this.signal.abort(reason);
    }
}

exports.AbortControllerFast = AbortControllerFast;
