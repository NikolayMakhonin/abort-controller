'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fast_AbortError = require('./AbortError.cjs');

function toAbortSignal(abortSignalFast, abortController) {
    abortSignalFast.subscribe((reason) => {
        abortController.abort(reason);
    });
    return abortController.signal;
}
function toAbortSignalFast(abortSignal, abortControllerFast) {
    function onAbort(reason) {
        abortControllerFast.abort(reason);
    }
    abortSignal.addEventListener('abort', onAbort);
    return abortControllerFast.signal;
}
function toAbortController(abortControllerFast, abortController) {
    abortControllerFast.signal.subscribe((reason) => {
        if (reason instanceof fast_AbortError.AbortError && reason._internal) {
            reason = reason.reason;
        }
        abortController.abort(reason);
    });
    return abortController;
}
function toAbortControllerFast(abortController, abortControllerFast) {
    function onAbort() {
        abortControllerFast.abort(this.reason);
    }
    abortController.signal.addEventListener('abort', onAbort);
    return abortControllerFast;
}

exports.toAbortController = toAbortController;
exports.toAbortControllerFast = toAbortControllerFast;
exports.toAbortSignal = toAbortSignal;
exports.toAbortSignalFast = toAbortSignalFast;
