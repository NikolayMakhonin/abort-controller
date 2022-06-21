import {EventTargetImpl} from './EventTargetImpl'

type _EventTarget = EventTarget
// eslint-disable-next-line @typescript-eslint/no-redeclare
const _EventTarget: typeof EventTarget = (() => {
  try {
    if (typeof EventTarget !== 'undefined') {
      // eslint-disable-next-line no-new
      new EventTarget()
      return EventTarget
    }
  }
  catch {
    // empty
  }
  return EventTargetImpl
})()

export { _EventTarget as EventTarget }
