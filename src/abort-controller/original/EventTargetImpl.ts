import {IEventTarget} from './contracts'
import {initClass} from './helpers'

type _EventTarget = IEventTarget
// eslint-disable-next-line @typescript-eslint/no-redeclare,import/no-mutable-exports
let _EventTarget: { new(): IEventTarget; prototype: IEventTarget }

if (typeof window !== 'undefined') {
  _EventTarget = function EventTarget() {
    return document.createDocumentFragment()
  } as any
  initClass(_EventTarget, DocumentFragment)
}

export { _EventTarget as EventTargetImpl}
