'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortController_original_EventTargetImpl = require('./EventTargetImpl.cjs');
require('./helpers.cjs');

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
    return abortController_original_EventTargetImpl.EventTargetImpl;
})();

exports.EventTarget = _EventTarget;
