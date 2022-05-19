/* eslint-disable no-self-assign */
import {AbortControllerImpl} from './AbortController'
import {AbortSignalImpl} from './AbortSignal'

describe('abort-controller > AbortController', function () {
  this.timeout(60000)

  const AbortSignal1 = AbortSignalImpl
  const AbortSignal2 = AbortSignal
  const AbortController1 = AbortControllerImpl
  const AbortController2 = AbortController

  beforeEach(() => {

  })

  function getError(func: () => void) {
    let error
    try {
      func()
    } catch (err) {
      error = err
    }
    return error
  }

  function concatMessages(message1: string, message2: string) {
    return [message1, message2].filter(o => o).join('; ')
  }

  function assertProperty(obj1, obj2, key: string, message: string) {
    message = concatMessages(message, 'key=' + key)
    assert.strictEqual(obj1[key], obj2[key], concatMessages(message, 'get'))
    const error1 = getError(() => {
      obj1[key] = obj1[key]
    })
    const error2 = getError(() => {
      obj2[key] = obj2[key]
    })
    // assertError(error1, error2, concatMessages(message, 'set')) // TODO
  }

  function assertProperties(obj1, obj2, additionalKeys: string[], message: string) {
    message = concatMessages(message, 'props')
    for (const key in obj1) {
      assertProperty(obj1, obj2, key, message)
    }
    for (const key in obj2) {
      assertProperty(obj1, obj2, key, message)
    }
    if (additionalKeys) {
      for (const key in additionalKeys) {
        assertProperty(obj1, obj2, key, message)
      }
    }
    assert.deepStrictEqual(Object.keys(obj1), Object.keys(obj2), message)
  }

  function assertClass(class1, class2, message: string) {
    message = concatMessages(message, 'class')
    assert.ok(typeof class1 === 'function', message)
    assert.ok(typeof class2 === 'function', message)
    assertProperties(class1, class2, ['name'], message)
  }

  function assertError(error1, error2, message: string) {
    message = concatMessages(message, 'error')
    assert.ok(error1 instanceof Error, message)
    assert.ok(error2 instanceof Error, message)
    assertClass(error1.constructor, error2.constructor, message)
    assertProperties(error1, error2, ['message'], message)
  }

  it('AbortSignal', function () {
    assertClass(AbortSignal1, AbortSignal2, 'AbortSignal')
    const error1 = getError(() => { new AbortSignal1() })
    const error2 = getError(() => { new AbortSignal2() })
    assertError(error1, error2, 'new AbortSignal')
  })
})
