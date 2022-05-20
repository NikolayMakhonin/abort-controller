/* eslint-disable no-self-assign,no-new,new-cap */
import {AbortControllerImpl} from './AbortController'
import {AbortSignalImpl} from './AbortSignal'
import {getError, test} from './test/helpers'

describe('abort-controller > AbortController', function () {
  this.timeout(60000)

  const AbortSignal1 = AbortSignalImpl
  const AbortSignal2 = AbortSignal
  const AbortController1 = AbortControllerImpl
  const AbortController2 = AbortController

  before(() => {
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
  })
})
