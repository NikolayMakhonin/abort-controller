import { D as DOMException$1 } from './DOMExceptionImpl.mjs';

const _DOMException = (() => {
    try {
        if (typeof DOMException !== 'undefined') {
            // eslint-disable-next-line no-new
            new DOMException();
            return DOMException;
        }
    }
    catch (_a) {
        // empty
    }
    return DOMException$1;
})();

export { _DOMException as _ };
