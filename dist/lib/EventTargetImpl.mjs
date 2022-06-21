import { i as initClass } from './helpers2.mjs';

// eslint-disable-next-line import/no-mutable-exports
let _EventTarget;
if (typeof window !== 'undefined') {
    _EventTarget = function EventTarget() {
        return document.createDocumentFragment();
    };
    initClass(_EventTarget, DocumentFragment);
}

export { _EventTarget as _ };
