import {abortSignalAbort, AbortSignalImpl, createAbortSignal} from './AbortSignal'
import {assertThis} from './helpers'

const kSignal = Symbol('kSignal')

class AbortController implements AbortController {
  constructor() {
    // @ts-ignore
    this[kSignal] = createAbortSignal()
  }

  private readonly [kSignal]: AbortSignalImpl
  get signal() {
    assertThis(this, AbortController)
    return this[kSignal]
  }

  abort(): void
  abort(reason?: any): void
  abort(reason?: any): void {
    assertThis(this, AbortController)
    // @ts-ignore
    abortSignalAbort(this.signal, reason)
  }
}

export { AbortController as AbortControllerImpl }
