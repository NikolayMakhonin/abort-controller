import {TAbortReason} from './contracts'

export class AbortError extends Error {
  readonly reason?: TAbortReason
  constructor(message?: string, reason?: TAbortReason) {
    super(message)
    this.reason = reason
  }
}
