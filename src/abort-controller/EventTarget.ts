import {EventTargetImpl} from './EventTargetImpl'

const _EventTarget: typeof EventTarget = typeof EventTarget !== 'undefined'
  ? EventTarget
  : EventTargetImpl

export { _EventTarget as EventTarget }
