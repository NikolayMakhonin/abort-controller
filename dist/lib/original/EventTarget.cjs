'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var original_EventTargetImpl = require('./EventTargetImpl.cjs');
require('./helpers.cjs');

// eslint-disable-next-line @typescript-eslint/no-redeclare
const _EventTarget = (() => {
    try {
        if (typeof EventTarget !== 'undefined') {
            // eslint-disable-next-line no-new
            new EventTarget();
            return EventTarget;
        }
    }
    catch (_a) {
        // empty
    }
    return original_EventTargetImpl.EventTargetImpl;
})();

exports.EventTarget = _EventTarget;
