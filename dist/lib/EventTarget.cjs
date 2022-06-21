'use strict';

var EventTargetImpl = require('./EventTargetImpl.cjs');

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
    return EventTargetImpl._EventTarget;
})();

exports._EventTarget = _EventTarget;
