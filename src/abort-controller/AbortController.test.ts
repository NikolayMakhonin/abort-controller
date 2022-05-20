/* eslint-disable no-self-assign,no-new,new-cap */
import {AbortControllerImpl} from './AbortControllerImpl'
import {AbortSignalImpl} from './AbortSignalImpl'
import {getError, isLatestNodeVersion, processVersion, test} from './test/helpers'

describe('abort-controller > AbortController', function () {
  this.timeout(60000)

  const AbortSignal1 = AbortSignalImpl
  const AbortController1 = AbortControllerImpl
  const AbortSignal2 = isLatestNodeVersion ? AbortSignal : AbortSignalImpl
  const AbortController2 = isLatestNodeVersion ? AbortController : AbortControllerImpl

  before(() => {
    console.log('process.version = ' + processVersion)
    console.log('isLatestNodeVersion = ' + isLatestNodeVersion)

    test({
      repeat  : 2,
      message : 'AbortController',
      actual  : AbortController1,
      expected: AbortController1,
      func    : (o) => new o(),
    })
    test({
      repeat  : 2,
      message : 'AbortController',
      actual  : AbortController2,
      expected: AbortController2,
      func    : (o) => new o(),
    })
  })

  describe('base', function () {
    it('base', function () {
      const abortController = new AbortController1()
      // TODO
    })
  })

  describe('constructors', function () {
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
        func    : (o) => getError(() => { new o() }),
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
        func    : (o) => getError(() => { new o() }),
      })
    })
  })

  describe('instances', function () {
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
          }
          abortController.signal.addEventListener('abort', onAbort)
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
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
            onAbortArgs.push(args)
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
})
