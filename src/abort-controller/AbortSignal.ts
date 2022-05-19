import {AbortError} from './AbortError'

const kAborted = Symbol('kAborted')
const kReason = Symbol('kReason')

export function createAbortSignal(aborted = false, reason = void 0) {
  const signal = new EventTarget()
  // eslint-disable-next-line new-cap
  Object.setPrototypeOf(signal, AbortSignal.prototype)
  signal[kAborted] = aborted
  signal[kReason] = reason
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

  private _aborted: boolean = false
  get aborted(): boolean {
    return this._aborted
  }

  private _reason: any = void 0
  get reason(): any {
    return this._reason
  }

  private _abort(reason: any) {
    if (this._aborted) {
      return
    }

    this._reason = reason
    this._aborted = true
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

  private _onabort: ((this: AbortSignal, ev: Event) => any) | null
  get onabort() {
    return this._onabort
  }
  set onabort(onabort: ((this: AbortSignal, ev: Event) => any) | null) {
    if (this._onabort === onabort) {
      return
    }

    if (this._onabort) {
      this.removeEventListener('abort', this._onabort)
    }

    this._onabort = onabort

    if (this._onabort) {
      this.addEventListener('abort', this._onabort)
    }
  }
}

export { AbortSignal as AbortSignalImpl }
