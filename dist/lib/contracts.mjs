import { _ as _AbortSignal } from './AbortSignalImpl.mjs';
import { _ as _AbortController } from './AbortControllerImpl.mjs';
import { A as AbortSignalClass, a as AbortControllerClass } from './contracts2.mjs';

const _AbortSignalClass = AbortSignalClass || _AbortSignal;
const _AbortControllerClass = AbortControllerClass || _AbortController;

export { _AbortSignalClass as _, _AbortControllerClass as a };
