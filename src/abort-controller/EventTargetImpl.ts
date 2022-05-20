import {IEventTarget} from './contracts'

const kDelegate = Symbol('kDelegate')
class EventTarget implements IEventTarget {
  constructor() {
    this[kDelegate] = document.createDocumentFragment()
  }

  private readonly [kDelegate]: IEventTarget

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean,
  ): void {
    this[kDelegate].addEventListener(type, callback, options)
  }

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void {
    this[kDelegate].removeEventListener(type, callback, options)
  }

  dispatchEvent(event: Event): boolean {
    return this[kDelegate].dispatchEvent(event)
  }
}

export { EventTarget as EventTargetImpl}
