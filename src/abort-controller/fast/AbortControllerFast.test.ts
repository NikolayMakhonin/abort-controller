/* eslint-disable no-self-assign,no-new,new-cap,func-name-matching,consistent-return */
import {createAbortControllerEqualsTest} from '../test/createAbortControllerEqualsTest'
import {AbortControllerFast} from './AbortControllerFast'
import {toAbortController, toAbortControllerFast} from './wrappers'
import {getError} from '../test/helpers'
import {AbortControllerImpl} from '../original'

const kSource = Symbol('kFast')
const kAborting = Symbol('kAborting')
const abortOrig = AbortControllerImpl.prototype.abort
Object.defineProperty(AbortControllerImpl.prototype, 'abort', {
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
    AbortController2: AbortControllerImpl,
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
      return new AbortControllerImpl()
      const abortControllerSource = new AbortControllerImpl()
      const abortControllerFast = toAbortControllerFast(abortControllerSource)
      const abortController: any = toAbortController(abortControllerFast)
      abortController[kSource] = abortControllerSource
      return abortController
    }) as any,
    AbortSignal2    : null,
    AbortController2: AbortControllerImpl,
  })
})

describe('behavior', function () {
  const onAbortArgs = []
  function onAbort(...args) {
    onAbortArgs.push([this, ...args])
  }

  it('abort undefined', function () {
    onAbortArgs.length = 0
    const abortController = new AbortControllerFast()
    assert.ok(abortController.signal)
    assert.strictEqual(abortController.signal.aborted, false)
    assert.strictEqual(abortController.signal.reason, void 0)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
    abortController.abort()
    assert.strictEqual(abortController.signal.aborted, true)
    assert.ok(abortController.signal.reason instanceof Error)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)
    abortController.signal.subscribe(onAbort)
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, abortController.signal.reason]])
    onAbortArgs.length = 0
    abortController.abort()
    assert.deepStrictEqual(onAbortArgs, [])
    abortController.abort('abort')
    assert.deepStrictEqual(onAbortArgs, [])
    assert.strictEqual(abortController.signal.aborted, true)
    assert.ok(abortController.signal.reason instanceof Error)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)
  })

  it('abort reason', function () {
    const reason = Math.random()
    onAbortArgs.length = 0
    const abortController = new AbortControllerFast()
    assert.ok(abortController.signal)
    assert.strictEqual(abortController.signal.aborted, false)
    assert.strictEqual(abortController.signal.reason, void 0)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
    abortController.abort(reason)
    assert.strictEqual(abortController.signal.aborted, true)
    assert.ok(abortController.signal.reason instanceof Error)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)
    abortController.signal.subscribe(onAbort)
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, abortController.signal.reason]])
    onAbortArgs.length = 0
    abortController.abort()
    assert.deepStrictEqual(onAbortArgs, [])
    abortController.abort('abort')
    assert.deepStrictEqual(onAbortArgs, [])
    assert.strictEqual(abortController.signal.aborted, true)
    assert.ok(abortController.signal.reason instanceof Error)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)
  })

  it('abort unsubscribe', function () {
    const reason = new Error(Math.random() + '')
    onAbortArgs.length = 0
    const abortController = new AbortControllerFast()
    assert.ok(abortController.signal)
    assert.strictEqual(abortController.signal.aborted, false)
    assert.strictEqual(abortController.signal.reason, void 0)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
    abortController.signal.subscribe(onAbort)()
    abortController.abort(reason)
    assert.strictEqual(abortController.signal.aborted, true)
    assert.strictEqual(abortController.signal.reason, reason)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
    abortController.signal.subscribe(onAbort)
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, reason]])
    onAbortArgs.length = 0
    abortController.abort()
    assert.deepStrictEqual(onAbortArgs, [])
    abortController.abort('abort')
    assert.deepStrictEqual(onAbortArgs, [])
    assert.strictEqual(abortController.signal.aborted, true)
    assert.strictEqual(abortController.signal.reason, reason)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
  })

  it('abort subscribe', function () {
    const reason = new Error(Math.random() + '')
    onAbortArgs.length = 0
    const abortController = new AbortControllerFast()
    assert.ok(abortController.signal)
    assert.strictEqual(abortController.signal.aborted, false)
    assert.strictEqual(abortController.signal.reason, void 0)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
    abortController.signal.subscribe(onAbort)
    assert.ok(getError(() => abortController.signal.subscribe(onAbort)) instanceof Error)
    abortController.abort(reason)
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, reason]])
    onAbortArgs.length = 0
    assert.strictEqual(abortController.signal.aborted, true)
    assert.strictEqual(abortController.signal.reason, reason)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
    abortController.signal.subscribe(function() { onAbort.apply(this, arguments) })
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, reason]])
    onAbortArgs.length = 0
    abortController.signal.subscribe(onAbort)
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, reason]])
    onAbortArgs.length = 0
    abortController.abort()
    assert.deepStrictEqual(onAbortArgs, [])
    abortController.abort('abort')
    assert.deepStrictEqual(onAbortArgs, [])
    assert.strictEqual(abortController.signal.aborted, true)
    assert.strictEqual(abortController.signal.reason, reason)
    assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
  })
})
