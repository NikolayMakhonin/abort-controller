import {assertThis} from './helpers'
import {DOMException} from './DOMException'
import {IAbortSignal} from './contracts'
import {EventTarget} from './EventTarget'

const kAborted = Symbol('kAborted')
const kReason = Symbol('kReason')
const kOnAbort = Symbol('kOnAbort')

export function createAbortSignal() {
  const signal = new EventTarget()
  // eslint-disable-next-line new-cap
  Object.setPrototypeOf(signal, AbortSignal.prototype)
  signal[kAborted] = false
  signal[kReason] = void 0
  signal[kOnAbort] = null
  return signal
}

export function abortSignalAbort(signal: AbortSignal, reason: any) {
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

class AbortSignal extends EventTarget implements IAbortSignal {
  // @ts-ignore
  constructor() {
    const error = new TypeError('Illegal constructor')
    ;(error as any).code = 'ERR_ILLEGAL_CONSTRUCTOR'
    throw error
    super()
  }

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

  private [kOnAbort]: ((this: AbortSignal, ev: Event) => any) | null
  get onabort() {
    return this[kOnAbort] || null
  }
  set onabort(onabort: ((this: AbortSignal, ev: Event) => any) | null) {
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

export { AbortSignal as AbortSignalImpl }
