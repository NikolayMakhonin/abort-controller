import { _ as _DOMException$1 } from './DOMExceptionImpl.mjs';

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
    return _DOMException$1;
})();

export { _DOMException as _ };
