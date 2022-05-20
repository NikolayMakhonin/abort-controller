import {EventTargetImpl} from './EventTargetImpl'

const _EventTarget: typeof EventTarget = (() => {
  try {
    if (typeof EventTarget !== 'undefined') {
      new EventTarget()
      return EventTarget
    }
  } catch { }
  return EventTargetImpl
})()

export { _EventTarget as EventTarget }
