'use strict';

const AbortSignalClass = typeof AbortSignal !== 'undefined' ? AbortSignal : void 0;
const AbortControllerClass = typeof AbortController !== 'undefined' ? AbortController : void 0;

exports.AbortControllerClass = AbortControllerClass;
exports.AbortSignalClass = AbortSignalClass;
