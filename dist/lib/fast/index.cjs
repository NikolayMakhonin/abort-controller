'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fast_wrappers = require('./wrappers.cjs');
var fast_AbortControllerFast = require('./AbortControllerFast.cjs');
var fast_AbortError = require('./AbortError.cjs');
require('./AbortSignalFast.cjs');



exports.toAbortController = fast_wrappers.toAbortController;
exports.toAbortControllerFast = fast_wrappers.toAbortControllerFast;
exports.toAbortSignal = fast_wrappers.toAbortSignal;
exports.toAbortSignalFast = fast_wrappers.toAbortSignalFast;
exports.AbortControllerFast = fast_AbortControllerFast.AbortControllerFast;
exports.AbortError = fast_AbortError.AbortError;
