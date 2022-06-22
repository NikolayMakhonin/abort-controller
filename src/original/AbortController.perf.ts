import { calcPerformance } from 'rdtsc'
// import {AbortControllerImpl} from './AbortControllerImpl'
// import {isLatestNodeVersion} from '../test/helpers'
// import {AbortControllerClass} from '../test/contracts'
// import {IAbortController} from './contracts'

describe('abort-controller > AbortController', function () {
  this.timeout(600000)

  // const AbortController1 = AbortControllerImpl
  // const AbortController2 = isLatestNodeVersion ? AbortControllerClass : AbortControllerImpl

  const onAbort1 = o => o
  const onAbort2 = o => o
  const onAbort3 = o => o
  // let abortController1: IAbortController
  // let abortController2: IAbortController
  let set: Set<(o: any) => any>

  it('constructor', function () {
    const result = calcPerformance(
      10000,
      () => {

      },
      () => {
        set = new Set()
      },
      () => {
        set.add(onAbort1)
        set.add(onAbort2)
        set.add(onAbort3)
        set.forEach(o => o('abort'))
        set.delete(onAbort1)
        set.delete(onAbort2)
        set.delete(onAbort3)
      },
      // () => {
      //   abortController1 = new AbortController1()
      // },
      // () => {
      //   abortController1.signal.addEventListener('abort', onAbort1)
      //   abortController1.signal.addEventListener('abort', onAbort2)
      //   abortController1.signal.addEventListener('abort', onAbort3)
      //   abortController1.abort('abort')
      //   abortController1.signal.removeEventListener('abort', onAbort1)
      //   abortController1.signal.removeEventListener('abort', onAbort2)
      //   abortController1.signal.removeEventListener('abort', onAbort3)
      // },
      // () => {
      //   abortController2 = new AbortController2()
      // },
      // () => {
      //   abortController2.signal.addEventListener('abort', onAbort1)
      //   abortController2.signal.addEventListener('abort', onAbort2)
      //   abortController2.signal.addEventListener('abort', onAbort3)
      //   abortController2.abort('abort')
      //   abortController2.signal.removeEventListener('abort', onAbort1)
      //   abortController2.signal.removeEventListener('abort', onAbort2)
      //   abortController2.signal.removeEventListener('abort', onAbort3)
      // },
    )

    console.log(result)
  })
})
