import { A as AbortSignalFast } from './AbortSignalFast.mjs';
import { A as AbortError } from './AbortError.mjs';

class AbortControllerFast {
    constructor() {
        this.signal = new AbortSignalFast();
    }
    abort(reason) {
        if (this.signal.aborted) {
            return;
        }
        if (typeof reason === 'undefined') {
            reason = new AbortError('Aborted with no reason', reason);
            reason._internal = true;
        }
        this.signal.abort(reason);
    }
}

export { AbortControllerFast as A };
