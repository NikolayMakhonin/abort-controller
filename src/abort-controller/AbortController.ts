import {AbortSignalImpl, createAbortSignal} from './AbortSignal'

const kSignal = Symbol('kSignal')

class AbortController implements AbortController {
  constructor() {
    // @ts-ignore
    this[kSignal] = createAbortSignal()
  }

  private readonly [kSignal]: AbortSignalImpl
  get signal() {
    return this[kSignal]
  }

  abort(): void
  abort(reason?: any): void
  abort(reason?: any): void {
    // @ts-ignore
    this.signal._abort(reason)
  }
}

export { AbortController as AbortControllerImpl }
