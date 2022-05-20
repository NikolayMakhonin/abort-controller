import {AbortControllerImpl} from './abort-controller/AbortControllerImpl'
import {EventTarget} from './abort-controller/EventTarget'

export { AbortControllerImpl } from './abort-controller/AbortControllerImpl'

debugger
const eventTarget = new EventTarget()
eventTarget.addEventListener('abort', () => {})
const abortController = new AbortControllerImpl()
abortController.signal.addEventListener('abort', function (...args) {
  console.log('event1', this, ...args)
})
abortController.signal.addEventListener('abort', function (...args) {
  console.log('event2', this, ...args)
})
abortController.abort('abort1')
abortController.abort('abort2')
abortController.signal.throwIfAborted()
