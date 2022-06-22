import { AbortError } from './AbortError.mjs';

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
        if (reason instanceof AbortError && reason._internal) {
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

export { toAbortController, toAbortControllerFast, toAbortSignal, toAbortSignalFast };
