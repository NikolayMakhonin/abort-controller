import {IAbortControllerFast, IAbortSignalFast, IAbortSignalFastImpl} from './contracts'
import {AbortSignalFast} from './AbortSignalFast'
import {AbortError} from './AbortError'

export class AbortControllerFast implements IAbortControllerFast {
  readonly signal: IAbortSignalFast

  constructor() {
    this.signal = new AbortSignalFast()
  }

  abort(reason: any): void {
    if (this.signal.aborted) {
      return
    }
    if (!(reason instanceof Error)) {
      reason = new AbortError('Aborted with reason: ' + reason?.toString(), reason)
    }
    (this.signal as IAbortSignalFastImpl).abort(reason)
  }
}
