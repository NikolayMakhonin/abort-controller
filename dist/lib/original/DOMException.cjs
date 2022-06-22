'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var original_DOMExceptionImpl = require('./DOMExceptionImpl.cjs');

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
    return original_DOMExceptionImpl.DOMExceptionImpl;
})();

exports.DOMException = _DOMException;
