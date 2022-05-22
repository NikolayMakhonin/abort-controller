/// <reference lib="dom" />
/* eslint-disable no-self-assign,no-new,new-cap */
import {getError, isLatestNodeVersion, processVersion, test} from './helpers'
import {AbortControllerClass, AbortSignalClass} from '../contracts'

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
      it('base', function () {
        const abortController = new AbortController1()
        assert.ok(abortController.signal)
        assert.strictEqual(abortController.signal.aborted, false)
        assert.strictEqual(abortController.signal.reason, void 0)
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
