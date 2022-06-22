import { initClass } from './helpers.mjs';

// eslint-disable-next-line @typescript-eslint/no-redeclare,import/no-mutable-exports
let _EventTarget;
if (typeof window !== 'undefined') {
    _EventTarget = function EventTarget() {
        return document.createDocumentFragment();
    };
    initClass(_EventTarget, DocumentFragment);
}

export { _EventTarget as EventTargetImpl };
