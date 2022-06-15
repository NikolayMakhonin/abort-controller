/* eslint-disable func-name-matching */
import {assertThis, initClass} from './helpers'
import {DOMException} from './DOMException'
import {EventTarget} from './EventTarget'
import {IAbortSignal} from './contracts'

const kAborted = Symbol('kAborted')
const kReason = Symbol('kReason')
const kOnAbort = Symbol('kOnAbort')

// class AbortSignal extends EventTarget implements IAbortSignal {
//   [key: string]: any
//
//   // @ts-ignore
//   constructor() {
//     const error = new TypeError('Illegal constructor')
//     ;(error as any).code = 'ERR_ILLEGAL_CONSTRUCTOR'
//     throw error
//     super()
//   }
//
//   addEventListener: any
//   removeEventListener: any
//   dispatchEvent: any
//
//   private [kAborted]: boolean = false
//   get aborted(): boolean {
//     assertThis(this, AbortSignal)
//     return this[kAborted]
//   }
//
//   private [kReason]: any = void 0
//   get reason(): any {
//     assertThis(this, AbortSignal)
//     return this[kReason]
//   }
//
//   private _abort(reason: any) {
//   }
//
//   public throwIfAborted() {
//     assertThis(this, AbortSignal)
//     if (this.aborted) {
//       const reason = this.reason
//       throw reason
//     }
//   }
//
//   private [kOnAbort]: ((this: IAbortSignal, ev: Event) => any) | null
//   get onabort() {
//     return this[kOnAbort] || null
//   }
//   set onabort(onabort: ((this: IAbortSignal, ev: Event) => any) | null) {
//     // assertThis(this, AbortSignal)
//     if (this[kOnAbort] === onabort) {
//       return
//     }
//
//     if (this[kOnAbort]) {
//       this.removeEventListener('abort', this[kOnAbort])
//     }
//
//     this[kOnAbort] = onabort
//
//     if (this[kOnAbort]) {
//       this.addEventListener('abort', this[kOnAbort])
//     }
//   }
// }

interface _AbortSignal extends IAbortSignal { }
// eslint-disable-next-line @typescript-eslint/no-redeclare
const _AbortSignal: { new(): IAbortSignal, prototype: IAbortSignal } = function AbortSignal() {
  const error: any = new TypeError('Illegal constructor')
  error.code = 'ERR_ILLEGAL_CONSTRUCTOR'
  throw error
} as any

initClass(_AbortSignal, EventTarget)

Object.defineProperty(_AbortSignal.prototype, 'aborted', {
  get: function get() {
    assertThis(this, _AbortSignal)
    return this[kAborted]
  },
  enumerable  : false,
  configurable: true,
})

Object.defineProperty(_AbortSignal.prototype, 'reason', {
  get: function get() {
    assertThis(this, _AbortSignal)
    return this[kReason]
  },
  enumerable  : false,
  configurable: true,
})

Object.defineProperty(_AbortSignal.prototype, 'throwIfAborted', {
  value: function throwIfAborted() {
    assertThis(this, _AbortSignal)
    if (this.aborted) {
      const reason = this.reason
      throw reason
    }
  },
  writable    : true,
  enumerable  : false,
  configurable: true,
})

Object.defineProperty(_AbortSignal.prototype, 'onabort', {
  get: function get() {
    return this[kOnAbort] || null
  },
  set: function set(onabort) {
    // assertThis(this, __AbortSignal)
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
  },
  enumerable  : false,
  configurable: true,
})

export function createAbortSignal() {
  const signal = new EventTarget()
  // eslint-disable-next-line new-cap
  Object.setPrototypeOf(signal, _AbortSignal.prototype)
  // ;(signal as any).constructor = EventTarget
  // ;(_AbortSignal.prototype as any).constructor = EventTarget
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

export { _AbortSignal as AbortSignalImpl }
