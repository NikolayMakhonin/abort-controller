import { EventTargetImpl as _EventTarget$1 } from './EventTargetImpl.mjs';
import './helpers.mjs';

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

export { _EventTarget as EventTarget };
