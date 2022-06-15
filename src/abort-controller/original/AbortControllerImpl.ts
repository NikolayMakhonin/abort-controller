import {abortSignalAbort, AbortSignalImpl, createAbortSignal} from './AbortSignalImpl'
import {assertThis} from './helpers'
import {IAbortController} from './contracts'

const kSignal = Symbol('kSignal')

class AbortController implements IAbortController {
  constructor() {
    // @ts-expect-error
    this[kSignal] = createAbortSignal()
  }

  private readonly [kSignal]: AbortSignalImpl
  get signal() {
    assertThis(this, AbortController)
    return this[kSignal]
  }

  abort(reason?: any): void {
    assertThis(this, AbortController)
    abortSignalAbort(this.signal, reason)
  }
}

export { AbortController as AbortControllerImpl }
