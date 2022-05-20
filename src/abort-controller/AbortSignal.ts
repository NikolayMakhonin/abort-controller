import {AbortError} from './AbortError'

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

class AbortSignal extends EventTarget implements AbortSignal {
  // @ts-ignore
  constructor() {
    const error = new TypeError('Illegal constructor')
    ;(error as any).code = 'ERR_ILLEGAL_CONSTRUCTOR'
    throw error
    super()
  }

  private [kAborted]: boolean = false
  get aborted(): boolean {
    return this[kAborted]
  }

  private [kReason]: any = void 0
  get reason(): any {
    return this[kReason]
  }

  private _abort(reason: any) {
    if (this[kAborted]) {
      return
    }

    this[kReason] = reason
    this[kAborted] = true
    this.dispatchEvent(new Event('abort'))
    // typeof Event !== 'undefined'
    //   ? new Event('abort')
    //   : { type: 'abort' } as any)
  }

  public throwIfAborted() {
    if (this.aborted) {
      const reason = this.reason
      throw reason instanceof Error
        ? reason
        : new AbortError('This operation was aborted', reason)
    }
  }

  private [kOnAbort]: ((this: AbortSignal, ev: Event) => any) | null
  get onabort() {
    return this[kOnAbort]
  }
  set onabort(onabort: ((this: AbortSignal, ev: Event) => any) | null) {
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
