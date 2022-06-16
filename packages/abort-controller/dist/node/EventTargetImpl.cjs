'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortController_original_helpers = require('./helpers.cjs');

// eslint-disable-next-line import/no-mutable-exports
exports.EventTargetImpl = void 0;
if (typeof window !== 'undefined') {
    exports.EventTargetImpl = function EventTarget() {
        return document.createDocumentFragment();
    };
    abortController_original_helpers.initClass(exports.EventTargetImpl, DocumentFragment);
}
