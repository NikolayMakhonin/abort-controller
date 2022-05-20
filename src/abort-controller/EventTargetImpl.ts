import {IEventTarget} from './contracts'

const kDelegate = Symbol('kDelegate')
const EventTarget: { new(): IEventTarget; prototype: IEventTarget } = function EventTarget() {
  const delegate = document.createDocumentFragment()
  return delegate
} as any

export { EventTarget as EventTargetImpl}
