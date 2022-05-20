import {assertThis} from './helpers'
import {DOMException} from './DOMException'
import {IAbortSignal} from './contracts'
import {EventTarget} from './EventTarget'

const kAborted = Symbol('kAborted')
const kReason = Symbol('kReason')
const kOnAbort = Symbol('kOnAbort')

class AbortSignal implements IAbortSignal {
  [key: string]: any

  // @ts-ignore
  constructor() {
    const error = new TypeError('Illegal constructor')
    ;(error as any).code = 'ERR_ILLEGAL_CONSTRUCTOR'
    throw error
  }

  addEventListener: any
  removeEventListener: any
  dispatchEvent: any

  private [kAborted]: boolean = false
  get aborted(): boolean {
    assertThis(this, AbortSignal)
    return this[kAborted]
  }

  private [kReason]: any = void 0
  get reason(): any {
    assertThis(this, AbortSignal)
    return this[kReason]
  }

  private _abort(reason: any) {
  }

  public throwIfAborted() {
    assertThis(this, AbortSignal)
    if (this.aborted) {
      const reason = this.reason
      throw reason
    }
  }

  private [kOnAbort]: ((this: IAbortSignal, ev: Event) => any) | null
  get onabort() {
    return this[kOnAbort] || null
  }
  set onabort(onabort: ((this: IAbortSignal, ev: Event) => any) | null) {
    // assertThis(this, AbortSignal)
    if (this[kOnAbort] === onabort) {
      return
    }

    if (this[kOnAbort]) {
      this.removeEventListener('abort', this[kOnAbort])
    }

    this[kOnAbort] = onabort

    if (this[kOnAbort]) {
      this.addEventListener('abort', this[kOnAbort])
    }
  }
}

Object.setPrototypeOf(AbortSignal.prototype, EventTarget.prototype)

export function createAbortSignal() {
  const signal = new EventTarget()
  // eslint-disable-next-line new-cap
  ;(signal as any).prototype = AbortSignal.prototype
  signal[kAborted] = false
  signal[kReason] = void 0
  signal[kOnAbort] = null
  return signal
}

export function abortSignalAbort(signal: IAbortSignal, reason: any) {
  if (typeof reason === 'undefined') {
    reason = new DOMException('This operation was aborted', 'AbortError')
  }
  if (signal[kAborted]) {
    return
  }

  signal[kReason] = reason
  signal[kAborted] = true
  signal.dispatchEvent(new Event('abort'))
  // typeof Event !== 'undefined'
  //   ? new Event('abort')
  //   : { type: 'abort' } as any)
}

export { AbortSignal as AbortSignalImpl }
