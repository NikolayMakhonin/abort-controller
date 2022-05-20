/* eslint-disable no-self-assign,no-new */
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
      actual  : () => new AbortController1(),
      expected: () => new AbortController1(),
    })
    test({
      repeat  : 2,
      message : 'AbortController',
      actual  : () => new AbortController2(),
      expected: () => new AbortController2(),
    })
  })

  describe('constructors', function () {
    it('AbortSignal', function () {
      test({
        repeat  : 2,
        message : 'AbortSignal',
        actual  : () => AbortSignal1,
        expected: () => AbortSignal2,
      })
      test({
        repeat  : 2,
        message : 'new AbortSignal',
        actual  : () => getError(() => { new AbortSignal1() }),
        expected: () => getError(() => { new AbortSignal2() }),
      })
    })

    it('AbortController', function () {
      test({
        repeat  : 2,
        message : 'AbortController',
        actual  : () => AbortController1,
        expected: () => AbortController2,
      })
      test({
        repeat  : 2,
        message : 'AbortController',
        actual  : () => getError(() => { new AbortController1() }),
        expected: () => getError(() => { new AbortController2() }),
      })
    })
  })

  describe('instances', function () {
    it('AbortController', function () {
      test({
        repeat  : 2,
        message : 'AbortController',
        actual  : () => new AbortController1(),
        expected: () => new AbortController2(),
      })
    })
  })
})
