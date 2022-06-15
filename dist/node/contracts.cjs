'use strict';

var AbortSignalImpl = require('./AbortSignalImpl.cjs');
var AbortControllerImpl = require('./AbortControllerImpl.cjs');
var contracts = require('./contracts2.cjs');

const _AbortSignalClass = contracts.AbortSignalClass || AbortSignalImpl._AbortSignal;
const _AbortControllerClass = contracts.AbortControllerClass || AbortControllerImpl.AbortController;

exports._AbortControllerClass = _AbortControllerClass;
exports._AbortSignalClass = _AbortSignalClass;
