import { _ as _EventTarget$1 } from './EventTargetImpl.mjs';

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
    return _EventTarget$1;
})();

export { _EventTarget as _ };
