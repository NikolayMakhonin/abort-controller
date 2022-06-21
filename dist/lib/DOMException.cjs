'use strict';

var DOMExceptionImpl = require('./DOMExceptionImpl.cjs');

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
    return DOMExceptionImpl._DOMException;
})();

exports._DOMException = _DOMException;
