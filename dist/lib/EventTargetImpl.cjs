'use strict';

var helpers = require('./helpers2.cjs');

// eslint-disable-next-line import/no-mutable-exports
exports._EventTarget = void 0;
if (typeof window !== 'undefined') {
    exports._EventTarget = function EventTarget() {
        return document.createDocumentFragment();
    };
    helpers.initClass(exports._EventTarget, DocumentFragment);
}
