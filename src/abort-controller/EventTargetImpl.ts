import {IEventTarget} from './contracts'
import {initClass} from './helpers'

let _EventTarget: { new(): IEventTarget; prototype: IEventTarget }

if (typeof window !== 'undefined') {
  _EventTarget = function EventTarget() {
    return document.createDocumentFragment()
  } as any
  initClass(_EventTarget, DocumentFragment)
}

export { _EventTarget as EventTargetImpl}
