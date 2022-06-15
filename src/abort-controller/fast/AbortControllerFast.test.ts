/* eslint-disable no-self-assign,no-new,new-cap,func-name-matching,consistent-return */
import {createAbortControllerEqualsTest} from '../test/createAbortControllerEqualsTest'
import {AbortControllerFast} from './AbortControllerFast'
import {toAbortController, toAbortControllerFast} from './wrappers'
import {getError} from '../test/helpers'
import {AbortControllerImpl} from '../original'
import {createTestVariantsSync} from '@flemist/test-variants'
import {AbortError} from './AbortError'
import {IUnsubscribe} from './contracts'

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
      const abortController: any = toAbortController(abortControllerFast, new AbortControllerImpl())
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
      const abortControllerSource = new AbortControllerImpl()
      const abortControllerFast = toAbortControllerFast(abortControllerSource, new AbortControllerFast())
      const abortController: any = toAbortController(abortControllerFast, new AbortControllerImpl())
      abortController[kSource] = abortControllerSource
      return abortController
    }) as any,
    AbortSignal2    : null,
    AbortController2: AbortControllerImpl,
  })
})

describe('behavior', function () {
  const testVariants = createTestVariantsSync(({
    unsubscribe,
    subscribe,
    reason,
  }: {
    unsubscribe: boolean,
    subscribe: boolean,
    reason: any,
  }) => {
    const onAbortArgs = []
    function onAbort(...args) {
      onAbortArgs.push([this, ...args])
    }

    const abortController = new AbortControllerFast()

    function checkBeforeAbort() {
      assert.ok(abortController.signal)
      assert.strictEqual(abortController.signal.aborted, false)
      assert.strictEqual(abortController.signal.reason, void 0)
      assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
    }

    function checkAfterAbort() {
      assert.strictEqual(abortController.signal.aborted, true)
      if (typeof reason !== 'undefined') {
        assert.strictEqual(abortController.signal.reason, reason)
      }
      else {
        assert.ok(abortController.signal.reason instanceof AbortError)
        assert.strictEqual(abortController.signal.reason.reason, reason)
      }
      assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)
    }

    checkBeforeAbort()
    let unsubscribeFunc: IUnsubscribe
    if (unsubscribe) {
      unsubscribeFunc = abortController.signal.subscribe(onAbort)
      assert.ok(typeof unsubscribeFunc === 'function')
      unsubscribeFunc()
    }
    if (subscribe) {
      unsubscribeFunc = abortController.signal.subscribe(onAbort)
      assert.ok(typeof unsubscribeFunc === 'function')
    }

    if (typeof reason === 'undefined') {
      abortController.abort()
    }
    else {
      abortController.abort(reason)
    }
    checkAfterAbort()

    if (subscribe) {
      assert.deepStrictEqual(onAbortArgs, [[abortController.signal, abortController.signal.reason]])
      onAbortArgs.length = 0
    }
    else {
      assert.deepStrictEqual(onAbortArgs, [])
    }

    unsubscribeFunc = abortController.signal.subscribe(onAbort)
    assert.ok(typeof unsubscribeFunc === 'function')
    checkAfterAbort()
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, abortController.signal.reason]])
    onAbortArgs.length = 0

    unsubscribeFunc = abortController.signal.subscribe(onAbort)
    assert.ok(typeof unsubscribeFunc === 'function')
    checkAfterAbort()
    assert.deepStrictEqual(onAbortArgs, [[abortController.signal, abortController.signal.reason]])
    onAbortArgs.length = 0

    unsubscribeFunc()
    assert.ok(typeof unsubscribeFunc === 'function')
    checkAfterAbort()
    assert.deepStrictEqual(onAbortArgs, [])

    abortController.abort()
    checkAfterAbort()
    assert.deepStrictEqual(onAbortArgs, [])

    abortController.abort('abort')
    checkAfterAbort()
    assert.deepStrictEqual(onAbortArgs, [])
  })

  it('variants', function () {
    const count = testVariants({
      unsubscribe: [false, true],
      subscribe  : [false, true],
      reason     : [void 0, null, false, '', 'str', new Error(), new AbortError(), Symbol('')],
    })
    console.log('variants: ' + count)
  })
})
