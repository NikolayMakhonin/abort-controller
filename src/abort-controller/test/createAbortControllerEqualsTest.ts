/// <reference lib="dom" />
/* eslint-disable no-self-assign,no-new,new-cap */
import {ERROR_UNDEFINED, getError, isLatestNodeVersion, processVersion, test} from './helpers'
import {AbortControllerClass, AbortSignalClass} from '../test/contracts'
import {createTestVariantsSync} from '@flemist/test-variants'
import {IUnsubscribe} from '../fast'
import {AbortError} from '../fast/AbortError'

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

        const abortController = new AbortController1()

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
          } else {
            assert.ok(abortController.signal.reason instanceof Error)
          }
          assert.strictEqual(getError(() => abortController.signal.throwIfAborted()), abortController.signal.reason)
        }

        checkBeforeAbort()
        if (unsubscribe) {
          abortController.signal.removeEventListener('abort', onAbort)
          abortController.signal.addEventListener('abort', onAbort)
          abortController.signal.removeEventListener('abort', onAbort)
        }
        if (subscribe) {
          abortController.signal.addEventListener('abort', onAbort)
        }

        if (typeof reason === 'undefined') {
          abortController.abort()
        } else {
          abortController.abort(reason)
        }
        checkAfterAbort()

        if (subscribe) {
          assert.strictEqual(onAbortArgs.length, 1)
          assert.strictEqual(onAbortArgs[0].length, 2)
          assert.strictEqual(onAbortArgs[0][0], abortController.signal)
          assert.ok(onAbortArgs[0][1] instanceof Event)
          onAbortArgs.length = 0
        } else {
          assert.deepStrictEqual(onAbortArgs, [])
        }

        abortController.signal.addEventListener('abort', onAbort)
        checkAfterAbort()
        assert.deepStrictEqual(onAbortArgs, [])

        abortController.signal.addEventListener('abort', onAbort)
        checkAfterAbort()
        assert.deepStrictEqual(onAbortArgs, [])

        abortController.abort()
        checkAfterAbort()
        assert.deepStrictEqual(onAbortArgs, [])

        abortController.abort('abort')
        checkAfterAbort()
        assert.deepStrictEqual(onAbortArgs, [])

        abortController.signal.removeEventListener('abort', onAbort)
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
