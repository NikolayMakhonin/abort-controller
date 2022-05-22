/* eslint-disable no-self-assign,no-new,new-cap,func-name-matching,consistent-return */
import {createAbortControllerEqualsTest} from '../test/createAbortControllerEqualsTest'
import {AbortControllerFast} from './AbortControllerFast'
import {toAbortController, toAbortControllerFast} from './wrappers'
import {AbortControllerClass} from '../contracts'

const kSource = Symbol('kFast')
const kAborting = Symbol('kAborting')
const abortOrig = AbortControllerClass.prototype.abort
Object.defineProperty(AbortControllerClass.prototype, 'abort', {
  value: function abort(reason: any) {
    if (!this[kAborting] && this[kSource]) {
      this[kAborting] = !this[kSource].aborted
      return this[kSource].abort(reason)
    }
    this[kAborting] = false
    abortOrig.call(this, reason)
  },
  writable: true,
})

describe('abort-controller > AbortControllerFast > toAbortController', function () {
  createAbortControllerEqualsTest({
    _this             : this,
    behavior          : true,
    equalsConstructors: true,
    equalsInstances   : true,
    AbortSignal1      : null,
    AbortController1  : (function AbortController() {
      const abortControllerFast = new AbortControllerFast()
      const abortController: any = toAbortController(abortControllerFast)
      abortController[kSource] = abortControllerFast
      return abortController
    }) as any,
    AbortSignal2    : null,
    AbortController2: AbortController,
  })
})

describe('abort-controller > AbortControllerFast > toAbortControllerFast', function () {
  createAbortControllerEqualsTest({
    _this             : this,
    behavior          : true,
    equalsConstructors: true,
    equalsInstances   : true,
    AbortSignal1      : null,
    AbortController1  : (function AbortController() {
      const abortControllerSource = new AbortControllerClass()
      const abortControllerFast = toAbortControllerFast(abortControllerSource)
      const abortController: any = toAbortController(abortControllerFast)
      abortController[kSource] = abortControllerSource
      return abortController
    }) as any,
    AbortSignal2    : null,
    AbortController2: AbortController,
  })
})
