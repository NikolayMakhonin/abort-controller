/// <reference lib="dom" />
/* eslint-disable no-self-assign,no-new,new-cap */
import {ERROR_UNDEFINED, getError, isLatestNodeVersion, processVersion, test} from './helpers'
import {AbortControllerClass, AbortSignalClass} from '../test/contracts'

export function createAbortControllerEqualsTest({
  _this,
  behavior,
  equalsConstructors,
  equalsInstances,
  AbortSignal1,
  AbortController1,
  AbortSignal2,
  AbortController2,
}: {
  _this: any,
  behavior: boolean,
  equalsConstructors: boolean,
  equalsInstances: boolean,
  AbortSignal1: typeof AbortSignalClass,
  AbortController1: typeof AbortControllerClass,
  AbortSignal2: typeof AbortSignalClass,
  AbortController2: typeof AbortControllerClass,
}) {
  _this.timeout(60000)

  before(() => {
    console.log('process.version = ' + processVersion)
    console.log('isLatestNodeVersion = ' + isLatestNodeVersion)

    if (AbortController1) {
      test({
        repeat  : 2,
        message : 'AbortController',
        actual  : AbortController1,
        expected: AbortController1,
        func    : (o) => new o(),
      })
    }
    if (AbortController2) {
      test({
        repeat  : 2,
        message : 'AbortController',
        actual  : AbortController2,
        expected: AbortController2,
        func    : (o) => new o(),
      })
    }
  })

  if (behavior) {
    describe('behavior', function () {
      const onAbortArgs = []
      function onAbort(...args) {
        onAbortArgs.push([this, ...args])
      }

      it('abort undefined', function () {
        onAbortArgs.length = 0
        const abortController = new AbortController1()
        assert.ok(abortController.signal)
        assert.strictEqual(abortController.signal.aborted, false)
        assert.strictEqual(abortController.signal.reason, void 0)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
        abortController.abort()
        assert.strictEqual(abortController.signal.aborted, true)
        assert.ok(abortController.signal.reason instanceof Error)
            assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)

        abortController.signal.addEventListener('abort', onAbort)
        assert.deepStrictEqual(onAbortArgs, [])
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
        const abortController = new AbortController1()
        assert.ok(abortController.signal)
        assert.strictEqual(abortController.signal.aborted, false)
        assert.strictEqual(abortController.signal.reason, void 0)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
        abortController.abort(reason)
        assert.strictEqual(abortController.signal.aborted, true)
        assert.strictEqual(abortController.signal.reason, reason)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
        abortController.signal.addEventListener('abort', onAbort)
        assert.deepStrictEqual(onAbortArgs, [])
        abortController.abort()
        assert.deepStrictEqual(onAbortArgs, [])
        abortController.abort('abort')
        assert.deepStrictEqual(onAbortArgs, [])
        assert.strictEqual(abortController.signal.aborted, true)
        assert.strictEqual(abortController.signal.reason, reason)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
      })

      it('abort unsubscribe', function () {
        const reason = Math.random()
        onAbortArgs.length = 0
        const abortController = new AbortController1()
        assert.ok(abortController.signal)
        assert.strictEqual(abortController.signal.aborted, false)
        assert.strictEqual(abortController.signal.reason, void 0)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
        abortController.signal.addEventListener('abort', onAbort)
        abortController.signal.removeEventListener('abort', onAbort)
        abortController.abort(reason)
        assert.strictEqual(abortController.signal.aborted, true)
        assert.strictEqual(abortController.signal.reason, reason)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
        abortController.signal.addEventListener('abort', onAbort)
        assert.deepStrictEqual(onAbortArgs, [])
        abortController.abort()
        assert.deepStrictEqual(onAbortArgs, [])
        abortController.abort('abort')
        assert.deepStrictEqual(onAbortArgs, [])
        assert.strictEqual(abortController.signal.aborted, true)
        assert.strictEqual(abortController.signal.reason, reason)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
      })

      it('abort subscribe', function () {
        const reason = Math.random()
        onAbortArgs.length = 0
        const abortController = new AbortController1()
        assert.ok(abortController.signal)
        assert.strictEqual(abortController.signal.aborted, false)
        assert.strictEqual(abortController.signal.reason, void 0)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), void 0)
        abortController.signal.addEventListener('abort', onAbort)
        abortController.abort(reason)
        assert.strictEqual(abortController.signal.aborted, true)
        assert.strictEqual(abortController.signal.reason, reason)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
        abortController.signal.addEventListener('abort', function() { onAbort.apply(this, arguments) })
        assert.strictEqual(onAbortArgs.length, 1)
        assert.strictEqual(onAbortArgs[0].length, 2)
        assert.strictEqual(onAbortArgs[0][0], abortController.signal)
        assert.ok(onAbortArgs[0][1] instanceof Event)
        onAbortArgs.length = 0
        abortController.signal.addEventListener('abort', onAbort)
        assert.deepStrictEqual(onAbortArgs, [])
        abortController.abort()
        assert.deepStrictEqual(onAbortArgs, [])
        abortController.abort('abort')
        assert.deepStrictEqual(onAbortArgs, [])
        assert.strictEqual(abortController.signal.aborted, true)
        assert.strictEqual(abortController.signal.reason, reason)
        assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), reason)
      })
    })
  }

  if (equalsConstructors) {
    describe('equalsConstructors', function () {
      it('AbortSignal', function () {
        test({
          repeat  : 2,
          message : 'AbortSignal',
          actual  : AbortSignal1,
          expected: AbortSignal2,
          func    : o => o,
        })
        test({
          repeat  : 2,
          message : 'new AbortSignal',
          actual  : AbortSignal1,
          expected: AbortSignal2,
          func    : (o) => getError(() => {
            new o()
          }),
        })
      })

      it('AbortController', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => o,
        })
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => getError(() => {
            new o()
          }),
        })
      })
    })
  }

  if (equalsInstances) {
    describe('equalsInstances', function () {
      it('AbortController', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => new o(),
        })
      })

      it('AbortSignal subscribe', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal subscribe abort undefined', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            abortController.abort()
            abortController.abort()
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal subscribe abort reason', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            abortController.abort('abort')
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal subscribe abort multiple', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            abortController.abort()
            abortController.abort('abort')
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal unsubscribe', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            abortController.signal.removeEventListener('abort', onAbort)
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal unsubscribe abort', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            abortController.signal.removeEventListener('abort', onAbort)
            abortController.abort()
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal unsubscribe abort multiple', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            abortController.signal.removeEventListener('abort', onAbort)
            abortController.abort()
            abortController.abort('abort')
            return {
              abortController,
              onAbortArgs,
            }
          },
        })
      })

      it('AbortSignal throwIfAborted undefined', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            const error1 = getError(() => (abortController.signal as any).throwIfAborted())
            abortController.abort()
            const error2 = getError(() => (abortController.signal as any).throwIfAborted())
            return {
              abortController,
              onAbortArgs,
              error1,
              error2,
            }
          },
        })
      })

      it('AbortSignal throwIfAborted reason', function () {
        test({
          repeat  : 2,
          message : 'AbortController',
          actual  : AbortController1,
          expected: AbortController2,
          func    : (o) => {
            const abortController = new o()
            const onAbortArgs = []

            function onAbort(...args) {
              onAbortArgs.push([this, ...args])
            }

            abortController.signal.addEventListener('abort', onAbort)
            const error1 = getError(() => (abortController.signal as any).throwIfAborted())
            abortController.abort('abort')
            const error2 = getError(() => (abortController.signal as any).throwIfAborted())
            return {
              abortController,
              onAbortArgs,
              error1,
              error2,
            }
          },
        })
      })
    })
  }
}
