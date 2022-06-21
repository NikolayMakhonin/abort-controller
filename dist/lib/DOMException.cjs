'use strict';

var DOMExceptionImpl = require('./DOMExceptionImpl.cjs');

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
    return DOMExceptionImpl.DOMException;
})();

exports._DOMException = _DOMException;
