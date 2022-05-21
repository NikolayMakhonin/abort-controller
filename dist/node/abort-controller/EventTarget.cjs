'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortController_EventTargetImpl = require('./EventTargetImpl.cjs');
require('./helpers.cjs');

const _EventTarget = (() => {
    try {
        if (typeof EventTarget !== 'undefined') {
            new EventTarget();
            return EventTarget;
        }
    }
    catch (_a) { }
    return abortController_EventTargetImpl.EventTargetImpl;
})();

exports.EventTarget = _EventTarget;
