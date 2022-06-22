import {IAbortControllerFast, IAbortSignalFast, TAbortReason} from './contracts'
import {AbortSignalFast} from './AbortSignalFast'
import {AbortError} from './AbortError'

export class AbortControllerFast implements IAbortControllerFast {
  readonly signal: IAbortSignalFast

  constructor() {
    this.signal = new AbortSignalFast()
  }

  abort(reason?: TAbortReason): void {
    if (this.signal.aborted) {
      return
    }
    if (typeof reason === 'undefined') {
      reason = new AbortError(
        'Aborted with no reason',
        reason,
      )
      reason._internal = true
    }
    (this.signal as AbortSignalFast).abort(reason)
  }
}
