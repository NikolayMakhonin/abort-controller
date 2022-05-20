import {IEventTarget} from './contracts'

let _EventTarget: { new(): IEventTarget; prototype: IEventTarget }

if (typeof window !== 'undefined') {
  _EventTarget = function EventTarget() {
    return document.createDocumentFragment()
  } as any
  Object.setPrototypeOf(_EventTarget, DocumentFragment.prototype)
}

export { _EventTarget as EventTargetImpl}
