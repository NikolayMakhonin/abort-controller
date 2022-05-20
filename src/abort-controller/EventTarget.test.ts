/* eslint-disable no-self-assign,no-new,new-cap */
import {EventTarget as EventTargetImpl} from './EventTarget'
import {getError, isLatestNodeVersion, processVersion, test} from './test/helpers'

describe('abort-controller > EventTarget', function () {
  this.timeout(60000)

  const EventTarget1 = EventTargetImpl
  const EventTarget2 = isLatestNodeVersion ? EventTarget : EventTargetImpl

  before(() => {
    console.log('process.version = ' + processVersion)
    console.log('isLatestNodeVersion = ' + isLatestNodeVersion)

    test({
      repeat  : 2,
      message : 'EventTarget',
      actual  : EventTarget1,
      expected: EventTarget1,
      func    : (o) => new o(),
    })
    test({
      repeat  : 2,
      message : 'EventTarget',
      actual  : EventTarget2,
      expected: EventTarget2,
      func    : (o) => new o(),
    })
  })

  describe('base', function () {
    it('base', function () {
      const eventTarget = new EventTarget1()
      // TODO
    })
  })

  describe('constructors', function () {
    it('EventTarget', function () {
      test({
        repeat  : 2,
        message : 'EventTarget',
        actual  : EventTarget1,
        expected: EventTarget2,
        func    : (o) => o,
      })
      test({
        repeat  : 2,
        message : 'EventTarget',
        actual  : EventTarget1,
        expected: EventTarget2,
        func    : (o) => getError(() => { new o() }),
      })
    })
  })

  describe('instances', function () {
    it('EventTarget', function () {
      test({
        repeat  : 2,
        message : 'EventTarget',
        actual  : EventTarget1,
        expected: EventTarget2,
        func    : (o) => new o(),
      })
    })

    it('EventTarget subscribe', function () {
      test({
        repeat  : 2,
        message : 'EventTarget',
        actual  : EventTarget1,
        expected: EventTarget2,
        func    : (o) => {
          const eventTarget = new o()
          const onEvent1Args = []
          function onEvent1(...args) {
            onEvent1Args.push(args)
          }
          const onEvent2Args = []
          function onEvent2(...args) {
            onEvent2Args.push(args)
          }
          eventTarget.addEventListener('event1', onEvent1)
          eventTarget.addEventListener('event2', onEvent2)
          eventTarget.dispatchEvent(new Event('event1'))
          eventTarget.dispatchEvent(new Event('event2'))
          eventTarget.dispatchEvent(new Event('event2'))
          return {
            eventTarget,
            onEvent1Args,
            onEvent2Args,
          }
        },
      })
    })
  })
})
